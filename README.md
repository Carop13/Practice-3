#PROJECT SETUP

The following are the requirements to run the project:

 - Node version 4.4.1
 - npm version 2.14.20

###Node configuration using nvm

     - brew update
     - brew install nvm
     - source $(brew --prefix nvm)/nvm.sh
     - nvm install 4.4.1
     - nvm use 4.4.1
     - nvm alias default 4.4.1

**NOTE:** The last step is optional but highly recommended to avoid resetting the node version whenever you open a new console.

Let´s configure the npm version:

    npm install npm@2.14.20 -g

Let's install  the node modules and the bower dependencies:

    npm i
    bower install
