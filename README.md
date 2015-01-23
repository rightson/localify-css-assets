# Why localify?

For websites running in internal networks (ex: enterprise network) but cannot access outside world (ex: google, fb).

# How does it work?

Localify will do some preprocessing jobs automatically:

1. Scan and download the content specified by url or @import syntax in specified CSS file.
2. Make the original URIs specified by url or @import point to downloaded local assets.

After localify, CSS files will be localified and its including assets will be downloaded automatically.
The URI specified in localified files will be pointing to downloaded assets.

# How to use it?

Run localify-cli from command line where internet should be available.

    node localify-cli 
    
it will show usages.

Basically, you will need to specify at least 4 arguments:

1. source CSS file 
2. output (localified) CSS file
3. path to assets (assets will be downloaded to the path)
4. URI root of assets (localified CSS file will include this URI root instead of remote one).
5. An optional command to add prefix to the downloaded assets.

Then, just copy the localified files/assets to your internal network.
Remember to include the localified CSS files instead of original version.


# Example usage

1. Download and install front-end components by Bower
2. Run localify to localify your assets.

Have fun : )
