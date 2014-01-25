//Hack@Brown
//#tag team


var tags = ["love", "instagood", "me", "cute", "follow",
	    "photooftheday", "like", "tbt", "girl", "followme",
	    "beautiful", "picoftheday", "beautiful", "tagsforlikes",
	    "instadaily", "happy", "summers", "instamood",
	    "bestoftheday", "fun", "smile", "food", "instalike",
	    "fashion", "all_shots", "swag", "webstagram",
	    "iphoneonly", "friends", "like4like", "instago",
	    "eyes", "tweegram", "amazing", "selfie", "nice",
	    "lol", "sun", "instacollage", "nofilter", "pretty",
	    "style", "throwbackthursday", "my", "instacool",
	    "hair", "life", "bored", "sky", "cool", "harrystyles",
	    "shoutout", "look", "funny", "family", "boyfriend",
	    "girlfriend", "hot", "makeup", "colorful", "throwback",
	    "girls", "photo", "tired", "pink", "home", "repost",
	    "beach", "shoes", "blue", "party", "baby",
	    "nature", "night", "art", "music", "day", "snow",
	    "fitness", "hackatbrown"];

function getTags(){

    var startIndex = Math.floor(Math.random() * tags.length);
    var endIndex = Math.floor(Math.random() * tags.length);
    while(endIndex == startIndex){
	endIndex = Math.floor(Math.random() * tags.length);
    }

    return[tags[startIndex], tags[endIndex]];
}
