#!/usr/bin/env python
# -*- coding: utf-8 -*-

__author__ = "Bradon Lodwick"
__credits__ = ["Bradon Lodwick", "Reid Butson", "Chris Macleod", "Thomas Reis"]
__version__ = "1.0.0"
__status__ = "Production"


class LoadError(Exception):
    """Thrown when a schema doesn't load properly
    """

    def __init__(self, object_type, marshmallow_messages):
        """Creates a new load error exception.

        Args:
             object_type (str): The type of object that failed to load.
            marshmallow_messages (list): The list of marshmallow error messages.
        """
        super(LoadError, self).__init__('Failed to load the {} object'.format(object_type))
        self.marshmallow_messages = marshmallow_messages
