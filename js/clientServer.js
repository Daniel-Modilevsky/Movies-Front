/*global $ */
/*jslint browser: true*/
/*eslint no-console: "error"*/


$(function() {
    //getMovies();
    /*
    getIndex();
     */
    getIndex();

    getComedy();
    getAction();
    getDrama();
    getMovie();
    getComments();
    //getPopulars();
    //setInterval(function(){ getPopulars(); }, 3000);
    getRomance();
    getThriller();
    getAnimation();
    getAdventure();
    //getRecomandations()
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
           top.location.href="404.html"
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
            async:false,
            dataType : 'json'
        })
        .done(function(message) {
            console.log(`Success - Login - ${message}`);
            console.log(localStorage.getItem("User"));
            localStorage.setItem("User", formData.user_name);
            top.location.href="home.html"
        })
        .fail(function(jqXHR, textStatus, message){  
            alert(`Error - Login - ${textStatus} ,  ${message}`); 
            $('error-handler').html(JSON.stringify(message));
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
            localStorage.setItem("User", formData.user_name);
            top.location.href="home.html"
        })
        .fail(function(jqXHR, textStatus, message){  
            alert(`Error - Register - ${textStatus} ,  ${message}`); 
            $('error-handler').html(JSON.stringify(err));
        });
}


function getMovies(){
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
           alert('Error - get - movies');
           top.location.href="404.html"
        }   
    });
}



function displayPreviousImage(movies , index) {
    $("#our-recomandation").empty();
    let movie = movies[index];
    $('#our-recomandation').append("<img src = '" +'http://localhost:8080/' + movie.image + "' class='img-popular-big' >" );
}
 function startTimer() {
  setInterval(displayNextImage, 3000);
}
/*
function getPopulars(){
    $.ajax({
        url: 'http://localhost:8080/api/populars',
        type: 'GET',
        success: function(movies) {
            console.log(`Success - get - movies = ${movies.length}`);
            $("#our-recomandation").empty();
            movies.forEach(movie => {
                $('#our-recomandation').append("<img src = '" +'http://localhost:8080/' + movie.image + "'>" );
            });
        },  
        error:function(){  
           alert('Error - get - movies')  
        }   
    });
}
*/
let index = 0;
function getPopulars(){
    $.ajax({
        url: 'http://localhost:8080/api/populars',
        type: 'GET',
        success: function(movies) {
            console.log(`Success - get - movies = ${movies.length}`);
            displayPreviousImage(movies, index )
            index++;
            if(index == 5) index = 0;
        },  
        error:function(){  
           alert('Error - get - movies');
           top.location.href="404.html";
        }   
    });
}

/*function getMoviesByCategory(category){
    console.log(`http://localhost:8080/api/categories/:${category}`);
    $.ajax({
        url: `http://localhost:8080/api/categories/${category}`,
        type: 'GET',
        success: function(movies) {
            console.log(`Success - get - movies = ${movies.length}`);
            $(".list1").empty();
            $(".list1").append(`<h4>${category}</h4>`);
            movies.forEach(movie => {
                $('.list1').append(
                '<article class="movie-mini hvr-curl-top-right hvr-shrink" onClick="sendIdToMovie(\'' + movie._id + '\')" >' +
                "<img src = '" +'http://localhost:8080/' + movie.image + "'>" +
                "</article>"
        );
    });
        },
        error:function(){  
           alert('Error - getMoviesByCategory');
           top.location.href="404.html";
        }   
    });
}
*/
/*
function getMoviesDetalies(){
    $.ajax({
        url: 'http://localhost:8080/api/movies',
        type: 'GET',
        success: function(movies) {
        console.log(`Success - get - moviesNames = ${movies.length}`);
        const moviesarr=[];
        movies.forEach(movie => {
        moviesarr.push(movie.name);
        });
       let result = [];

        moviesarr.forEach(element => {
        getIMDB(element);
        const Details = (localStorage.getItem(element));
        result.push({name: element , rating:String(JSON.parse(Details).data.rating) });
    });
        
        let sortedInput = result.slice().sort((a, b) => b.rating - a.rating);
        console.log(sortedInput);
        },  
        error:function(){  
           alert('Error - get - movies');
           top.location.href="404.html";
        }   
    });
}
*/
function getIMDB(name) {
    const formData = {
        'name' : name
    };
    $.ajax({
        url: 'http://localhost:8080/api/movies/IMDB',
        type: 'GET',
        data: formData,
        success: function(message) {
            /*
            console.log(message.data);
            console.log(message.data.title);
            console.log(message.data.year);
            console.log(message.data.length);
            console.log(message.data.rating);
            console.log(message.data.plot);
            console.log(message.data.poster);
            message.data.cast.forEach(element => console.log(element.actor));
            console.log(message.data.trailer.link);
            */
            localStorage.setItem(name,JSON.stringify(message));
            
           // console.log('Success - Index');
        },
        error: function() {
            alert('Error - index');
            top.location.href="404.html";
        }
    });
};


function getComedy(){
    $.ajax({
        url: 'http://localhost:8080/api/categories/Comedy',
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
           alert('Error - get - movies');
           top.location.href="404.html";
        }   
    });
}

function getAction(){
    $.ajax({
        url: 'http://localhost:8080/api/categories/Action',
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
           alert('Error - get - movies');
           top.location.href="404.html";
        }   
    });
}

function getDrama(){
    $.ajax({
        url: 'http://localhost:8080/api/categories/Drama',
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
           alert('Error - get - movies');
            top.location.href="404.html";
        }   
    });
}
function getRomance(){
    $.ajax({
        url: 'http://localhost:8080/api/categories/Romance',
        type: 'GET',
        success: function(movies) {
            console.log(`Success - get - movies = ${movies.length}`);
            $(".list4").empty();
            $(".list4").append("<h4>Romance</h4>");
            movies.forEach(movie => {
                $('.list4').append(
                '<article class="movie-mini hvr-curl-top-right hvr-shrink" onClick="sendIdToMovie(\'' + movie._id + '\')" >' +
            "<img src = '" +'http://localhost:8080/' + movie.image + "'>" +

            "</article>"
        );
    });
        },
        error:function(){  
           alert('Error - get - movies');
            top.location.href="404.html";
        }   
    });
}
function getThriller(){
    $.ajax({
        url: 'http://localhost:8080/api/categories/Thriller',
        type: 'GET',
        success: function(movies) {
            console.log(`Success - get - movies = ${movies.length}`);
            $(".list5").empty();
            $(".list5").append("<h4>Thriller</h4>");
            movies.forEach(movie => {
                $('.list5').append(
                '<article class="movie-mini hvr-curl-top-right hvr-shrink" onClick="sendIdToMovie(\'' + movie._id + '\')" >' +
            "<img src = '" +'http://localhost:8080/' + movie.image + "'>" +

            "</article>"
        );
    });
        },
        error:function(){  
           alert('Error - get - movies');
            top.location.href="404.html";
        }   
    });
}
function getAnimation(){
    $.ajax({
        url: 'http://localhost:8080/api/categories/Animation',
        type: 'GET',
        success: function(movies) {
            console.log(`Success - get - movies = ${movies.length}`);
            $(".list6").empty();
            $(".list6").append("<h4>Animation</h4>");
            movies.forEach(movie => {
                $('.list6').append(
                '<article class="movie-mini hvr-curl-top-right hvr-shrink" onClick="sendIdToMovie(\'' + movie._id + '\')" >' +
            "<img src = '" +'http://localhost:8080/' + movie.image + "'>" +

            "</article>"
        );
    });
        },
        error:function(){  
           alert('Error - get - movies');
            top.location.href="404.html";
        }   
    });
}
function getAdventure(){
    $.ajax({
        url: 'http://localhost:8080/api/categories/Adventure',
        type: 'GET',
        success: function(movies) {
            console.log(`Success - get - movies = ${movies.length}`);
            $(".list7").empty();
            $(".list7").append("<h4>Adventure</h4>");
            movies.forEach(movie => {
                $('.list7').append(
                '<article class="movie-mini hvr-curl-top-right hvr-shrink" onClick="sendIdToMovie(\'' + movie._id + '\')" >' +
            "<img src = '" +'http://localhost:8080/' + movie.image + "'>" +

            "</article>"
        );
    });
        },
        error:function(){  
           alert('Error - get - movies');
            top.location.href="404.html";
        }   
    });
}
/*function getMovie(){
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
           //alert('Error - get movie');
            //top.location.href="404.html";
        }   
    });
}
*/

function Parseusername(){
    let user = localStorage.getItem("User");
    console.log(user);
    $('#userName').append(
        `${user}`
    );
;}



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
            top.location.href="404.html";
        });
}

function getComments(){
     $.ajax({
        url: `http://localhost:8080/api/moviecomments/${localStorage.getItem("favoriteMovie")}`,
        type: 'GET',
        success: function(comments) {           
            let myComments = comments.comments;
            $("#pid2").empty();
                myComments.forEach(comment => {
                $("#pid2").append(
                '<article class="pid-comment hvr-rectangle-out ">'+
                '<div class="article-body">'+
                '<label>'+comment.creationByName+':</label>'+
                '<p>'+comment.description+'</p></div>'+
                '<footer class="article-footer"><ul>'+
                '<li class="icon-left"><i class="bx bx-message"></i><span>1</span></li>'+
                '<li class="icon-right"><i class="bx bx-heart"></i><span>1</span></li></footer></article>'  
            )});
        },
        error:function(){  
           //alert('Error - get comments');
           // top.location.href="404.html";
        }   
     })
};


/*
<div id="recommend-pid">
            <article>
                <aside>
                    <img src="img/background-1.jpg">
                </aside>
                <nav>
                    <ul>
                        <li><label>Name</label><span class='movie-name'>" + movie.movie.name </span></li>
                        <li><label>Run Time</label><span>" + movie.movie.runTime </span></li>
                        <li><label>Categories</label><span>" + movie.movie.categories </span></li>
                        <li><label>Release Date</label><span>" + movie.movie.releaseDate </span></li>
                        <li><label>Actors</label><span>" + movie.movie.actors </span></li>
                        <li><label>Storyline</label><span>" + movie.movie.runTime </span></li>
                    </ul>
                </nav>
            </article>
        </div>

*/


function getRecomandations(){
     $.ajax({
        url: 'http://localhost:8080/api/populars/',
        type: 'GET',
        success: function(movies) {
            console.log(`Success - get - movies = ${movies.length}`);
            $("#recommend-pid").empty();
            movies.forEach(movie => {
                $("#recommend-pid").append(
                    "<article><aside><img src = '" +'http://localhost:8080/' +  movie.image + "'>" +
                    '</aside><nav><ul><li><label>Name: </label><span class="movie-name">'+  movie.name + ''+    
                    '<li><label>Run Time: </label><span>'+ movie.runTime + ''+ 
                    '<li><label>Categories: </label><span>'+  movie.categories + ''+ 
                    '<li><label>Release Date: </label><span>'+  movie.releaseDate + ''+ 
                    '<li><label>Actors: </label><span>'+  movie.actors + ''+ 
                    '<li><label>Story Line: </label><span>'+  movie.storyline + ''+ '</ul></nav></article>'
                );
            });
        },  
        error:function(){  
           alert('Error - get - movies');
           //top.location.href="404.html"
        }   
    });
}

function getMovie(){
    $.ajax({
        url: `http://localhost:8080/api/movies/${localStorage.getItem("favoriteMovie")}`,
        type: 'GET',
        success: function(movie) {
            getIMDB(movie.movie.name);
            const data = JSON.parse(localStorage.getItem(movie.movie.name));
            console.log(data.data.title);

            console.log('Success - movieID');
            $("#movie-header").empty();
            $("#movie-header").append(data.data.title +" - Movie");

            $("#movie").empty();
            $("#movie").append(
                "<section id='movie-image'>" + 
                "<img src='" + data.data.poster + "'></section>"+
                "<div id='movie-details'><navbar class='movie-left'><ul>"+
                "<li><label>Name</label> : <span class='movie-name'>" + data.data.title + "</span></li>" +
                "<li><label>Time</label> : <span>"+data.data.length+"</span></li>" +
                " <li><label>Year</label> : <span>"+data.data.year+"</span></li>" +
                "<li><label>Rate</label> : <span>"+data.data.rating+"</span></li></ul></navbar>" +
                "<aside class='movie-right'><ul>"+       
                "<li><label>Categories</label> : <span>"+movie.movie.categories+"</span></li>"+
                "<li><label>Actors</label> : <span>"+movie.movie.actors+"</span></li>"+ 
                "<li><label>Writer</label> : <span>"+movie.movie.writer+"</span></li>"+ 
                "<li><label>Director</label> : <span>"+movie.movie.director+"</span></li></ul></aside>"+ 
                "<br>"+
                "<br>"+
                "<p><label>Story Line</label> : <span>"+data.data.plot+"</span></p></div>"
            );
            
        },
        error:function(){  
           alert('Error - index')  
        }   
    });
}


$(document).on('click', '#test', function(e) {
    alert("Here");
    getIMDB("avengers");
});

$(document).on('click', '.img-popular-big', function(e) {
    top.location.href="recomend.html"
});
               
$(document).on('click', '#login-button', function(e){
    e.preventDefault();
    postLogin();
});

$(document).on('click', '#registerButton', function(e){
    e.preventDefault();
    postRegister();
});

$(document).on('click', '#GetMovies', function(e){
    e.preventDefault();
    getMoviesByCategory("Action");
});

$(document).on('click', '#comment-button', function(e){
    e.preventDefault();
    postComment();
});

$(document).on('click', '#TopRated', function(e){
    e.preventDefault();
    let moviesarr=[];
    getMoviesDetalies();
    //moviesarr = getMoviesDetalies();
    //console.log(moviesarr);
});

/*
$(document).on('click', '.movie-mini', function(e){
    e.preventDefault();
    sendIdToMovie();
});
*/
