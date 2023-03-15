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