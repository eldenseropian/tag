function getPhotosArray(string) {
  return string.data;
}

function tagCompare(first, second){
  if (first.tags.length < second.tags.length){
    return 1;
  }
  else {
    return -1;
  }
}

function getMostTaggedPhotosArray(jason) {
  return jason.data.sort(tagCompare);
}

function getNextIndex(used){
  var nextNum = Math.floor(Math.random() * 20);
  while(nextNum in used){
    nextNum = Math.floor(Math.random() * 20);
  }
  used[nextNum] = true;
  return nextNum;
}

function toString(string) {
  var picSize = 225;
  console.log(string);
  var array = getPhotosArray(string);
  var myURLs = new Array();
  myTags = new Array();
  var used = new Object();
  for (i = 0; i < 4; i++){
    var nextIndex = getNextIndex(used);
    var firstPic = array[nextIndex];
    console.log(nextIndex);
    var images = firstPic.images;
    var lowRes = images.low_resolution;
    var url = lowRes.url;
    myURLs[i] = url;
    myTags[i] = firstPic.tags;
  }
  console.log(url);
  $( '#pic1' ).html('<img src='+ myURLs[0] + ' alt=":(" width="'+ picSize + '" height="' + picSize + '" index="' + 0 + '"></img>');
  $( '#pic2' ).html('<img src='+ myURLs[1] + ' alt=":(" width="'+ picSize + '" height="' + picSize + '" index="' + 1 + '"></img>');
  $( '#pic3' ).html('<img src='+ myURLs[2] + ' alt=":(" width="'+ picSize + '" height="' + picSize + '" index="' + 2 + '"></img>');
  $( '#pic4' ).html('<img src='+ myURLs[3] + ' alt=":(" width="'+ picSize + '" height="' + picSize + '" index="' + 3 + '"></img>');
  console.log('string');
}
function search(tagName) {
  console.log('hiiii');
  url = 'https://api.instagram.com/v1/tags/' + tagName + '/media/recent?callback=?&client_id=68de522f648043ee922bcf14545cfa7a';
  $.getJSON(url, toString);
}
