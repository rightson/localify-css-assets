#!/bin/sh

rootdir=examples
uriroot=/assets

# usage:
# ./localify-cli.js css_input                         css_output                        assets_location  asset_uri_root [asset_prefix]
./localify-cli.js   $rootdir/semantic.css             $rootdir/semantic-offline.min.css $rootdir         $uriroot       fonts.googleapis.com.;
./localify-cli.js   $rootdir/fonts.googleapis.com.css $rootdir/fonts.googleapis.com.css $rootdir/fonts   $uriroot/fonts;
