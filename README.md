# TaaS - Tuki as a service

TaaS is the answer to all your tuki needs!

## Frontend

The frontend consists of three pages:

### Home Page
![image](https://github.com/danib2000/TaaS/assets/19171150/dde3c4e5-6d4a-4673-81c2-618c7e713be1)

A welcome page and a show case of all our Tukis.

### Get a Tuki
![image](https://github.com/danib2000/TaaS/assets/19171150/c6afca3c-14ef-49b2-a3e4-bedd97689e84)

A place you can search your favorite Tuki

### Upload a Tuki
![image](https://github.com/danib2000/TaaS/assets/19171150/8432a140-564a-4137-a833-25f6f05b6202)

You have a Tuki you wish to add to the service? 
Thats the page for you! upload your Tuki to our service

### Configurtion and development

In order to start the frontend it is needed to create an `.env` file with the following parameters:

```
REACT_APP_S3_BUCKET = Your aws bucket name
REACT_APP_S3_REGION =  Your aws bucket's region
REACT_APP_S3_ACCESS_KEY = Your IAM access key -> has to have permission to access s3 
REACT_APP_S3_PRIVATE_KEY = Your IAM private key
```

After configuring a `.env.`with these parameters in the `taas-frontend` directory you can start the project with the following command:
```
npm run start
```
The project will be opened on `http://localhost:3000`

