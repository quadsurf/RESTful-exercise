$(function () {
  $('.editButton').on('click', function (event) {
    var id = $('#id').val()
    var name = $('#name').val();
    var breed = $('#breed').val();
    var data = {name: name, breed: breed};
    $.ajax('/puppies/'+ id, {
      data: data,
      type: 'PUT'
    })
    .done(function (response) {
      window.location = "/puppies"
    })
  });
  $('.deleteButton').on('click', function (event) {
    var id = $('#id').val()
    $.ajax('/puppies/'+ id, {
      type: 'DELETE'
    })
    .done(function (response) {
      window.location = "/puppies"
    })
  })
})
