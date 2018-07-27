$(document).ready(function() {
    // $.notify("Hello Team","success");
    // $.notify("Hello Team","error");

    // process the form
    $("#contactus").validate({
        rules: {
            "name": {
                required: true
            },
            "email": {
                required: true,
                email: true
            },
            "query":{
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
            "query":{
                required: "Please, write something"
            }
        },
        submitHandler: function (event) { // for demo
            var formData = {
                'name'              : $('input[name=name]').val(),
                'email'             : $('input[name=email]').val(),
                'message'    		: $('textarea[name=query]').val()
            };
            $.ajax({
                type: "POST",
                url: "https://contactus.intelliconnect-tech.net/api/crm/lead/add",
                data: JSON.stringify(formData),// now data come in this function
                contentType: "application/json; charset=utf-8",
                crossDomain: true,
                dataType: "json",
            }).done(function(data) {
                $('textarea[name=query]').val('') ;
                $('input[name=email]').val('') ;
                $('input[name=name]').val('') ;
                $.notify("Thank you for connecting with us, We will contact you soon","info");
            }).fail(function(error) {
                $('textarea[name=query]').val('') ;
                $('input[name=email]').val('') ;
                $('input[name=name]').val('') ;
                $.notify("There might be internal problem","error");
            });
        }
    });

});