$(document).ready(function() {

  $("#showPass").click(function() {
    if ($(".pw").attr("type") == "password") {
      $(".pw").attr("type", "text");
    } else {
      $(".pw").attr("type", "password");
    }
  });
  $("#showPass").click(function() {
    $("#showPass i").toggle();
  });
  
});
