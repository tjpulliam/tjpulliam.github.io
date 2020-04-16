console.log("The bot is starting");

var Twit = require('twit');

var config = require('./config');
var T = new Twit(config)

// setInterval(tweetIt, 100*20, 'test')

function tweetIt(text){
	var r = Math.floor(Math.random()*100)

	var tweet = {
		status: text + r
	}

	T.post('statuses/update', tweet, tweeted);

	function tweeted(err, data, response){
		if (err){
			console.log(err);
		}
		else{
			console.log(data)
		}	
	}
}



function retweetThisGuy(username, num){

	var params = { 
		q: '(from:'+username+')', 
		count: num
	}

	T.get('search/tweets', params, getTweets);

	function getTweets(err, data, response) {
		var tweets = data.statuses;
		for (var i = 0; i < tweets.length; i++){
			console.log(tweets[i].text);
			console.log(tweets[i].id_str);
			T.post('statuses/retweet/:id', { id: tweets[i].id_str })
			console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~');
		}
	}
}

retweetThisGuy('espn', 10)