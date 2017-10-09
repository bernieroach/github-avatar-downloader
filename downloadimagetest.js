var request = require('request');
var fs = require('fs');


var imageUrl = "https://avatars2.githubusercontent.com/u/2741?v=3&s=466";
var imageName = './avatars/bernietest.jpg'



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

downloadImageByUrl(imageUrl,imageName);