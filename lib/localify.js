// deps

var fs = require('fs');
var path = require('path');
var utils = require('./utils');



// exposed APIs

exports.localifyCSSAssets = localifyCSSAssets;



// implementations

function localifyCSSAssets(css_source, css_output, local_assets_path, assets_uri, assets_prefix) {
  var rs = fs.createReadStream(css_source);
  var buffer = '';
  rs.on('data', function (chunk) {
    buffer += chunk;
  });
  rs.on('end', function () {
    var data = buffer.toString();
    var assets = getMatchedAssetList(data);
    var info = getAssetsInfo(assets, local_assets_path, assets_uri, assets_prefix);
    if (!info || !info.length) {
      console.error('no assets to localify!');
      return;
    }
    info.forEach(function(item) {
      utils.downloadFile(item.url, item.local_path);
      data = data.replace(item.url, item.local_uri);
    });
    utils.mkdir(path.resolve(path.dirname(css_output)));
    fs.writeFileSync(css_output, data);
  });
}



function getAssetsInfo(assets, local_assets_path, assets_uri, assets_prefix) {
  var info = [];
  if (assets && assets.length) {
    assets.forEach(function(url) {
      var filename = path.basename(url);
      var querystring = filename.match(/(.*?)\?/);
      if (querystring && querystring.length) {
        filename = querystring[1];
      }
      filename = assets_prefix ? assets_prefix + filename : filename;
      var local_uri = path.join(assets_uri, filename);
      var local_path = path.join(local_assets_path, filename);
      info.push({
        filename: filename,
        url: url,
        local_uri: local_uri,
        local_path: local_path
      });
    });
  }
  return info;
}



function getMatchedAssetList(css_context) {
  var patterns = [{
    name: 'url',
    regex: /url\((.*)\) /g,
    match_index: 1
  }, {
    name: 'import',
    regex: /\@import \'(.*?)\';/g,
    match_index: 1
  }]
  var matched = [];
  for (var p in patterns) {
    var groups = utils.extractMatchGroups(css_context, patterns[p].regex, patterns[p].match_index)
    for (var g in groups) {
      if (groups[g].match(/https:\/\/|http:\/\//)) {
        matched.push(groups[g]);
      }
    }
  }
  return matched;
}
