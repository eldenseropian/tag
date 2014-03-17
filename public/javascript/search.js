// Defines the "golden tag zone", or the ideal number of tags on an image:
// there are enough tags to continue playing, but not so many to suggest that
// the image has been tag-spammed.
var MAX_TAGS = 7;
var MIN_TAGS = 3;
  
/**
 * Find photos with a given tag by querying the Instragram API.
 * @param {String} tagName the name of the tag to find photos for.
 */
function search(tagName) {
  url = 'https://api.instagram.com/v1/tags/' + tagName + 
        '/media/recent?callback=?&client_id=68de522f648043ee922bcf14545cfa7a';
  $.getJSON(url, renderImages);
}

/**
 * Display the 4 images to pick from. Hide the one-image view.
 */
function renderImages(response) {
  var picSize = 225;  // pixels
  var photos = response.data;
  var myURLs = new Array();
  // myTags is a global variable; this has the effect of clearing it.
  myTags = new Array();
  var photoIndices = getPhotoIndices(photos);
  for (i = 0; i < 4; i++){
    var pic = photos[photoIndices[i]];
    myURLs[i] = pic.images.standard_resolution.url;
    myTags[i] = pic.tags;
    $('#pic' + (i+1)).html(createImageHTML(pic.images.standard_resolution.url,
        picSize, i));
  }
  
  $('#choose-pic').removeClass('noshow');
  $('#choose-tag').addClass('noshow');
}

/**
 * Choose 4 pictures from the results returned by instagram. If there are
 * enough options, choose images in the "golden tag zone" (see top of file).
 * @param {Array} mediaArray the array of pictures returned by instagram.
 * @return {Array.<Number>} the indices of the chosen pictures.
 */
function getPhotoIndices(mediaArray) {
  var chosen = new Array();
  
  // If there are less than 4 pictures to choose from, take all that are
  // available and repeat the last one until there are 4.
  if (mediaArray.length < 4) {
    for (var i = 0; i < 4; i++) {
      if (i < mediaArray.length) {
        chosen.push(i);
      } else {
        chosen.push(mediaArray.length - 1);
      }
    }
    return chosen;
  }

  var possibleIndices = new Array();
  for (var i = 0; i < mediaArray.length; i++) {
    possibleIndices[i] = i;
  }

  // Try to get 4 images in the "golden tag zone"
  var shuffledIndices = shuffle(possibleIndices);
  var tooManyTags = new Array();
  var notEnoughTags = new Array();
  var noTags = new Array();
  for (var i = 0; i < mediaArray.length; i++) {
    if (chosen.length == 4){
      return chosen;
    }
    nextIndex = shuffledIndices[i];
    if(mediaArray[nextIndex].tags.length > MAX_TAGS) {
      tooManyTags.push(nextIndex);
    } else if (mediaArray[nextIndex].tags.length == 0){
      noTags.push(nextIndex);
    } else if (mediaArray[nextIndex].tags.length < MIN_TAGS) {
      notEnoughTags.push(nextIndex);
    } else {
      chosen.push(nextIndex);
    }
  }

  // If 4 images in the "golden tag zone" were not found, choose images not in
  // the "golden tag zone" with preference to more tags over fewer.
  var i = 0;
  while(chosen.length < 4) {
    if(i < tooManyTags.length) {
      chosen.push(tooManyTags[i]);
    } else if (i < notEnoughTags.length){
      chosen.push(notEnoughTags[i]);
    } else {
      // we know at least 4 photos were returned, so if they weren't in any
      // of the above categories they must be in this one
      chosen.push(noTags[i]);
    }
    i++;
  }
  return chosen;
}

/**
 * Create the html for one of the 4 images.
 * @param {String} url the url of the picture to display.
 * @param {Number} size the size of the displayed picture in pixels.
 * @param {Number} index which of the 4 images this picture is.
 * @return {String} a string of the html to display this picture.
 */
function createImageHTML(url, size, index) {
  return '<img src='+ url + ' alt=":(" width="'+ size +
                    '" height="' + size + '" index="' + index + '"></img>'
}

/**
 * Randomize the order of an array. Does not mutate the array.
 * @param {Array} the array to be randomized.
 * @return {Array} the randomized array.
 */
function shuffle(array) {
  var currentIndex = array.length;
  var shuffledArray = array.slice(0);
  
  while(0 !== currentIndex) {
    var randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex = currentIndex - 1;

    var temp = array[currentIndex];
    shuffledArray[currentIndex] = shuffledArray[randomIndex];
    shuffledArray[randomIndex] = temp;
  }

  return shuffledArray;
}