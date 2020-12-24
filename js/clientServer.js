/*global $ */
/*jslint browser: true*/
/*eslint no-console: "error"*/

$(function() {
});

function getIndex(){
    $.ajax({
        url: 'http://localhost:8080',
        type: 'GET',
        success: function() {
            console.log('Success - Index');
        },
        error:function(){  
           alert('Error - index')  
        }   
    });
}

function postLogin(){
    const formData = {
            'user_name' : $('input[name=user_name]').val(),
            'password': $('input[name=password]').val()
        };
        $.ajax({
            url: 'http://localhost:8080/api/authentication/login',
            type: 'POST', 
            data:formData,
            cache: false,
            dataType : 'json'
        })
        .done(function(message) {
            alert(message);
            console.log(`Success - Login - ${message}`);
            //window.location = 'temp2.html';
            top.location.href="homepage.html"
        })
        .fail(function(jqXHR, textStatus, message){  
            alert(`Error - Login - ${textStatus} ,  ${message}`); 
            $('error-handler').html(JSON.stringify(err));
        });
}

function postRegister(){
    const formData = {
            'user_name' : $('input[name=user_name]').val(),
            'email': $('input[name=email]').val(),
            'password': $('input[name=password]').val(),
            'password2': $('input[name=password2]').val()
        };
        $.ajax({
            url: 'http://localhost:8080/api/authentication/signup',
            type: 'POST', 
            data:formData,
            cache: false,
            dataType : 'json'
        })
        .done(function(message) {
            alert(message);
            console.log(`Success - Register - ${message}`);
            //window.location = 'temp2.html';
            top.location.href="homepage.html"
        })
        .fail(function(jqXHR, textStatus, message){  
            alert(`Error - Register - ${textStatus} ,  ${message}`); 
            $('error-handler').html(JSON.stringify(err));
        });
}

function getListeners(){
 
};

$(document).on('click', '#login-button', function(e){
    e.preventDefault();
    postLogin();
});

$(document).on('click', '#registerButton', function(e){
    e.preventDefault();
    postRegister();
});

