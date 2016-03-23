/*
Sign in at https://apps.twitter.com/
Click Create a new application
Enter your application name, website and description
For Callback URL: http://127.0.0.1:3000/auth/twitter/callback
Go to Settings tab
Under Application Type select Read and Write access
Check the box Allow this application to be used to Sign in with Twitter
Click Update this Twitter's applications settings
Copy and paste Consumer Key and Consumer Secret keys
 */



var twitter = {
    consumer_key: process.env.TWITTER_KEY || 'Q0ILOedGvEhnSZjGmaNCHgLTd',
    consumer_secret: process.env.TWITTER_SECRET  || 'GX5aaVEU8PmYpPgH4IN7sJ1KWCFpdv0vLXr7XM9HRnzHPMrneV',
};

module.exports = {
	password: 'cookie_based',
	provider: 'twitter',
    clientId: twitter.consumer_key,                               // Set client id
    clientSecret: twitter.consumer_secret,
};
