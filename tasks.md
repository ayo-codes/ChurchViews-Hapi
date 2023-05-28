version 0.1.0
 - created package.json
 - set the code quality tools
 - installed @hapi/hapi 
 - changed start script from index.js to src/server.js and included lint 
 - installed @hapi/vision and handlebars
 - created views folder with partials and layouts and main.hbs and icon
 - created dashboard controller.js
 - created web-routes.js
 - installed nodemon 
 - created models folder with mem folder as a sub-folder
 - created a denomination-mem-store and a user-mem-store
 - installed uuid to manage unique id generation
 - added content to denomination-mem-store and user-mem-store and wrapped it in db.js facade
 - created add-denomination , list-denominations , menu partials
 - created dashboard-view, login-view and signup-view pages
 - add content to add-denomination, list-denominations , menu , dashboard-view , login-view , signup-view
 - created accounts-controller.js 
 - add code for dashboard-controller and accounts-controller
 - added more routes to web-routes.js 
 - updated server.js

version 0.2.0
- Created about-view , created about-controller.js
- added code to about-view and about-controller.js
- updated menu.hbs , web-routes.js
- created new partials , list-churches.hbs and add-church.hbs
- created a new view, denomination-view.hbs
- created new church-mem-store.js
- updated db.js to include the church-mem-store
- created a denomination-controller.js 
- updated web-routes.js to include routes to see denomination and also to add a church 
- installed @hapi/cookie and registered the plugin to use for sessions in server.js
- imported Cookie and accountsController into server.js 
- added validate method to accountsController
- added cookie as a method to manage sessions 
- turn authentication to false for the accounts-controller.js methods (auth:false) to allow us to log-in
- added new method to denomination-mem-store.js called getUserDenominations 
- updated dashboard-controller.js index and addDenomination, to include user specific information


version 0.3.0 
- modified the list-denominations.hbs (/denomination/deletedenomination/{{id}}) and list-churches.hbs (/denomination/{{../denomination._id}}/deletechurch/{{_id}}) file to include a delete features 
- updated web-routes to reflect this
- created new controllers for to implement this features on dashboard-controller(deleteDenomination) and denomination-controller(deleteChurch)
- installed .env
- import dotenv to server.js
- move cookie information from server.js to .env file
- created .env_example
- added cookie deletion (request.cookieAuth.clear()) upon logout
- installed Joi, which is used for validation
- created models/joi-schemas.js 
- modified the accounts-controller.js to include UserSpec from joi-schemas.js
- import Joi to server.js and add server.validator(Joi) to server.js 
- created error.hbs partial 
- included the error partial on the layout.hbs page , so it comes up on anypage
- modified the return h.view on the signup action, to include errors:error.details. So that the error details will be passed to the views , on the signup form
- included options: {abortEarly:false} to let all errors show up on page , instead of just the first one 
- installed lowdb to help manage JSON store
- created and populated denomination-json-store to create functionality using array methods to manage denominations on the app
- created and populated json file to store the denominations
- created and populated church-json-store to create functionality using array methods to manage churches on the app
- created and populated json file to store the churches
- created and populated user-json-store to create functionality using array methods to manage users on the app
- created and populated json file to store the users
- linked the JSON stores to the db.js 

version 0.4.0
- added joi schemas for login-form , add-churches and add-denominations
- updated the accounts-controller.js to add the schema to login 
- updated the dashboard-controller.js to add the schema to add-denominations form config 
- updated the denomination-controller.js to add the schema to the add-churches form config
- installed Mocha 
- installed chai 
- created test folder
- created user-model-test.js 
- added test: to package.json scripts
- created fixtures.js to hold templates of a user, maggie and an array of testUsers
- created "create a user " test
- created "delete all users" test plus deleting allusers before the test runs
- created a "get a user -success" test by id and by email
- due to a bug shown in the tests , updated the getUserbyId and getUserByEmail methods in the User-Json-store file
- created a "get a user-failures" test, which tests for users where neither the id nor email is registered
- created a "get a user - bad params" test, which tests for users with empty parameters
- created a "delete One user -fail" test which tests for deleting a user, when we use a non-existent id 
- moved the for loop to create test users to the setup of the test

version 0.5.0
- modified db.js to allow for switching of models used btwn json and mem
- updated user-mem-store getUserById and getUserByEmail 
- added  a test denomination and testdenominations-array to fixtures.js 
- created denomination-model-test.js 
- modified getDenominationById and deleteDenominationById in memStore and JsonStore
- created mongo db directory 
- installed mongoose 
- created folder to store mongo files 
- created the user schema with mongoose
- created user-mongo-store.js 
- added "mongo" option to db.init on server.js 
- added db details to .env file
- created connect.js for mongo 
- imported the connect.js and user-mongo-store.js into db.js
- created test-utils.js to manage mongo generated fields 
- updated user-model-tests with assertSubset 
- updated setup on user-model-tests so that testUsers array stores mongo generated fields 
- added schemas for churches and denominations for mongo
- added church-mongo-store (skeleton) and denomination-mongo-store 
- modified the  'create a denomination' and 'get a denomination' tests to reflect assertSubset
- added event emitter to denomination-model-test.js 

version 0.6.0 
- updated the church-mongo-store to have more functions 
- imported church-mongo-store to db.js 
- extended fixtures.js to include a test church and an array of testChurches.
- created the church-model-tests.
- Refactored the test folder ,created models folder and api folder
- created user-api-test.js and churchview-service.js
- modified test in package.json to view sub-folders
- installed Boom for APIs 
- created src/api folder with api-routes.js and users-api.js
- user-api.js with create and find methods
- api-routes.js with post and get methods 
- added apiRoutes to server.js
- installed Axios , a HTTP Client library
- included serviceUrl in fixtures.js
- added more data to churchview-service and user-api-test.js

version 0.7.0
- created denomination-api.js and it's skeleton
- added denomination routes to api-routes
- updated churchview-service.js to include denomination actions
- created skeleton of denomination-api-test.js
- created 'create denomination' test in denomination-api-test.js
- created 'create' in denomination-api.js , then tested it 
- created 'delete a denomination' test on denomination-api-test.js
- created a 'deleteOne' in denomination-api.js
- created a 'findOne' in denomination-api.js
- created 'create multiple denominations' and 'remove non-existant denomination' tests
- created a 'find' in denomination-api.js
- created church-api.js skeleton
- added church routes to api-routes
- created church-api-test.js skeleton

version 0.8.0 
- updated church-api.js to build out the methods 
- updated church-api-test.js to build out the tests
- updated dev in package.json to exclude monitoring json store files
- updated dev in package.json to split tests into testmodels and testapi.
- installed inert to manage static images
- uploaded a pic for the app homepage
- installed hapi-swagger
- added tags , description and notes to userApi.find for swagger documention
- enhanced UserSpec schema to be used for a swagger documentation
- added userApi.find.response and this gives us models on swagger documentation
- created logger.js and added validationError function
- imported validationError into user-api.js
- created IdSpec , which specifies Ids 
- added a validation for input of user APIs create and findOne.

version 0.9.0
- created UserCrendentialsSpec as "UserCrendentials" and UserSpecPlus as "UserDetailsPlus" in joi-schema.
- updated userApi.create.validate to UserSpec and userApi.create.response to UserSpecPlus
- updated tests to include a users array , rather than testUsers
- updated the Church Schema, and separated them out into ChurchSpec and ChurchSpecPlus.
- updated the church-api.js with swagger options
- updated the Denomination Schema and separated them out into DenominationSpec and DenominationSpecPlus
- installed hapi-auth-jwt2 and jsonwebtoken
- created jwt-utis.js which is used to encode, decode and validate tokens.
- import jwt and validate into server.js
- registered jwt plugin in server.js
- added a new authentication strategy for jwt
- added authenticate route to api-routes.js 
- imported createToken into user-api.js and also added authenticate method to userApi.
- added authenticate(user) and clearAuth() to churchview-service.js
- introduced new tests to test the authentication of the apis , auth-api-test.js
- changed auth strategy for denomination and church 
- changed the setup of the tests for denomination and church , to allow for authentication
- changed auth strategy for users 
- changed the user-api-tests to allow for authentications

version 0.9.1
- moved database to mongo cloud atlas

version 0.10.0
- added swagger response options to authenticate method 
- created a joi-schema JwtAuth and included it as the response schema in the authenticate endpoint.
- added UserCrednetialSpec to the validate option in user-api.js
- created a new fixture called maggieCredentials which just has email and password to be used with the authenticate calls
- changed all authenticate calls in tests to be maggieCredentials from maggie.
- added additional parameters (securityDefinitions) to swaggerOptions on in server.js, this allows a new button to appear on the documentation site to allow for authentication

version 0.10.1
- installed moongose seeder utility
- created seed-data.js to hold seed-data.
- added a seedData object with sample users, a sample denomination and a sample church
- added a reference between objects using e.g userid: "-> users.bart" to link the id of bart to the userid required for another object.

version 0.10.2
- included cloudinary details in .env files
- created a new partial view for the images on the denomination page called denomination-image.hbs
- modified the denomination-view.hbs to include the partial and and switch it to columns 
- included img in denominationSchema in denomination.js
- updated denomination-mongo-store.js to include updateDenomination method
- installed cloudinary 
- added models/image-store.js file 
- added web-routes to upload image 
- added uploadImage method to the denomination-controller which helps upload image to cloudinary
- changed project name to ChurchViews

version 0.10.3 
- UI Improvements
- updated icon and linked it to homepage
- added a footer
- created a footer partial and included it in the layout page
- created a link to 'profile' on the menu bar
- created and added it to the webroutes
- created a new controller profile-controller.js
- created a new partial called profile-info
- created a new view called profile-view
- added a profile page to display the logged-in user details
- created a link to 'backoffice' on the menu bar
- created and added it to the webroutes
- created a new controller backoffice-controller.js
- created 3 new partials , backoffice-list-users, backoffice-list-churches, backoffice-list-denominations
- included the partials in a new view called backoffice-view

version 0.10.4
- created a new church-view.hbs to allow us to view church we would like to edit 
- new church-view.hbs includes a form and link to update the church
- modified the church-list.hbs to include an edit button.
- created a new controller called church-controller.js which had two methods index which loads the church-view page and updateChurch which updates the modified data in the form and sends it to the Model
- created two new routes 1-to edit the church and 2-to update the church 

version 0.10.5
- created a new user-update-view.hbs with a form, which will be used to edit user details 
- added a new edit button to the profile-view.hbs to allow for editing of user-info
- created a new controller called user-controller to control the user-update-view.hbs
- created two new routes 1- to edit the user and 2-to update the church
- updated the user-mongo-store to include an updateUser method

version 0.10.6
- a couple of UI fixes
- included ability for the backoffice to see the number of users, churches and denominations in the database by creating new db async functions and updating backoffice controllers

version 0.10.7
- included ability to update the denomination a user has entered. 
- created a new view denomination-update-view.hbs , denomination-update-controller.js and two new routes 
- changed controller for backoffice to only let someone with an admin account to view the data.

version 0.11.0
- removed authentications on api-routes
- updated the JWT to include a getUserIdFromRequest function
- updated the server.js file to include cors and commented out the hapiswagger code , updated init() to await init()
- added id field to the authentication response in the userapi.authenticate method 
- updated the church infomation to allow for province information
- added api routes for uploading and deleting images
- installed Bell , dinsinfect packages 
- updated server.js to include disinfect and bell server registration , also installed 
- added github authentication routes to the webroutes
- imported imageStore in churchApi and included an uploadImage and deleteImage method to facilitate the svelte frontend 
- modified validation on the denominationApi to allow for it to work
- updated jwtUtils to allow getting userId from a Request
- updated userApi to include bcrypt and to also hash passwords when a user signs up and also for authentication 
- updated accountsCountroller to include bcrypt and to also hash passwords when a user signs up and also for authentication
- updated joi schema to include regex for emails and also to include the extra fields of province and img
- updated the updateChurch method in churchMongoStore to allow for updating the province and image of the store . created an updateIChurch method to allow for updating church images
- updated church.js to include province and img 
- updated seedData to include the now hashed passwords
- update to seed data