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