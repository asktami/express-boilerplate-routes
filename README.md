# Express Boilerplate with Routes, Winston and UUID.

This is a boilerplate project used for starting new projects (that will be deployed to Heroku)!

Includes a sample route for endpoints (card), Winston (for logging) and UUID (for creating UUIDs).

## Set up

Complete the following steps to start a new project (NEW-PROJECT-NAME):

1. Clone this repository to your local machine `git clone https://github.com/asktami/express-boilerplate-routes.git NEW-PROJECT-NAME && cd $_`
2. Make a fresh start of the git history for this project with `rm -rf .git && git init`
3. Add .gitignore with
   ```
   echo "node_modules" > .gitignore
   echo ".env" >> .gitignore
   echo ".log" >> .gitignore
   ```
4. Install the node dependencies `npm install`
5. Move the example Environment file to `.env` that will be ignored by git and read by the express server `mv example.env .env`
6. Edit the contents of the `package.json` to use NEW-PROJECT-NAME instead of `"name": "express-boilerplate",`
7. If needed, get an API TOKEN from https://www.uuidgenerator.net/, and update the `.env` file with `API_TOKEN="YOUR-API-TOKEN"`

## Scripts

Start the application `npm start`

Start nodemon for the application `npm run dev`

Run the tests `npm test`

## Deploying

When your new project is ready for deployment, add a new Heroku application with `heroku create`. This will make a new git remote called "heroku" and you can then `npm run deploy` which will push to this remote's master branch.
