var request = require('request');
var fs = require('fs');

var GITHUB_TOKEN = "bda56b65e90dba42e3f11ccfff34b18aa53c8194"
var GITHUB_USER = 'bernieroach';
console.log("You are going to download GitHub avatars soon");

function printContributors(contributorList){
console.log("hi I am going to print the contributors on the console")
for (var avatar in contributorList){
  console.log(contributorList[avatar].avatar_url);
  var pathPrefix = './avatars/';
  var pathPostfix = '.jpeg';
 downloadImageByUrl(contributorList[avatar].avatar_url,`${pathPrefix}${contributorList[avatar].login}${pathPostfix}`);
 }
}

function downloadImageByUrl(url, filePath){
request.get(url).on('data',function(data){ /*console.log("DATA", data)*/})
                        .on('response', function(response){
                          console.log('response status', response.statusCode);
                          console.log(response.headers['content-type']);
                        })
                        .on('error', function(err){
                          throw err;
                        })
                        .on("end", function(){
                            console.log("I am at the end");
                            console.log("downloaded", url);
                        })
                        .pipe(fs.createWriteStream(filePath));
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
  console.log("string in request ", requestObject)
  if(err){
    console.log(err);
    throw err;
  }
  console.log("status");
  console.log(response.statusCode);
//  console.log(response.body);
  jsonStringResponse = body;
  jsonObject = JSON.parse(jsonStringResponse);
  console.log(jsonObject);
  console.log("now I have the object - a list of contributors");
  console.log("pass the list to the call back")
   cb(jsonObject);
});

};

// test the function
getRepoContributors("jquery", "jquery",printContributors);