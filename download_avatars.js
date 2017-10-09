var request = require('request');

var GITHUB_TOKEN = "16f1d14b19d113031aed29da35560b21d68046c9"
var GITHUB_USER = 'bernieroach';
console.log("You are going to download GitHub avatars soon");

function printContributors(contributorList){
console.log("hi I am going to print the contributors on the console")
 contributorList.forEach(function(contributor){
  console.log(contributor.id);
  console.log(contributor.avatar_url);
 })
}

function getRepoContributors(repoOwner, repoName, cb){
  // this function will get the avatars based on repository owner and repository name
var jsonStringResponse = "";
var apiRepoPrefix = "https://api.github.com/repos/";
var apiRepoPostfix = "/contributors";
var urlString = `https://${process.env.GITHUB_USER}:${GITHUB_TOKEN}@api.github.com/repos/${repoOwner}/${repoName}/contributors`;
var requestObject = {
                    url: urlString,
                    headers: {
                              "User-Agent": GITHUB_USER
                            }
                    }
console.log("string" ,urlString);
var jsonObject = {};
// I don't know why this doesn't work ... authorization error
request(requestObject, function(err, response, body){
  console.log("string in request ", urlString)
  if(err){
    console.log(err);
    throw err;
  }
  console.log("status");
  console.log(response.statusCode);
//  console.log(response.body);
  jsonStringResponse = body;
  jsonObject = JSON.parse(jsonStringResponse);
  console.log("now I have the object - a list of contributors");
  console.log("pass the list to the call back")
   cb(jsonObject);
});

};

// test the function
getRepoContributors("jquery", "jquery",printContributors);