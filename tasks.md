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
- added church-mongo-store and denomination-mongo-store 
- modified the  'create a denomination' and 'get a denomination' tests to reflect assertSubset
- added event emitter to denomination-model-test.js 


