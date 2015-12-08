$(function () {
  $('.editButton').on('click', function (event) {
    var originalName = $('#originalName').val()
    var name = $('#name').val();
    var breed = $('#breed').val();
    var data = {name: name, breed: breed};
    $.ajax('/puppies/'+ originalName, {
      data: data,
      type: 'PUT'
    })
    .done(function (response) {
      console.log(response);
      window.location = "/puppies"
    })
  })
})
