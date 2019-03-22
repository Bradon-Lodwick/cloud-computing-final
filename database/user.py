#!/usr/bin/env python
# -*- coding: utf-8 -*-

__author__ = "Bradon Lodwick"
__credits__ = ["Bradon Lodwick", "Reid Butson", "Chris Macleod", "Thomas Reis"]
__version__ = "1.0.0"
__status__ = "Production"

import marshmallow_mongoengine as ma
import mongoengine as me


class User(me.Document):
    """Represents a user."""
    _id = me.ObjectIdField()
    name = me.StringField(required=True)
    email = me.EmailField(required=True)
    username = me.StringField(required=True)


class UserSchema(ma.ModelSchema):
    """The schema for User objects."""
    class Meta:
        model = User
