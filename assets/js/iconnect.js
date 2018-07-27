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
        submitHandler: function (event) { // for demo
            var formData = {
                'name': $('input[name=name]').val(),
                'email': $('input[name=email]').val(),
                'message': $('textarea[name=query]').val()
            };
            $.ajax({
                type: "POST",
                url: "https://contactus.intelliconnect-tech.com/api/crm/lead/add",
                data: JSON.stringify(formData),// now data come in this function
                contentType: "application/json; charset=utf-8",
                crossDomain: true,
                dataType: "json",
            }).done(function (data) {
                $('textarea[name=query]').val('');
                $('input[name=email]').val('');
                $('input[name=name]').val('');
                $.notify("Thank you for connecting with us, We will contact you soon", "info");
            }).fail(function (error) {
                $('textarea[name=query]').val('');
                $('input[name=email]').val('');
                $('input[name=name]').val('');
                $.notify("There might be internal problem", "error");
            });
        }
    });


//Module design pattern
//     $(function () {
//         captcha.randomNumb()
//     });
// //define namespace
//     var captcha = captcha || {};
//     captcha.randomNumb = function () {
//         var Numb = Math.floor(Math.random() * 100000001);
//         captcha.canvas(Numb);
//
//         $('#submit').on('click', function () {
//             console.log($('#digits').val(), '------------', Numb);
//             if ($('#digits').val() != Numb) {
//                 alert('Wrong number(s) or no number(s) in the text field.');
//             }
//             else {
//                 alert('Correct!');
//             }
//         });
//     };
//     captcha.canvas = function (getRandomNumber) {
//         var canvas = document.getElementById('canvas');
//         var ctx = canvas.getContext('2d'), i, j;
//
//         ctx.beginPath();
//         ctx.fillStyle = "#fff";
//         ctx.fillRect(0, 0, canvas.width, canvas.height);
//         ctx.closePath();
//
//         ctx.beginPath();
//         ctx.font = '20px arial';
//         ctx.fillStyle = '#000';
//         ctx.fillText(getRandomNumber, canvas.width / 3, canvas.height / 1.5);
//         ctx.closePath();
//
//         //grid lines
//         for (i = 0; i < canvas.width; i += 10) {
//             ctx.beginPath();
//             ctx.moveTo(0, i);
//             ctx.lineTo(canvas.width, i);
//             ctx.lineWidth = 1;
//             ctx.strokeStyle = "rgba(0, 0, 0, 0.2)";
//             ctx.stroke();
//             ctx.closePath();
//         }
//
//         for (j = 0; j < canvas.width; j += 10) {
//             ctx.beginPath();
//             ctx.moveTo(j, 0);
//             ctx.lineTo(j, canvas.height);
//             ctx.lineWidth = 1;
//             ctx.strokeStyle = "rgba(0, 0, 0, 0.2)";
//             ctx.stroke();
//             ctx.closePath();
//         }
//         //End - grid lines
//     };
});