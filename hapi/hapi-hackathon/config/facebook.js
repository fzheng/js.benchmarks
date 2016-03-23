/*
Visit Facebook Developers
Click Apps > Create a New App in the navigation bar
Enter Display Name, then choose a category, then click Create app
Copy and paste App ID and App Secret keys into config/facebook.js
App ID is clientID, App Secret is clientSecret
Click on Settings on the sidebar, then click + Add Platform
Select Website
Enter http://localhost:3000 for Site URL
More: https://stackoverflow.com/questions/7131909/facebook-callback-appends-to-return-url
 */


// should end in /
var rootUrl  = process.env.ROOT_URL                  || 'http://localhost:3000/';

var facebook = {
    appId:          process.env.FACEBOOK_APPID          || '1601430036762977',
    appSecret:      process.env.FACEBOOK_APPSECRET      || '3eaf5a6a1b64cae0094375964a28cc6a',
    appNamespace:   process.env.FACEBOOK_APPNAMESPACE   || 'movietestforterry',
    redirectUri:    process.env.FACEBOOK_REDIRECTURI    ||  rootUrl + 'auth/callback',
    rootUrl: rootUrl
};


module.exports = {
	password: 'cookie_based',
	provider: 'facebook',
    clientId: facebook.appId,                               // Set client id
    clientSecret: facebook.appSecret,
    location: facebook.redirectUri,
    scope: ['user_about_me', 'email', 'read_stream']
};
