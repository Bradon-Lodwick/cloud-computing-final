#!/usr/bin/env python
# -*- coding: utf-8 -*-

__author__ = "Bradon Lodwick"
__credits__ = ["Bradon Lodwick", "Reid Butson", "Chris Macleod", "Thomas Reis"]
__version__ = "1.0.0"
__status__ = "Production"

import mongoengine as me
from cloudinary.uploader import upload, destroy
from cloudinary.utils import cloudinary_url


class File(me.EmbeddedDocument):
    """Defines a file hosted on cloudinary as a mongoengine document."""

    url = me.URLField(required=True)
    key = me.StringField(required=True)

    def __init__(self, file=None, public_key=None, **kwargs):
        """Creates a new file, uploading it to cloudinary.

        Args:
            file: The file to be uploaded to cloudinary.
            public_key: The key to have the file referenced by.
        """

        if file is not None and public_key is not None:
            # Upload the file
            upload(file, public_id=public_key)
            # Get the new location
            url = cloudinary_url(public_key)[0]
            super(File, self).__init__(key=public_key, url=url, **kwargs)
        else:
            super(File, self).__init__(**kwargs)

    def delete(self):
        """Deletes the file from cloudinary."""
        # Delete the object from cloudinary
        destroy(self.key)
