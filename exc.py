#!/usr/bin/env python
# -*- coding: utf-8 -*-

__author__ = "Bradon Lodwick"
__credits__ = ["Bradon Lodwick", "Reid Butson", "Chris Macleod", "Thomas Reis"]
__version__ = "1.0.0"
__status__ = "Production"


class LoadError(Exception):
    """Thrown when a schema doesn't load properly."""

    def __init__(self, object_type, marshmallow_messages):
        """Creates a new load error exception.

        Args:
            object_type (str): The type of object that failed to load.
            marshmallow_messages (list): The list of marshmallow error messages.
        """
        super(LoadError, self).__init__('Failed to load the {} object'.format(object_type))
        self.marshmallow_messages = marshmallow_messages


class ContributorError(Exception):
    """Thrown when a user tries to load a github repo into their portfolio, but has not contributed to the repo."""

    def __init__(self, user_id, repo_url):
        """Creates a new contributor error exception.

        Args:
            user_id (int): The user id that was attempted to be loaded.
            repo_url (str): The url to the repo that was attempted to be loaded.
        """
        super(ContributorError, self).__init__('User {} is not a contributor on the repo found at {}'
                                               .format(user_id, repo_url))
        self.user_id = user_id
        self.repo_url = repo_url


class IdentityError(Exception):
    """Thrown when a user tries to perform an action that is invalid because of their account identities."""

    def __init__(self, user_id, required_identity):
        """Creates a new identity error exception.

        Args:
            user_id (int): The user id that was attempted to be loaded.
            required_identity (str): The identity that was required to perform the given action.
        """
        super(IdentityError, self).__init__('User {} is not able to complete the request as they do not have a '
                                            '{} identity'.format(user_id, required_identity))
        self.user_id = user_id
        self.required_identity = required_identity

