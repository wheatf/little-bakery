$(document).ready(function () {

    $("#showPass").click(function () {
        if ($(".pw").attr("type") == "password" ||
            $(".cfm-pw").attr("type") == "password") {

            $(".pw").attr("type", "text");
            $(".cfm-pw").attr("type", "text");

        } else {
            $(".pw").attr("type", "password");
            $(".cfm-pw").attr("type", "password");

        }

    });

    $("#showPass").click(function () {
        $("#showPass i").toggle();
    });

    $(".alert").hide();

    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('success');
    if(myParam == "Success_Msg") {
        $('.alert').show();
        $('.alermsg').html('Registration success! <br> Please login with your username/email and password.');
    }
    







});
