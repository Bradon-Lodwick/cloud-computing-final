#!/usr/bin/env python
# -*- coding: utf-8 -*-

__author__ = "Bradon Lodwick"
__credits__ = ["Bradon Lodwick", "Reid Butson", "Chris Macleod", "Thomas Reis"]
__version__ = "1.0.0"
__status__ = "Production"

from flask import session, redirect
from functools import wraps

from security import AUTH0_DOMAIN


JSON_URL = 'https://{}/.well-known/jwks.json'.format(AUTH0_DOMAIN)
API_AUDIENCE = 'https://student-profile/api'
ALGORITHMS = ["RS256"]


def requires_auth(f):
    """Wrapper used to determine if the user is logged in."""
    @wraps(f)
    def decorated(*args, **kwargs):
        # Checks to make sure the profile is in the session
        if 'profile' not in session:
            return redirect('/')
        return f(*args, **kwargs)

    return decorated
