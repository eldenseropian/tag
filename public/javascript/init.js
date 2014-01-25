$(document).ready(function() {
  $('.pic').each(choosePic);
  
  $('#help').hover(function() {
    $('#about').toggleClass('noshow');
  });
  
  getStartAndEndTags();
 });
 
function choosePic(index, pic) {
  $(this).click(function() {
    $('#choose-picture').toggleClass('noshow');
    $('#choose-tag').toggleClass('noshow');
    console.log($(this).attr('src'));
    var imgNode = $(this).children()[0];
    var picture = imgNode.getAttribute('src');
    $('#chosen-pic').attr('src', picture);
    var myTagList = myTags[imgNode.getAttribute('index')];
    for (var i = 0; i < myTagList.length; i++){
      console.log('adding ' + myTagList[i]);
      $('#tags-list').append('<li class = "tag">' + myTagList[i] + '</li>');
    }
  });
}

function getStartAndEndTags() {
  var startAndEnd = getTags();
  console.log(startAndEnd);
  $( '#start' ).html(startAndEnd[0]);
  $( '#end' ).html(startAndEnd[1]);
  $( '#current' ).html(startAndEnd[0]);
  search(startAndEnd[0]);
}