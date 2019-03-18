#!/usr/bin/env python
# -*- coding: utf-8 -*-

__author__ = "Bradon Lodwick"
__credits__ = ["Bradon Lodwick", "Reid Butson", "Chris Macleod", "Thomas Reis"]
__version__ = "1.0.0"
__status__ = "Production"

import logging
import os
import sys
from flask import Flask
from flask_restful import Api

from resources import endpoint_base

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
# Add the rest api to the app
api = Api(app, prefix=endpoint_base)

# Run the app if this is the main file
if __name__ == '__main__':
    env = os.environ.get('ENV')
    logging.info('started the app in %s environment', env)
    app.config['DEBUG'] = env == 'development'
    app.run(host='0.0.0.0')
