# Culvents Project
This application used to manage any events, so the users can simply the reservation of events as they want. In the future, this application wants to be developed so the users can make reservation into hotels and culinaries. We are expected that this application is useful for personal in the case of events, culinary and hotels reservation as they want. 

### by shafrad

## Features
* Login, Logout, Register
* Admin and Users Role
* Users can access to the events list, show details the events, register events
* Admin can take the users management and the CRUD of events list
* Visitors can view the list of events and show details the events
* User's email activation included into the users management
* Send email to users and create the number of registration that used for the identity of the users to the events that they register to

## Use Case Diagram
<p align="center">
  <img src="http://gdurl.com/rCmz" width="600"/> 
</p>

## Development Tools
* NodeJS
* ExpressJS
* MongoDB
* Bootstrap
* Jquery Datatables
* AJAX

## Usage
NB : because this apps used the mailgun API for free, so you must have email address that you will use for register in this applications. In this case, i'll suggest you to create [ email address ](https://emailfake.com/) then sign up into [mailgun](https://www.mailgun.com) by the email address that you have created before. After the email address have been created, follow the steps below :
1. Sign up into mailgun.
2. You will get the API key in home menu and the Domain in the domain menu by default in your account.
3. Then copy and paste the private API key and the Domain Name into routes/config.js with their suitable field.
Congrats! Your app's ready to run and type this commands into terminal :

```
/get/your/directory/of/the/apps
npm i
npm run seed
npm start
```

#### License ISC
