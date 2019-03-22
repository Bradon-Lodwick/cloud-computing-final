#!/usr/bin/env python
# -*- coding: utf-8 -*-

__author__ = "Bradon Lodwick"
__credits__ = ["Bradon Lodwick", "Reid Butson", "Chris Macleod", "Thomas Reis"]
__version__ = "1.0.0"
__status__ = "Production"

import logging
import os
import sys
from authlib.flask.client import OAuth
from flask import Flask, jsonify, session, redirect, render_template, url_for
from six.moves.urllib.parse import urlencode

from security import AUTH0_DOMAIN, AUTH0_CLIENT_ID, AUTH0_CLIENT_SECRET
from security.authorization import requires_auth

# The callback url for Auth0
CALLBACK_URL = os.environ.get('AUTH0_CALLBACK_URL')

# Setup logging
logging.basicConfig(filename='app.log', level=logging.INFO)

# Setup the root path
ROOT_PATH = os.path.dirname(os.path.realpath(__file__))
os.environ.update({'ROOT_PATH': ROOT_PATH})
sys.path.append(os.path.join(ROOT_PATH, 'modules'))

# Create the app
app = Flask(__name__)
app.config.from_mapping(
    SECRET_KEY=os.environ.get('SECRET_KEY')
)


# Create the OAuth app for Auth0
oauth = OAuth(app)
auth0 = oauth.register(
    'auth0',
    client_id=AUTH0_CLIENT_ID,
    client_secret=AUTH0_CLIENT_SECRET,
    api_base_url='https://' + AUTH0_DOMAIN,
    access_token_url='https://' + AUTH0_DOMAIN + '/oauth/token',
    authorize_url='https://' + AUTH0_DOMAIN + '/authorize',
    client_kwargs={
        'scope': 'openid profile'
    },
)


@app.route('/')
def home():
    """The home page for the app."""

    return render_template('home.html')


@app.route('/login')
def login():
    """The login route for Auth0 login."""
    return auth0.authorize_redirect(redirect_uri=CALLBACK_URL,
                                    audience='https://student-profile.cloud-computing-final.herokuapp.com/')


@app.route('/logout')
def logout():
    """Clears the session data.

    TODO:
        * follow this link for the logout info function:
            https://manage.auth0.com/#/applications/zV2g9mw7x11MQnQoyZ0jt0iXRl86JHrx/quickstart
    """

    # Clear all of the user's session data
    session.clear()
    # Redirect to the logout endpoint
    params = {'returnTo': url_for('home', _external=True), 'client_id': AUTH0_CLIENT_ID}
    return redirect(auth0.api_base_url + '/v2/logout?' + urlencode(params))


@app.route('/callback')
def callback_handling():
    """Handles response from Auth0 token endpoint."""

    auth0.authorize_access_token()
    resp = auth0.get('userinfo')
    userinfo = resp.json()

    # Store the user information in flask session.
    session['jwt_payload'] = userinfo
    session['profile'] = {
        'user_id': userinfo['sub'],
        'name': userinfo['name'],
        'picture': userinfo['picture']
    }

    # Redirect to the user's dashboard
    return redirect('/dashboard')


@app.route('/dashboard')
@requires_auth
def show_dashboard():
    return jsonify({'success': 'this is the dashboard for a user', 'profile': session['profile']})


# Run the app if this is the main file
if __name__ == '__main__':
    env = os.environ.get('ENV')
    logging.info('started the app in %s environment', env)
    app.config['DEBUG'] = env == 'development'
    app.run(host='0.0.0.0', port=5000)
