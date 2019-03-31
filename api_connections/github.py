#!/usr/bin/env python
# -*- coding: utf-8 -*-

__author__ = "Bradon Lodwick"
__credits__ = ["Bradon Lodwick", "Reid Butson", "Chris Macleod", "Thomas Reis"]
__version__ = "1.0.0"
__status__ = "Production"

import mongoengine as me
from marshmallow import Schema, fields, post_load
from requests import request

from exc import LoadError, ContributorError


class Repo(me.DynamicEmbeddedDocument):
    """Defines a repository object from github."""

    name = me.StringField(required=True)
    html_url = me.URLField(required=True)
    description = me.StringField()
    language = me.StringField()
    forks_count = me.IntField()
    open_issues = me.IntField()
    contributors_url = me.URLField(required=True)

    # Needs to be loaded from the contributors url
    contributions = me.IntField(required=True)

    def __init__(self, url, user_id, **kwargs):
        """Creates a new repo from the given url.

        Args:
            url (str): The api url to the repo to create.
            user_id (int): The user id to check for in order to load the number of contributions the user has made.

        Raises:
            ContributorError: Raised when the user does not contribute to the given repo.
        """

        # Get the repo information
        if url is not None:
            # Get the repo information
            repo_result = request('GET', url)
            repo_json = repo_result.json()

            # Get the contributors list so that the number of contributions the user has made can be retrieved.
            contributors_result = request('GET', repo_json['contributors_url'])
            contributors_json = contributors_result.json()

            if not any(contributor['id'] == user_id for contributor in contributors_json):
                raise ContributorError(user_id, url)
            else:
                kwargs['contributions'] = next(contributor['contributions'] for contributor in contributors_json)

            kwargs.update(repo_json)

        # Create the document using the super function
        super().__init__(**kwargs)


class RepoSchema(Schema):
    """Defines the schema for converting api calls into repo objects."""

    name = fields.Str()
    html_url = fields.URL()
    description = fields.Str(allow_none=True)
    language = fields.String(allow_none=True)

    forks_count = fields.Int()
    open_issues = fields.Int()

    created_at = fields.DateTime()
    updated_at = fields.DateTime()
    pushed_at = fields.DateTime()

    @post_load
    def make_repo(self, data):
        return Repo(**data)


# Defines the schema to use when creating repos
repo_schema = RepoSchema()


def get_repo(repo_url):
    """Gets a repo from the given url.

    Args:
        repo_url (str): The url to the repo to retrieve.

    Raises:
        LoadError: When an issue occurs loading the repo.

    Returns:
        Repo: The repository as an object.
    """

    # Request the repo
    repo_request = request('GET', repo_url)

    # Load the repository object
    load_result = repo_schema.load(repo_request.json())

    # Check for any error messages
    if len(load_result[1]) > 0:
        raise LoadError(Repo.__name__, load_result[1])

    # Return the repository object
    return load_result[0]


def get_repos(repos_url):
    """Gets a list of repos from the given url.

    Args:
        repos_url: The url to the list of repos to retrieve.

    Returns:
        list: The list of Repo objects.
    """

    # Request the repo list
    repos_request = request('GET', repos_url)

    # Get the list of dictionaries for the repos
    repos_dict = repos_request.json()

    # Load each repository
    repos_to_return = list()
    for r in repos_dict:
        load_result = repo_schema.load(r)

        # Check for errors
        if len(load_result[1]) > 0:
            raise LoadError(Repo.__name__, load_result[1])

        # If successful, append the new repo
        repos_to_return.append(load_result[0])

    # Return the final list of repos
    return repos_to_return
