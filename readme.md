version 0.1.0 features
- installed code quality tools: Eslint and Prettier
- installed Hapi 
- installed Vision and Handlebars , to manage views.
- Signup , login , logout ,add denomination and list denominations features added
- models for user and denominations implemented using memory


version 0.2.0 
- about view added 
- add churches features , list churches features 
- models for churches implemented using memory
- implemented using cookies to manage sessions
- implemented an authentication strategy for the app
- implemented feature to make sure users only see their own data


version 0.3.0
- implemented delete function for denominations
- implemented delete function for churches
- installed dotenv
- implemented .env file for cookie_name and cookie_password and created .env_example
- implemented cookie_deletion on logout
- installed joi for validation of inputs on forms
- added error reporting for validation errors on pages via layout.hbs 
- implemented validation on signup form
- installed lowdb to manage JSON database 
- created JSON files for denominations, churches and users
- created Json-store.js for denominations, churches and users to give functionality to database
- linked JSON stores to db.js 

version 0.4.0
- added Joi schemas to login form, add church form and add denomination form 
- installed mocha and chai for testing
- used the concept of fixtures to populate user data for the tests
- created tests to create/delete/get users  

version 0.5.0
- created an easier way to switch between db Stores
- created test for denomination-mem-store and denomination json-store
- installed mongoose to use with mongo
- created user-mongo-store and tested it 
- updated tests to allow for mongo generated fields 
- created denomination.js for the schema and denomination-mongo-store.js for functions 
- created church.js for the church schema and church-mongo-store.js for the functions 
- connected denominationMongoStore to db.js
- included EventEmitter in denomination-model-test.js 

version 0.6.0
- completed church-mongo-store.js with more functionality
- updated fixtures.js to include testchurches[] and a single testchurch
- created a set of tests for the church models
- Refactored test folder and created user-api-test.js and playtime-service.js
- added more tests for user-apis.

version 0.7.0 
- created denomination-api-tests.js and denomination-api.js
- updated api-routes to reflect denomination routes
- created the skeleton for church-api-test.js and church-api.js 

version 0.8.0
- updated church-api-test.js to include the body of the tests.
- updated church-api.js to include more actions 
- installed inert to manage static images
- installed hapi-swagger 
- created swagger documentation for userAPIs 

version 0.9.0
- updated User Schema and improved user-tests. 
- updated church Schema and added swagger options to church-api
- updated denomination Schema and added swagger options to denomination-api
- added authentication for APIs ( Denomination, Church and User)
- added tests for authentication-api

version 0.9.1
- moved models to mongo cloud atlas.

version 0.10.0
- added swagger response and validation parameters(for input) to authenticate routes
- swagger authentication for documentation page

version 0.10.1 
- added mongoose seedling of sample user data

version 0.10.2 
- added cloudinary to store image uploads 

version 0.10.3
- updated icon and added a hyperlink to the homepage for it
- added a footer
- added a profile page to view the logged-in user's details
- added a backoffice page to view data all the data from the app

version 0.10.4
- added an edit church feature, to enable the signed in user to edit the details of church

version 0.10.5 
- added an edit user feature to enable the signed in user to edit their details

version 0.10.6
- added the ability to get user statistics

version 0.10.7
- denomination update
- backoffice can now only be accessed by admins