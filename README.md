# :bowtie: Pertinent info for developers:

# Questions & Answers :woman_technologist:
Welcome to my 'Questions and Answers' Database recreation code! Thank you for taking an interest! In this project I inherited front-end code and had the wonderful opportunity to recreate & seed the database (~10 million rows of legacy data), and then query and return the exact information the front-end was expecting. Peruse the below topics to aid you in getting started working with this repo.

***

## Using this Repo
You will find inside a breakdown of how I organized and created each feature of this API/back-end code. My folders are a good starting point to gain clarity into the organization and structure of my code.

This code/database is set up to replace the API referenced in the inherited front-end repo: https://github.com/Velveteen-Hippo/front-end-capstone.git. When you create an AWS EC2 instance of this server and the database (must load all the database info into your database AWS instance) then you copy the link to the newly created server instance and update the URL reference. To do this, go to the front-end-capstone repo, navigate to the 'server/routes/qa.js' file, and replace the `const url` reference on line 18 with the URL for your AWS server instance URL.

## Getting a Copy of this Repo
If you haven’t already, please fork the repository on GitHub and clone your newly created repo down to your computer (then comes the fun part– exploring & learning)!

## Installation
Use the package manager npm to install all necessary dev dependencies for my repo – run the following terminal command: `npm install`
To make development easier I’ve:
  * Added nodemon as an npm start script. To automatically restart the node application when file changes in the directory are detected, run the following terminal command:`npm start`.
  * Add webpack development mode as an npm start script. To automatically have webpack watch for and bundle changes, run the following terminal command: `npm run start:dev`.

## Postgres Database Setup/Access
Navigate into the 'Database' folder, copy the `config.example.js` file and rename it to `config.js`.

Inside this file you will add the necessary credentials to create connection to your PSQL databse (used inside the database index.js file). Note: For most the 'host' and 'port' can be left as-is in the example file, you will only need to change these if you explicitly set up your Postgres differently.

## Author
- Mikka Tully
