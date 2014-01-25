function getPhotosArray(response) {
  return response.data;
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

function getNextIndex(used, possibilities) {
  var nextNum = Math.floor(Math.random() * possibilities.length);
  while(possibilities[nextNum] in used){
    console.log("Another index: " + possibilities[nextNum])
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
  var MAX_TAGS = 7;
  var possibleIndeces = new Array();
  for (var i = 0; i < mediaArray.length; i++) {
    possibleIndeces[i] = i;
  }

  var shuffledIndeces = shuffle(possibleIndeces);
  console.log(shuffledIndeces);
  var chosen = new Array();
  var badIndices = new Array();
  for (var i = 0; i < mediaArray.length; i++) {
    if (chosen.length == 4){
      return chosen;
    }
    nextIndex = shuffledIndeces[i];
    if(mediaArray[nextIndex].tags.length > MAX_TAGS) {
      badIndices.push(nextIndex);
    }
    else {
      chosen.push(nextIndex);
    }
  }
 return [1,2,3,4];
  var i = 0;
  while(chosen.length < 4) {
    chosen.push(badIndeces[i]);
    i = i + 1;
    //if (chosen.length + badIndices.length >= mediaArray.length){ // All images have been looked at and there aren't enough chosen
      //while(chosen.length < 4){
//        //chosen.push(getNextIndex(chosen, badIndices));
      //}
//    }
//    var nextIndex = Math.floor(Math.random() * mediaArray.length);
//    while(nextIndex in chosen || nextIndex in badIndices){
      //nextIndex = Math.floor(Math.random() * mediaArray.length);
//    }
//    console.log("Index: " + nextIndex);
//    if(mediaArray[nextIndex].tags.length > MAX_TAGS) {
      //badIndices.push(nextIndex);
//    }
//    else{
      //chosen.push(nextIndex);
//    }

  }
  return chosen;
}

function renderImages(response) {
  var picSize = 225;
  console.log(response);
  var array = getPhotosArray(response);
  var myURLs = new Array();
  myTags = new Array();
  var photoIndeces = getPhotoIndeces(array);
  console.log(photoIndeces);
  for (i = 0; i < 4; i++){
    // var nextIndex = getNextIndex(used, badIndeces, array.length);
    var firstPic = array[photoIndeces[i]];
    console.log(photoIndeces[i]);
    var images = firstPic.images;
    var lowRes = images.low_resolution;
    var url = lowRes.url;
    myURLs[i] = url;
    myTags[i] = firstPic.tags;
  }
  previousImgs = myURLs;
  console.log(url);
  $( '#pic1' ).html('<img src='+ myURLs[0] + ' alt=":(" width="'+ picSize + '" height="' + picSize + '" index="' + 0 + '"></img>');
  $( '#pic2' ).html('<img src='+ myURLs[1] + ' alt=":(" width="'+ picSize + '" height="' + picSize + '" index="' + 1 + '"></img>');
  $( '#pic3' ).html('<img src='+ myURLs[2] + ' alt=":(" width="'+ picSize + '" height="' + picSize + '" index="' + 2 + '"></img>');
  $( '#pic4' ).html('<img src='+ myURLs[3] + ' alt=":(" width="'+ picSize + '" height="' + picSize + '" index="' + 3 + '"></img>');
  console.log('string');
  
  $( '#choose-picture' ).toggleClass('noshow');
  $( '#choose-tag' ).toggleClass('noshow');


}

function search(tagName) {
  console.log('hiiii');
  $('#tags-list').empty();
  url = 'https://api.instagram.com/v1/tags/' + tagName + '/media/recent?callback=?&client_id=68de522f648043ee922bcf14545cfa7a';
  $.getJSON(url, renderImages);
}
