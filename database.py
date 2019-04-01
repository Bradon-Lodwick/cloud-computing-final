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
from api_connections.github import Repo
from api_connections.cloudinary import File

import constants as const
import exc

# Get the uri to use to connect to mongodb
MONGODB_URI = os.environ.get('MONGODB_URI')
MONGODB_DB = os.environ.get('MONGODB_DB')

conn = me.connect(MONGODB_DB, host=MONGODB_URI)


possible_skills = ['programming', 'graphic design', 'full-stack development', 'leader', 'communication']


class PortfolioItem(me.EmbeddedDocument):
    _id = me.ObjectIdField()
    item_type = me.StringField(choices=['repo', 'image', 'pdf', 'file', 'youtube', None])
    title = me.StringField()
    description = me.StringField()

    # The given portfolio item types should only have 1 present, and the type will be loaded based on the item_type
    repo = me.EmbeddedDocumentField(Repo)
    file = me.EmbeddedDocumentField(File)
    youtube = me.URLField()


class School(me.EmbeddedDocument):
    """Defines a school object for user education list."""
    name = me.StringField(required=True)
    degree = me.StringField(required=True)
    image = me.URLField()
    url = me.URLField()


class Awards(me.EmbeddedDocument):
    """Defines any awards the user wants to showcase."""
    name = me.StringField(required=True)
    image = me.URLField()
    url = me.URLField()


class Work(me.EmbeddedDocument):
    name = me.StringField(required=True, max_length=40)
    image = me.URLField()
    url = me.URLField()
    position = me.StringField()
    start_date = me.DateField(required=True)
    end_date = me.DateField()


class Identity(me.DynamicEmbeddedDocument):
    """Represents an identity the user connects with in the database."""
    provider = me.StringField(required=True, choices=['github', 'facebook', 'google-oauth2'])
    isSocial = me.BooleanField(required=True, default=False)
    connection = me.StringField(required=True, choices=['github', 'facebook', 'google-oauth2'])


class User(me.DynamicDocument):
    """Represents a user in the database."""
    _id = me.StringField(required=True, primary_key=True)
    # Generic data from auth0 normalized fields
    name = me.StringField(required=True)
    picture = me.URLField(required=True)
    user_id = me.StringField(required=True, unique=True)
    email = me.EmailField(required=True)
    email_verified = me.BooleanField(required=True, default=False)
    given_name = me.StringField()
    family_name = me.StringField()

    # Personalized information for the student profile to use
    # TODO place all the duplicate info from auth0 here, so it is not overwritten
    profile_picture = me.EmbeddedDocumentField(File)

    # Identities are used to tell which service the user signed up with
    identities = me.EmbeddedDocumentListField(Identity)

    # Github related fields
    url = me.URLField()  # API URL
    html_url = me.URLField()  # PROFILE URL
    repos_url = me.URLField()

    # Generic information for portfolio
    description = me.StringField()
    tagline = me.StringField(max_length=280)
    skills = me.ListField(me.StringField(choices=const.skills))

    # Allows the user to store their schooling information
    education = me.EmbeddedDocumentListField(School)

    # Allows the user to store any awards they want displayed on their page
    awards = me.EmbeddedDocumentField(Awards)

    # Allows the user to store their previous work history
    work_history = me.EmbeddedDocumentListField(Work)

    # Portfolio holds a list of portfolio items for their page
    portfolio = me.EmbeddedDocumentListField(PortfolioItem)

    meta = {'collection': 'users'}

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

    @property
    def github_identity(self):
        """Gets the user's github identity"""
        if self.is_github_user:
            return next(identity for identity in self.identities if identity.provider == 'github')
        else:
            return None

    def add_repo(self, url):
        """Adds a repo to the user's portfolio items.

        Args:
            url (str): The url to the repo.
        """

        # Only can add the repo if the user is a github user
        if self.is_github_user:
            new_repo = Repo(url, self.github_identity.user_id)
            new_item = PortfolioItem(item_type='repo', repo=new_repo)

            self.portfolio.append(new_item)
            self.save()
        else:
            raise exc.IdentityError(self.user_id, 'github')


class UserUpdateSchema(ma.ModelSchema):
    """Marshmallow schema for updating the User class."""
    class Meta:
        model = User
        model_fields_kwargs = {
            'name': {'dump_only': True},
            'picture': {'dump_only': True},
            'user_id': {'dump_only': True},
            'email': {'dump_only': True},
            'email_verified': {'dump_only': True},
            'given_name': {'dump_only': True},
            'family_name': {'dump_only': True},
            'identities': {'dump_only': True},
            'url': {'dump_only': True},
            'html_url': {'dump_only': True},
            'repos_url': {'dump_only': True},
        }


user_update_schema = UserUpdateSchema()
