var request = require('request');
var fs = require('fs');

var GITHUB_TOKEN = "bda56b65e90dba42e3f11ccfff34b18aa53c8194"
var GITHUB_USER = 'bernieroach';

function printContributors(contributorList){
console.log("hi I am going to print the contributors on the console")
for (var avatar in contributorList){
  var pathPrefix = './avatars/';
  var pathPostfix = '.jpeg';
 downloadImageByUrl(contributorList[avatar].avatar_url,`${pathPrefix}${contributorList[avatar].login}${pathPostfix}`);
 }
}

function downloadImageByUrl(url, filePath){
request.get(url).on('data',function(data){ /*console.log("DATA", data)*/})
                        .on('response', function(response){
                        })
                        .on('error', function(err){
                          throw err;
                        })
                        .on("end", function(){
                            console.log("Downloaded" + url + " to " + filePath);
                        })
                        .pipe(fs.createWriteStream(filePath));
                      }


function getRepoContributors(repoOwner, repoName, cb){
  // this function will get the avatars based on repository owner and repository name

  if(!repoOwner){
    console.log("Repository Owner parameter 1 required");
    return;
  }
  if(!repoName){
    console.log("Repository Name parameter 2 required");
    return;
  }
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

var jsonObject = {};

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

// run the function.

getRepoContributors(process.argv[2], process.argv[3],printContributors);