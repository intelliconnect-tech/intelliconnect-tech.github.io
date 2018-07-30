var Numb1, Numb2, Numb3, Numb4, Code;
function captchaCode() {
    Numb1 = (Math.ceil(Math.random() * 10)-1).toString();
    Numb2 = (Math.ceil(Math.random() * 10)-1).toString();
    Numb3 = (Math.ceil(Math.random() * 10)-1).toString();
    Numb4 = (Math.ceil(Math.random() * 10)-1).toString();

    Code = Numb1 + Numb2 + Numb3 + Numb4;
    $("#captcha span").remove();
    $("#captcha input").remove();
    $("#captcha").append("<input type='button' onclick='captchaCode();' ><span id='code' style='padding: 0px;float: left;text-align: left;padding-left: 10px;'>" + Code + "</span>");}

$(function() {
    captchaCode();
    $("#contactForm").validate({
        rules: {
            "name": {
                required: true
            },
            "email": {
                required: true,
                email: true
            },
            "query": {
                required: true
            }
        },
        messages: {
            "name": {
                required: "Please, enter a name"
            },
            "email": {
                required: "Please, enter an email",
                email: "Email is invalid"
            },
            "query": {
                required: "Please, write something"
            }
        },
        submitHandler: function (event) {
            $("#loader").append('<img height="30px" width="30px;" src="../images/search-loader.gif">')
            var captchaVal = $("#captchaInput").val();
            if ((captchaVal !== Code)) {
                captchaCode();
                $("#captchaInput").val('');
                // $('#loader').html('<img src="');
                $("#loader img").remove();
                $.notify("Please Enter valid captcha", "error");
            }

            if ((captchaVal == Code)) {
                var formData = {
                    'name': $('input[name=name]').val(),
                    'email': $('input[name=email]').val(),
                    'message': $('textarea[name=query]').val()
                };
                $.ajax({
                    type: "POST",
                    // url: "http://localhost:3001/api/crm/lead/add",
                    url: "https://contactus.intelliconnect-tech.com/api/crm/lead/add",
                    data: JSON.stringify(formData),// now data come in this function
                    contentType: "application/json; charset=utf-8",
                    crossDomain: true,
                    dataType: "json",
                }).done(function (data) {
                    $('textarea[name=query]').val('');
                    $('input[name=email]').val('');
                    $('input[name=name]').val('');
                    captchaCode();
                    $("#captchaInput").val('');
                    $("#loader img").remove();
                    $.notify("Thank you for connecting with us, We will contact you soon", "info");
                }).fail(function (error) {
                    $('textarea[name=query]').val('');
                    $('input[name=email]').val('');
                    $('input[name=name]').val('');
                    $("#loader img").remove();
                    $.notify("There might be internal problem", "error");
                });
            }
        }
    });
});