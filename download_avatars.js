var request = require('request');
var fs = require('fs');

var GITHUB_TOKEN = "bda56b65e90dba42e3f11ccfff34b18aa53c8194"
var GITHUB_USER = 'bernieroach';

// download contributors from a list
function downloadContributors(contributorList){
  var pathPrefix = './avatars/';
  var pathPostfix = '.jpeg';
// go through list of contibutors
  for (var avatar in contributorList){
    // download the image and save
    downloadImageByUrl(contributorList[avatar].avatar_url,`${pathPrefix}${contributorList[avatar].login}${pathPostfix}`);
  }
}
// download a resource and save it in a path
function downloadImageByUrl(url, filePath){
  request.get(url)
  .on('response', function(response){
  })
  .on('error', function(err){
    throw err;
  })
  .on("end", function(){
    console.log("Downloaded " + url + " to " + filePath);
  })
  .pipe(fs.createWriteStream(filePath));
}


function getRepoContributors(repoOwner, repoName, cb){
// this function will get the avatars based on repository owner and repository name

  var jsonStringResponse = "";
  var apiRepoPrefix = "https://api.github.com/repos/";
  var apiRepoPostfix = "/contributors";
  var urlString = `https://${process.env.GITHUB_USER}:${GITHUB_TOKEN}@api.github.com/repos/${repoOwner}/${repoName}/contributors`;
// create the option object
  var requestObject = {
                      url: urlString,
                      headers: {
                                "User-Agent": GITHUB_USER
                      }
                      }
  var jsonObject = {};

// repository Owner parameter s required.
  if(!repoOwner){
    console.log("Repository Owner parameter 1 required");
    return;
  }
// repository Name paameter is required
  if(!repoName){
    console.log("Repository Name parameter 2 required");
    return;
  }

// pass the request object to the request function
  request(requestObject, function(err, response, body){
    if(err){
      console.log(err);
      throw err;
    }
// parse the JSON response to JSON object
    jsonStringResponse = body;
    jsonObject = JSON.parse(jsonStringResponse);
// process the JSON object (list of contributors)
     cb(jsonObject);
  });
};



// run the function.
getRepoContributors(process.argv[2], process.argv[3],downloadContributors);