#!/usr/bin/env node

// deps

var localify = require('./lib');



// command line interfaces

if (process.argv.length && process.argv.length < 6) {
  console.log('Usage:');
  console.log('  %s CSS_SRC CSS_DEST ASSET_PATH ASSET_URI [ASSET_PREFIX]', __filename);
  console.log('where');
  console.log('  CSS_SRC:     source local css file (its containing assets are online');
  console.log('  CSS_DEST:    output local css file (its containing assets will be downloaded');
  console.log('  ASSET_PATH:  the local path for saving online assets (ex: /your/local/lib/assets)');
  console.log('  ASSET_URI:   the URI to the asset path (ex: /libs/assets)');
  console.log('  ASSET_PREFIX: the prefix prepend to the downloaded assets (Optional)');
  console.log('');
  process.exit(0);
}

if (process.argv.length && process.argv.length >= 6) {
  localify.localifyCSSAssets.apply(null, process.argv.splice(2));
}
