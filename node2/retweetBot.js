console.log("The bot is starting");

var Twit = require('twit');

var config = require('./config');
var T = new Twit(config)

let tweeted = new Set()

function storeUsersTweets(user, setName){
	var myParams = {
		q: '(from:'+user+')', 
		count: 100
	}

	T.get('search/tweets', myParams, storeId)

	function storeId(err, data, response){
		var tweetIds = data.statuses
		for(var i=0; i<tweetIds.length; i++){
			setName.add(tweetIds[i].id_str)
			// console.log(tweetIds[i].text)
		}
	}

}


function retweetThisGuy(username, num){

	var params = { 
		q: '(from:'+username+')', 
		count: num
	}

	T.get('search/tweets', params, retweet);

	function retweet(err, data, response) {
		var tweets = data.statuses;
		for (var i = 0; i < tweets.length; i++){
			console.log(tweets[i].text);
			console.log(tweets[i].id_str);
			T.post('statuses/retweet/:id', { id: tweets[i].id_str })
			console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~');
		}
	}
}

// retweetThisGuy('espn', 10)
storeUsersTweets('chartreuseman', tweeted)
console.log(tweeted.size)