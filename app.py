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
from datetime import datetime
from flask import Flask, session, redirect, render_template, url_for, request
from six.moves.urllib.parse import urlencode

import database as db
import constants
from api_connections.cloudinary import File
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


def get_current_user():
    """Retrieves the current session's user from the database."""

    return db.User.objects(user_id=session['profile']['user_id'])[0]


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
    """Clears the session data."""

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

    # Get the user from the mongodb database
    user = db.User.objects.get(user_id=userinfo['sub'])

    # Store the user information in flask session.
    session['logged_in'] = True
    session['jwt_payload'] = userinfo
    session['profile'] = {
        'user_id': user.user_id,
        'name': user.name_normalized,
        'picture': user.picture_normalized_url
    }

    # Redirect to the user's dashboard
    return redirect(url_for('dashboard'))


@app.route('/dashboard/edit', methods=["GET", "POST"])
@requires_auth
def edit_dashboard():

    # Check to make sure the user is logged in
    if not session['logged_in']:
        return redirect(url_for('home'))
    else:
        # Get the user's information from the database
        user = get_current_user()
        if request.method == 'GET':
            # Pass the user to the edit page to be displayed
            return render_template('edit.html', skills=constants.skills, user=user)
        elif request.method == 'POST':
            # Check for a profile picture
            picture = request.files.get('picture')
            if picture.content_type.startswith('image/'):
                # Upload to cloudinary
                key = 'users/{}/profile-picture-{}'.format(user.user_id, datetime.now().strftime('%Y-%m-%d_%H-%M-%S'))
                new_profile_pic = File(picture, key)
                # Get old image info from database
                old_profile_pic = user.picture_editable
                # Update new image in database
                user.picture_editable = new_profile_pic
                # Delete old pic from cloudinary
                if old_profile_pic is not None:
                    old_profile_pic.delete()
            # Check for skill updates
            skills = request.form.getlist('skills[]')
            # Replace all skills in the database
            user.skills = skills
            # Get the text information from the form
            data = request.form
            # Pass the data into the user object to update
            user, errors = db.user_update_schema.update(user, data)
            user.save()
            # Update the session info
            session['profile'] = {
                'user_id': user.user_id,
                'name': user.name_normalized,
                'picture': user.picture_normalized_url
            }
            return redirect(url_for('dashboard'))


@app.route('/dashboard')
@requires_auth
def dashboard():

    # Check to make sure the user is logged in
    if not session['logged_in']:
        return redirect(url_for('home'))
    else:
        return render_template('dashboard.html')


@app.route('/testpage')
def test():
    """A page for testing"""
    episodes = [{'name': 'e1',
                 'url': 'https://www.podtrac.com/pts/redirect.mp3/dovetail.prxu.org/126/62a2fe8b-c77c- \
                 4b16-b33e-1af2bd32bdd5/Start_With_This_Idea_to_Execution_WTNV_Intro.mp3'}]
    projects = [
        {
            'title': "Project 1",
            'desc': "A short description about project 1: \
                            blah blah blah blah blah blah blah blah blah \
                            blah blah blah blah blah blah blah blah blah  \
                            blah blah blah blah blah blah blah blah blah \
                            blah blah blah blah blah blah blah blah blah ",
            'url': "https://www.youtube.com/watch?v=MCPZlzyUzWY"
        },
        {
            'title': "Project 2",
            'desc': "A short description about project 2: \
                            leedle leedle leedle leedle leedle leedle \
                            leedle leedle leedle leedle leedle leedle \
                            leedle leedle leedle leedle leedle leedle \
                            leedle leedle leedle leedle leedle leedle ",
            'url': "https://www.youtube.com/watch?v=wLthw2YWb4s"
        },
        {
            'title': "Project 3",
            'desc': "A short description about project 3: \
                            bloop bloop bloop bloop bloop bloop \
                            bloop bloop bloop bloop bloop bloop  \
                            bloop bloop bloop bloop bloop bloop \
                            bloop bloop bloop bloop bloop bloop ",
            'url': "https://www.youtube.com/watch?v=W9CLdkkNn20"
        }
    ]
    return render_template('testpage.html', episodes=episodes, projects=projects)


# Run the app if this is the main file
if __name__ == '__main__':
    env = os.environ.get('ENV')
    logging.info('started the app in %s environment', env)
    app.config['DEBUG'] = env == 'development'
    app.run(host='0.0.0.0', port=5000)
