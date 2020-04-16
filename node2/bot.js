console.log("The bot is starting");

var Twit = require('twit');

var config = require('./config');
var T = new Twit(config)


// tweetIt('@ElonMusk');

function tweetIt(text){
	var r = Math.floor(Math.random()*100)

	var tweet = {
		// status: r + '-th tweet from the node twit api.  I love ' + text
		status: text
	}

	T.post('statuses/update', tweet, tweeted);

	function tweeted(err, data, response){
		if (err){
			console.log("Something went wrong");
		}
		else{
			console.log(data)
		}	
	}
}

var muskParams = { 
	q: '(from:realDonaldTrump)', 
	count: 5
}

T.get('search/tweets', muskParams, getTweets);

function getTweets(err, data, response) {
	var tweets = data.statuses;
	for (var i = 0; i < tweets.length; i++){
		// console.log(tweets[i].text);
		tweetIt(tweets[i].text);
	}
}