# Cloud Computing Final Portfol.io

https://cloud-computing-final.herokuapp.com/  
In order to set up this project you may either use a local environment or a cloud environment depending on your needs.  

For a local environment run pip install -r requirements.txt in the directory to install all the required directories, then an auth0, mongoDB, and cloudinary environment variables will be needed to run the program. The following is similar to the setup used by the developers  

| Name | Value |
| ----- | ----- |
| PYTHONUNBUFFERED | 1 |
| AUTH0_CALLBACK_URL | localhost:5000/callback |
| AUTH0_CLIENT_ID | |
| AUTH0_CLIENT_SECRET | |
| AUTH0_DOMAIN | |
| CLOUDINARY_URL | |
| MONGODB_DB | |
| MONGODB_URI | |
| SECRET_KEY | |
| ENV | development |
  
  
For the Cloud environment similar environment variables need to be set up, but instead of the environment being set to development it is deleted (setting it to production), and the callback_url is set to your cloud instance url (eg. https://cloud-computing-final.herokuapp.com/callback )
