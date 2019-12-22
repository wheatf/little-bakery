# little-bakery
Web 2.0 project from Jimmy Wong, Weeli, Chen Qian.  
The files contains comments that explains how the code works. 
Most of code are stubs. Remove or edit them if needed.  

To start the web application, use `npm start`.  
**Don't use `node app.js`.**

## Files and Directories
List of directories and files will look something like this:
```
/--
  |--bin // Folder for scripts to run Node.js in different environment.
  |   |--www // Startup script, for starting Express.
  |
  |--controllers // Folder for controllers; part of the design pattern.
  |
  |--datastores // Folder for datastores; interfaces for interacting with MongoDB.
  |   |--datastore.js // Performs the connection to MongoDB.
  |
  |--models // Folder for models; part of the design pattern.
  |
  |--public // Folder for static files; images, client-side scripts, stylesheets, etc.
  |
  |--routes // Folder for routers; part of the design pattern.
  |   |--route.js // Adds individual routers to Express.
  |
  |--views // Folder for views; part of the design pattern.
  |
  |--.env // Defines environment variables.
  |
  |--.gitignore // Tells git what directories and files to ignore when commiting.
  |
  |--app.js // Setup configurations for an Express application.
  |
  |--package-lock.json // Guarantees exact same version of every package.
  |
  |--package.json // Description of the project, along with its dependencies.
```

## Design pattern
The project follows the design pattern:
```
datastore
↑  ↓
model
↑  ↓
controller
↑  ↓
route
↑  ↓
view
```
### Views
Views are responsible for displaying contents to clients.
Using **ejs** templating engine, data are imprinted into HTML files.

### Routes
Routes defines which method of a controller gets called.

### Controllers
Controllers will decide what to do with user's input and, if needed, 
send or fetch data to the database using datastores.

### Model
Model represents the schema of a collection.

### Datastores
Datastores provides methods to send or fetch data from databases

## `bin` folder
The `bin` folder is used to store scripts for running Node.js in a set environment.
A script can be used to make Node.js perform differently.
For example, a test script can be used to for conducting tests, 
while a normal startup script is used to run the program normally.

## `.env`
A .env files is used to define environment variable.
Environment variables are defined outside of codes and can change how a program runs.
One such variable is the port that the web application is listening to. 

Normally, `.env` does not get checked in into a source control, 
since this is mainly used by individual developers to setup localhost.

## `app.js`
The app.js is basically the index.js. The file contains how Express should work.

### `package.json`
In `package.json`, you may notice something different:
```js
{
  "name": "little-bakery",
  ...
  "scripts": {
    "start": "node ./bin/www"
  },
  ...
}
```
`scripts` now contains a `"start": "node ./bin/www"`. This is used to for starting the application.
To start the web application, type in the console: `npm start`