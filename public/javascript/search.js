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

function getNextIndex(used, possibilities) {
  var nextNum = Math.floor(Math.random() * possibilities.length);
  while(possibilities[nextNum] in used){
    nextNum = Math.floor(Math.random() * possibilities.length);
  }
  return possibilities[nextNum];
}

function shuffle(array) {
  var currentIndex = array.length;
    
  while(0 !== currentIndex) {
    var randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex = currentIndex - 1;

    var temp = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temp;
  }

  return array;
}

function getPhotoIndeces(mediaArray) {
  console.log(mediaArray);
  var chosen = new Array();
  if (mediaArray.length < 4) {
    for (var i = 0; i < 4; i++){
      if (i < mediaArray.length){
        chosen.push(i);
      }
      else{
        chosen.push(mediaArray.length - 1);
      }
    }
    return chosen;
  }
  var MAX_TAGS = 7;
  var MIN_TAGS = 3;
  var possibleIndeces = new Array();
  for (var i = 0; i < mediaArray.length; i++) {
    possibleIndeces[i] = i;
  }

  var shuffledIndeces = shuffle(possibleIndeces);
  var highIndices = new Array();
  var lowIndices = new Array();
  var noIndices = new Array();
  for (var i = 0; i < mediaArray.length; i++) {
    if (chosen.length == 4){
      return chosen;
    }
    nextIndex = shuffledIndeces[i];
    console.log("TAGS, TAGS, TAGS AT INDEX"+ nextIndex + ": "+  mediaArray[nextIndex].tags);
    if(mediaArray[nextIndex].tags.length > MAX_TAGS) {
      highIndices.push(nextIndex);
    }
    else if (mediaArray[nextIndex].tags.length == 0){
      noIndices.push(nextIndex);
    }
    else if (mediaArray[nextIndex].tags.length < MIN_TAGS) {
      lowIndices.push(nextIndex);
    }
    else {
      chosen.push(nextIndex);
    }
  }
 // return [1,2,3,4];
  var i = 0;
  while(chosen.length < 4) {
    if(i < highIndices.length) {
      chosen.push(highIndices[i]);
    }
    else if (i - highIndices.length < lowIndices.length){
      chosen.push(lowIndices[i - highIndices.length ]);
    }
    else {
      chosen.push(noIndices[i - highIndices.length - lowIndices.length]);
    }
    i = i + 1;
  }
  return chosen;
}

function renderImages(response) {
  var picSize = 225;
  var array = response.data;
  var myURLs = new Array();
  myTags = new Array();
  var photoIndeces = getPhotoIndeces(array);
  for (i = 0; i < 4; i++){
    // var nextIndex = getNextIndex(used, badIndeces, array.length);
    var firstPic = array[photoIndeces[i]];
    var images = firstPic.images;
    var stdRes = images.standard_resolution;
    var url = stdRes.url;
    myURLs[i] = url;
    myTags[i] = firstPic.tags;
  }
  previousImgs = myURLs;
  $( '#pic1' ).html('<img src='+ myURLs[0] + ' alt=":(" width="'+ picSize + '" height="' + picSize + '" index="' + 0 + '"></img>');
  $( '#pic2' ).html('<img src='+ myURLs[1] + ' alt=":(" width="'+ picSize + '" height="' + picSize + '" index="' + 1 + '"></img>');
  $( '#pic3' ).html('<img src='+ myURLs[2] + ' alt=":(" width="'+ picSize + '" height="' + picSize + '" index="' + 2 + '"></img>');
  $( '#pic4' ).html('<img src='+ myURLs[3] + ' alt=":(" width="'+ picSize + '" height="' + picSize + '" index="' + 3 + '"></img>');
    
  $( '#choose-pic' ).removeClass('noshow');
  $( '#choose-tag' ).addClass('noshow');


}

function search(tagName) {
  $('#tags-list').empty();
  url = 'https://api.instagram.com/v1/tags/' + tagName + '/media/recent?callback=?&client_id=68de522f648043ee922bcf14545cfa7a';
  $.getJSON(url, renderImages);
}
