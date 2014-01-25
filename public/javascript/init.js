$(document).ready(function() {
  $('.pic').each(choosePic);
  
  $('#previous-link').click(function() {
    $('#choose-picture').toggleClass('noshow');
    $('#choose-tag').toggleClass('noshow');
    $('#tags-list').empty();
  });
  
  $('#help').hover(function() {
    $('#about').toggleClass('noshow');
  });
  
  getStartAndEndTags();
 });

function populateTagList(index) {
  $('#tags-list').empty();
  console.log('index', index);
  var myTagList = myTags[index];
  for (var i = 0; i < myTagList.length; i++){
    console.log('adding ' + myTagList[i]);
    $('#tags-list').append('<li class = "tag">' + myTagList[i] + '</li>');
  }
}

function choosePic(index, pic) {
  $(this).click(function() {
    var imgNode = $(this).children()[0];
    var picture = imgNode.getAttribute('src');
    $('#chosen-pic').attr('src', picture);
    populateTagList(imgNode.getAttribute('index'));
    $('.tag').each(chooseNextTag);
    $('#choose-picture').toggleClass('noshow');
    $('#choose-tag').toggleClass('noshow');
  });
}

function chooseNextTag(index, tag) {
  $(this).click(function() {
    console.log($(this).text());
    $( '#choose-picture' ).toggleClass('noshow');
    $( '#choose-tag' ).toggleClass('noshow');
    $( '#tags-list' ).html("ul");
    $( '#previous' ).html( $( '#current' ).text());
    $( '#current' ).html($(this).text());

    checkIfFinished();
    search($(this).text());
  });
}

function checkIfFinished() {
  if($( '#current' ).text() === $( '#end' ).text() ) {
    console.log("Good job!");
  }
}

function getStartAndEndTags() {
  var startAndEnd = getTags();
  console.log(startAndEnd);
  $( '#start' ).html(startAndEnd[0]);
  $( '#end' ).html(startAndEnd[1]);
  $( '#current' ).html(startAndEnd[0]);
  search(startAndEnd[0]);
}