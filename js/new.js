$(function (){

    const index = function(){ window.location = 'index.html' };
    const signup = function(){ Response.redirect('register.html')};
    const login = function(){ Response.redirect('login.html')};
    const homepage = function(){ Response.redirect('homepage.html')};

    $.ajax({
        url: 'http://localhost:8080/',
        type: 'GET',
        success: function(message) {
            console.log(`message : ${message.message}`);
        }
    });

    $("#registerButton").click(() => {
        try{
            console.log('click');
            const formData = {
                'user_name' : $('input[name=user_name]').val(),
                'email': $('input[name=email]').val(),
                'password': $('input[name=password]').val(),
                'password2': $('input[name=password2]').val()
            };
          $.ajax({
            url: 'http://localhost:8080/signup/',
            type: 'POST',
            data: formData,
            success: function(message) {
                console.log('click2');
                console.log(JSON.stringify(data));
                console.log('Go to - Register ');
                console.log(`message : ${message.message}`);
                window.location = "homepage.html";
            },
            faild: function(error) {
                console.log(`error : ${error}`);
            },
        });
        }
        catch(error){
          console.log(`  Errorr - ${error} `);
        }
  });



  $("#loginButton").click(() => {
        console.log('click');
        const formData = {
            'user_name' : $('input[name=user_name]').val(),
            'password': $('input[name=password]').val(),
        };
      $.ajax({
        url: 'http://localhost:8080/login/',
        type: 'POST',
        data: formData,
        contentType: "application/x-www-form-urlencoded",
        success: function() {
            console.log('click2');
            index();
        },
        faild: function(error) {
            console.log(`error : ${error}`);
        }
    });
});


});





/*const registerPostLisener = function(){
    $.ajax({
        url: 'http://localhost:8080/register',
        type: 'POST',
        data: $("#register-form").serialize(),
        success: function(message) {
            console.log(JSON.stringify(data));
            console.log('Go to - Register ');
            console.log(`message : ${message.message}`);
        },
        faild: function(error) {
            console.log(`error : ${error}`);
        },
    });
}
*/

//$.post('http://localhost:8080/register', $('#register-form').serialize())


 // Init AOS
 function aos_init() {
    AOS.init({
        duration: 1000,
        easing: "ease-in-out-back",
        once: true
    });
}
$(window).on('load', function () {
    aos_init();
});