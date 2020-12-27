/*global $ */
/*jslint browser: true*/
/*eslint no-console: "error"*/


$(function() {
    //getMovies();
    getComedy();
    getAction();
    getDrama();
    //var movieI = sessionStorage.getItem('favoriteMovie');
    getMovie();
});

let susu = '5fdf22df968be632f0b3c60c';

function sendIdToMovie(idMovie){
    localStorage.setItem("favoriteMovie", idMovie);
    top.location.href="movie.html";
}


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
            url: 'http://localhost:8080/api/authentication/login/',
            type: 'POST', 
            data:formData,
            cache: false,
            dataType : 'json'
        })
        .done(function(message) {
            console.log(`Success - Login - ${message}`);
            //window.location = 'temp2.html';
            top.location.href="home.html"
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
            console.log(`Success - Register - ${message}`);
            //window.location = 'temp2.html';
            top.location.href="home.html"
        })
        .fail(function(jqXHR, textStatus, message){  
            alert(`Error - Register - ${textStatus} ,  ${message}`); 
            $('error-handler').html(JSON.stringify(err));
        });
}

function getListeners(){
 
};

/*function getMovies(){
    $.ajax({
        url: 'http://localhost:8080/api/movies',
        type: 'GET',
        success: function(movies) {
            console.log(`Success - get - movies = ${movies.length}`);
            $(".movies-list").empty();
            movies.forEach(movie => {
                $('.movies-list').append(
            "<article class='movie-mini hvr-curl-top-right hvr-shrink'>" +
            "<img src = '" +'http://localhost:8080/' + movie.image + "'>" +

            "</article>"
        );
    });
        },
        error:function(){  
           alert('Error - get - movies')  
        }   
    });
}
*/
function getComedy(){
    $.ajax({
        url: 'http://localhost:8080/api/categiries/Comedy',
        type: 'GET',
        success: function(movies) {
            console.log(`Success - get - movies = ${movies.length}`);
            $(".list1").empty();
            $(".list1").append("<h4>Comedy</h4>");
            movies.forEach(movie => {
                $('.list1').append(
                '<article class="movie-mini hvr-curl-top-right hvr-shrink" onClick="sendIdToMovie(\'' + movie._id + '\')" >' +
                "<img src = '" +'http://localhost:8080/' + movie.image + "'>" +
                "</article>"
        );
    });
        },
        error:function(){  
           alert('Error - get - movies')  
        }   
    });
}

function getAction(){
    $.ajax({
        url: 'http://localhost:8080/api/categiries/Action',
        type: 'GET',
        success: function(movies) {
            console.log(`Success - get - movies = ${movies.length}`);
            $(".list2").empty();
            $(".list2").append("<h4>Action</h4>");
            movies.forEach(movie => {
                $('.list2').append(
                '<article class="movie-mini hvr-curl-top-right hvr-shrink" onClick="sendIdToMovie(\'' + movie._id + '\')" >' +
            "<img src = '" +'http://localhost:8080/' + movie.image + "'>" +

            "</article>"
        );
    });
        },
        error:function(){  
           alert('Error - get - movies')  
        }   
    });
}

function getDrama(){
    $.ajax({
        url: 'http://localhost:8080/api/categiries/Drama',
        type: 'GET',
        success: function(movies) {
            console.log(`Success - get - movies = ${movies.length}`);
            $(".list3").empty();
            $(".list3").append("<h4>Drama</h4>");
            movies.forEach(movie => {
                $('.list3').append(
                '<article class="movie-mini hvr-curl-top-right hvr-shrink" onClick="sendIdToMovie(\'' + movie._id + '\')" >' +
            "<img src = '" +'http://localhost:8080/' + movie.image + "'>" +

            "</article>"
        );
    });
        },
        error:function(){  
           alert('Error - get - movies')  
        }   
    });
}

function getMovie(){
    $.ajax({
        url: `http://localhost:8080/api/movies/${localStorage.getItem("favoriteMovie")}`,
        type: 'GET',
        success: function(movie) {
            console.log('Success - movieID');
            $("#movie-header").empty();
            $("#movie-header").append(movie.movie.name +" - Movie");

            $("#movie").empty();
            $("#movie").append(
                "<section id='movie-image'>" + 
                "<img src='" +'http://localhost:8080/' + movie.movie.image + "'></section>"+
                "<div id='movie-details'><navbar class='movie-left'><ul>"+
                "<li><label>Name</label> : <span class='movie-name'>" + movie.movie.name + "</span></li>" +
                "<li><label>Time</label> : <span>"+movie.movie.runTime+"</span></li>" +
                " <li><label>Date</label> : <span>"+movie.movie.releaseDate+"</span></li>" +
                "<li><label>Rate</label> : <span>"+7.4+"</span></li></ul></navbar>" +
                "<aside class='movie-right'><ul>"+       
                "<li><label>Categories</label> : <span>"+movie.movie.categories+"</span></li>"+
                "<li><label>Actors</label> : <span>"+movie.movie.actors+"</span></li>"+ 
                "<li><label>Writer</label> : <span>"+movie.movie.writer+"</span></li>"+ 
                "<li><label>Director</label> : <span>"+movie.movie.director+"</span></li></ul></aside>"+ 
                "<p><label>Story Line</label> : <span>"+movie.movie.storyline+"</span></p></div>"
            );
            
        },
        error:function(){  
           alert('Error - index')  
        }   
    });
}

function getIMDB() {
    $.ajax({
        url: 'http://localhost:8080/api/movies/IMDB',
        type: 'GET',
        success: function(message) {
            console.log(message.data);
            console.log(message.data.title);
            console.log(message.data.year);
            console.log(message.data.length);
            console.log(message.data.rating);
            console.log(message.data.plot);
            console.log(message.data.poster);
            message.data.cast.forEach(element => console.log(element.actor));
            console.log(message.data.trailer.link);
            console.log('Success - Index');
        },
        error: function() {
            alert('Error - index')
        }
    });
};

function postComment(){
    const formData = {
            'description' : $('textarea[name=description]').val(),
            'creationBy': susu,
            'commentOn': localStorage.getItem("favoriteMovie"),
        };
        $.ajax({
            url: 'http://localhost:8080/api/comments/',
            type: 'POST', 
            data:formData,
            cache: false,
            dataType : 'json'
        })
        .done(function(newComment) {
            console.log(`Success - new Comment - ${newComment}`);
            alert(newComment);
            top.location.href="movie.html"
        })
        .fail(function(jqXHR, textStatus, message){  
            alert(`Error - new Comment - ${textStatus} ,  ${message}`); 
            $('error-handler').html(JSON.stringify(err));
        });
}

$(document).on('click', '#test', function(e) {
    alert("Here");
    getIMDB("avengers");
});


$(document).on('click', '#login-button', function(e){
    e.preventDefault();
    postLogin();
});

$(document).on('click', '#registerButton', function(e){
    e.preventDefault();
    postRegister();
});

$(document).on('click', '#comment-button', function(e){
    e.preventDefault();
    postComment();
});

/*
$(document).on('click', '.movie-mini', function(e){
    e.preventDefault();
    sendIdToMovie();
});
*/
