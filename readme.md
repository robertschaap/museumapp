# Museum
A simple application that tests REST and MVC principles as well as user authentication and session management.

##### Technologies
HTML5 | CSS3 | JavasScript | Node.js | Express | Pug | PostgreSQL | Sequelize
Express-Session | Connect-Session-Sequelize | Body-Parser

### Scope
##### What was designed to do
+ Use REST routing
+ Use query parameters to link to pages and to populate click-through links
+ Use a light version of the MVC architecture:
    * Models contains a single index.js with main database dependencies and exports of all queries
    * Views contains all views
    * Controllers contains routing for the site and instructs database to run queries but does not actually access the database directly. Routes are required in a single index.js file
+ Admin needs authentication (note that username and password are both set to 'admin')
+ Sessions are managed, the default session of the admin will expire in 60 minutes unless the 'Remember 24 Hours' checkbox is ticked

##### What it wasn't designed to do
- Multiple users/Proper user authentication. Please do not implement admin authorisation in the way done in this project, it was build this way to test practical functionality. If you're looking to work with user management, please make sure you store your users in a session table and use an encryption tool such as bcrypt to securely store passwords
- Updating/editing entries. This can easily be built in with update/destroy through Sequelize, however the focus was mainly on routing here.

### Installation Notes
If you are looking to install this locally, please feel free to clone or download the repository. Modules are all included in the package.json but please note that you will need to have PostgreSQL installed locally as well. If you wish to use a different databse, the Sequelize dialect is specified in models\index.js on line 4. The sync portion from line 23 onwards in the same file is setup to force creation of the table and dummy values each time the app.js from the root folder is run.
