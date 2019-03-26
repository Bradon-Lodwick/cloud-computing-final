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


class PortfolioItems(me.EmbeddedDocument):
    pass


class School(me.EmbeddedDocument):
    """Defines a school object for user education list."""


# The list of skills that can be used
skills_list = ['programming', 'art', 'web_design']


class Portfolio(me.EmbeddedDocument):
    """Represents a portfolio in the database."""
    _id = me.ObjectIdField(required=True, default=ObjectId, primary_key=True)
    tag_line = me.StringField(required=True)
    description = me.StringField(required=True, max_length=500)
    skills = me.ListField(me.StringField(choices=skills_list))
    education = me.EmbeddedDocument(School)


class PortfolioSchema(ma.ModelSchema):
    """Marshmallow schema for the Portfolio class."""
    user = ma.fields.Str()
    email = ma.fields.Email()


class Identity(me.DynamicEmbeddedDocument):
    """Represents an identity the user connects with in the database."""
    provider = me.StringField(required=True, choices=['github', 'facebook', 'google-oauth2'])
    user_id = me.StringField(required=True)
    isSocial = me.BooleanField(required=True, default=False)
    connection = me.StringField(required=True, choices=['github', 'facebook', 'google-oauth2'])


class User(me.DynamicDocument):
    """Represents a user in the database."""
    # Generic data from normalized fields
    name = me.StringField(required=True)
    nickname = me.StringField(required=False)
    picture = me.URLField(required=True)
    user_id = me.StringField(required=True)
    email = me.EmailField(required=True)
    email_verified = me.BooleanField(required=True, default=False)
    given_name = me.StringField()
    family_name = me.StringField()

    # Identities are used to tell which service the user signed up with
    identities = me.EmbeddedDocumentListField(Identity)

    # Github related fields
    url = me.URLField()  # API URL
    html_url = me.URLField()  # PROFILE URL
    repos_url = me.URLField()
    meta = {'collection': 'users'}

    # Portfolio items
    portfolios = me.EmbeddedDocumentListField(Portfolio)
    featured_portfolio = me.EmbeddedDocument(Portfolio)

    def __repr__(self):
        """Default representation for the user object."""
        return '<User: {}>'.format(self.pk)

    def has_identity(self, provider):
        """Checks if the user has an identity from the given provider.

        Args:
            provider (str): The provider to check for.

        Returns:
            bool: If the user has an identity from the given provider.
        """
        return any(provider == identity['provider'] for identity in self.identities)

    @property
    def is_github_user(self):
        return self.has_identity('github')

    @property
    def is_google_user(self):
        return self.has_identity('google-oauth2')


class UserSchema(ma.ModelSchema):
    """Marshmallow schema for the User class."""
    class Meta:
        model = User


""" 
TODO Add the following fields for the user/portfolio
tagline
[skills]
[education]
    school
    degree
    [awards]
[work history]
    location
        name
        address
    position
    start_date
    end_date
resume_link
featured_photo
[showcase_items] <- This would be for repos, images, markdown text, etc
[awards]
website
"""
