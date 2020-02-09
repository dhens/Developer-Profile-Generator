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
    // fetch REPOs and get repo length
    var queryUrl = `https://api.github.com/users/${username}`;
    axios
    .get(queryUrl)
    .then((response) => {
        let data = response.data;
        let user = {
            username: data.login,
            avatar: data.avatar_url,
            profile: data.url,
            blog: data.blog,
            repoCount: data.public_repos,
            name: data.name,
            followers: data.followers,
            followedUsers: data.following,
        }
        console.log(user)

    writeToFile(user.username, user);
    });
}

function writeToFile(fileName, data) {
    let stringData = JSON.stringify(data);
    fs.writeFile(`${fileName}.txt`, stringData, function(err, data) {
        if (err) {
            return console.log(err)
        }

        console.log(`Successfully wrote profile data to ${fileName}.txt`)
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
