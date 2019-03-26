#!/usr/bin/env python
# -*- coding: utf-8 -*-

__author__ = "Bradon Lodwick"
__credits__ = ["Bradon Lodwick", "Reid Butson", "Chris Macleod", "Thomas Reis"]
__version__ = "1.0.0"
__status__ = "Production"

import requests
from marshmallow import Schema, fields, post_load

from exc import LoadError


class Repo:
    """Defines a repository object from github."""

    def __init__(self, name, html_url, description, language, forks_count, open_issues, created_at, updated_at,
                 pushed_at):
        self.name = name
        self.html_url = html_url
        self.description = description
        self.language = language
        self.forks_count = forks_count
        self.open_issues = open_issues
        self.created_at = created_at
        self.updated_at = updated_at
        self.pushed_at = pushed_at


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
    repo_request = requests.get(repo_url)

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
    repos_request = requests.get(repos_url)

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
