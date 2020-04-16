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

var myargs = process.argv.slice(2);

var guy = myargs[0]
var no = myargs[1]

retweetThisGuy(guy, no);
console.log(guy)