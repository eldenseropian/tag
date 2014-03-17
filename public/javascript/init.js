this.hops = 0;

$(document).ready(function() {
  // bind event listeners
  $('.pic').each(choosePic);
  $('#previous-link').click(goBack);
  $('#help').hover(showHelp); 
  $('#refresh').click(refresh);

  getStartAndEndTags();
});

/**
 * When a user chooses one of the 4 pictures, display that picture and its
 * tags, hiding the 4 picture display.
 * @param {Number} index the index of the picture to add the listener to
 */
function choosePic(index) {
  $(this).click(function() {
    var imgElement = $(this).children()[0];
    
    var chosenPic = imgElement.getAttribute('src');
    $('#chosen-pic').attr('src', chosenPic);
    
    populateTagList(imgElement.getAttribute('index'));
    // bind a click listener
    $('.tag').each(chooseNextTag);
    
    $('#choose-pic').addClass('noshow');
    $('#choose-tag').removeClass('noshow');
  });
}

/**
 * Hide the chosen image and get rid of its tags, display the image options,
 * and increment the hop count.
 */
function goBack() {
  $('#choose-pic').removeClass('noshow');
  $('#choose-tag').addClass('noshow');
  $('#tags-list').empty();
  hops++;
}

/**
 * Show the instructions for the game.
 */
function showHelp() {
  $('#about').toggleClass('noshow');
}

/**
 * Refresh the page, thus restarting the game.
 */
function refresh() {
  location.reload(true);
}

/**
 * Remove the tags currently in the list and add the tags of the chosen
 * picture.
 * @param {Number} index the index of the chosen picture.
 */
function populateTagList(index) {
  $('#tags-list').empty();
  var myTagList = myTags[index];
  for (var i = 0; i < myTagList.length; i++){
    $('#tags-list').append('<li class = "tag">' + myTagList[i] + '</li>');
  }
}

/**
 * Add listener for tag click. Listener increments the hop count and displays
 * the win info if the game is over. Otherwise, updates the game status and
 * finds pictures with that tag.
 */
function chooseNextTag() {
  $(this).click(function() {
    hops++;
    $('#tags-list').empty();
    $('#previous').text($('#current').text());
    $('#current').text($(this).text());

    if(!checkIfFinished()) {
      search($(this).text());
    }
  });
}

/**
 * Check if the game has been won. If it has, display the winning message.
 * @return {Boolean} true if the game is over, false otherwise.
 */
function checkIfFinished() {
  if($('#current').text() === $('#end').text()) {
    $('#endgame').removeClass('noshow');
    $('#hops').append(hops);
    return true;
  }
  return false;
}

/**
 * Choose start and end tags.
 */
function getStartAndEndTags() {
  var startAndEnd = getTags();
  $('#start').text(startAndEnd[0]);
  $('#end').text(startAndEnd[1]);
  $('#current').text(startAndEnd[0]);
  $('#tags-list').empty();
  search(startAndEnd[0]);
}