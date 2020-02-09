const inquirer = require('inquirer');
const fs = require('fs');
const axios = require("axios");
const generateHTML = require('./generateHTML.js')

const questions =
    [
        {
            type: 'input',
            message: 'What is your favorite color?',
            name: 'color'
        },
        {
            type: 'input',
            message: 'Enter your GitHub username',
            name: 'username'
        }
    ];

function fetchGithubData(username) {
    const queryUrl = `https://api.github.com/users/${username}/repos?per_page=10`;
    const repoArr = []
    axios
    .get(queryUrl)
    .then((response) => {
      const repoArr = [];
      response.data.forEach(repo => {
        repoArr.push(repo.name)
        });
        const repoString = repoArr.join("\n");
        fs.writeFile(`${username}.txt`, repoString, function(err) {
          if(err) {
            throw err;
          }
          console.log("Sucessfully wrote repo data to repos.txt")
      });
    })
}

function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, function(err, data) {
        if (err) {
            return console.log(err)
        }

        console.log(`Successfully wrote profile data to ${data}.txt`)
    });
}



function init() {
    inquirer.prompt(questions)
        .then(function(responses) {
            console.log(responses);
            fetchGithubData(responses.username)
        })
}

init();
