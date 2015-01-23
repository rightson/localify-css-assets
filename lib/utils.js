// deps

var fs = require('fs');
var path = require('path');
var https = require('https');
var mkdirp = require('mkdirp');



// exposed APIs

exports.extractMatchGroups = extractMatchGroups;
exports.downloadFile = downloadFile;
exports.mkdir = mkdir;
exports.cp = cp;



// implementations

function extractMatchGroups(string, regex, desired_idx) {
  var groups = []
  var matched = regex.exec(string);
  while (matched != null) {
    groups.push(matched[desired_idx]);
    matched = regex.exec(string);
  }
  return groups;
}



function downloadFile(url, save_to) {
  mkdir(path.resolve(path.dirname(save_to)));
  var file = fs.createWriteStream(save_to);
  var request = https.get(url, function(response) {
    response.pipe(file);
    console.log('GET %s -> %s', url, save_to);
  });
}



function mkdir(dirname) {
  if (!fs.existsSync(dirname)) {
    mkdirp(dirname);
  }
}



function cp (src, dest) {
  fs.createReadStream(src).pipe(fs.createWriteStream(dest));
}
