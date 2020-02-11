const inquirer = require('inquirer');
const fs = require('fs');
const axios = require("axios");
const makePDF = require('pdf-puppeteer')
const generateHTML = require('./generateHTML.js');
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

function fetchGithubData(username, color, starCount) {
    const queryUrl = `https://api.github.com/users/${username}`;
    axios
    .get(queryUrl)
    .then((response) => {
        const data = response.data;
        let user = {
            username: data.login,
            avatar: data.avatar_url,
            profile: data.html_url,
            blog: data.blog,
            repoCount: data.public_repos,
            name: data.name,
            followers: data.followers,
            followedUsers: data.following,
            bio: data.bio,
            location: data.location,
            starCount,
            color
        }    
        writeToFile(user.username, JSON.stringify(user), starCount);
    });
}

function fetchStarData(username) {
    const queryUrl = `https://api.github.com/users/${username}/starred`;
    return axios
    .get(queryUrl)
    .then((response) => {
        return response.data.length;
    });
}

function writeToFile(fileName, userData, starCount) {
    fs.writeFile(`${fileName}.html`, makePDF(generateHTML(userData, starCount), function(pdf) {
        fs.writeFile(`${fileName}.pdf`, pdf, function(err, data) {
            if (err) {
                return console.log(err);
            }
            console.log(`Successfully wrote pdf data to ${fileName}.pdf`)
        })
    }), 
    function(err, data) {
        if (err) {
            return console.log(`Error writing to file! \n${err}`);
        }
        console.log(`Successfully wrote profile data to ${fileName}.html`)
    });
}

function init() {
    inquirer.prompt(questions)
    .then(function(responses) {
        fetchStarData(responses.username).then(function(starCount) {
            fetchGithubData(responses.username, responses.color, starCount)
        });
    });
}
init();