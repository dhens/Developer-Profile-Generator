# Developer-Profile-Generator

Build a GitHub user profile PDF generator from user input.

![profileGenPage](https://raw.githubusercontent.com/dhens/Developer-Profile-Generator/master/pic/productionPage.PNG)

## Installation instructions:
1. Clone repo to your local machine
2. Run "npm install" in the directory of the cloned repo
3. Run "node index.js" and follow the prompts

## This repo contains:
* This README
* An index.js file that takes user input, passes the responses to a function that gets the GitHub user info, then passes that information to the next file, generateHTML.js, which parses the data and fills in the html, passes the data back to index, and then converts that to an html, then a pdf file, and saves it to the local directory.
* package.json and package-lock.json

## Known Issues / Bugs
* I'd like to take the HTML and immediately convert it to a PDF without saving an html file in the first place. This isn't a functional problem, but would make the program more lean.

## What I Learned:
* TEST TEST TEST code every step of the way. 
* Don't put all of your functionality in one function expecting it not to break when you add 50 lines of code to it.

## Dependencies:
* [Axios 0.19.2](https://www.npmjs.com/package/axios)
* [Inquirer 7.0.4](https://www.npmjs.com/package/inquirer)
* [pdf-puppeteer 1.1.10](https://www.npmjs.com/package/pdf-puppeteer)

## Conclusion:
My ability to complete complex coding tasks is becoming significantly stronger. Testing first, coding second, needs to be a higher priority, however, as not doin that added a lot of time that could have been avoided.
