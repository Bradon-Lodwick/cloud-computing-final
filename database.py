#!/usr/bin/env python
# -*- coding: utf-8 -*-

__author__ = "Bradon Lodwick"
__credits__ = ["Bradon Lodwick", "Reid Butson", "Chris Macleod", "Thomas Reis"]
__version__ = "1.0.0"
__status__ = "Production"

import os
import marshmallow_mongoengine as ma
import mongoengine as me
from bson.objectid import ObjectId

# Get the uri to use to connect to mongodb
MONGODB_URI = os.environ.get('MONGODB_URI')
MONGODB_DB = os.environ.get('MONGODB_DB')

conn = me.connect(MONGODB_DB, host=MONGODB_URI)


class Portfolio(me.EmbeddedDocument):
    """Represents a portfolio in the database."""
    _id = me.ObjectIdField(required=True, default=lambda: ObjectId(), primary_key=True)
    description = me.StringField(required=True, max_length=500)


class PortfolioSchema(ma.ModelSchema):
    """Marshmallow schema for the Portfolio class."""
    user = ma.fields.Str()
    email = ma.fields.Email()


class User(me.Document):
    """Represents a user in the database."""
    name = me.StringField(required=True, max_length=50)
    email = me.EmailField(required=True)
    portfolios = me.ListField(me.EmbeddedDocumentField(Portfolio))
    meta = {'collection': 'users'}


class UserSchema(ma.ModelSchema):
    """Marshmallow schema for the User class."""
    class Meta:
        model = User
