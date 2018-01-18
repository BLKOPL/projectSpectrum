//API call for NYT////////////////////////////////////////////
var userInput
var LinktoArticle

function reachNYTapi(){

// if (userInput){
 // If search item is Nan this will not let the user click submit
console.log(userInput);
var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=9bbd8167715c47cf98ffd217a669c995&sort=newest&q=" + userInput ;

    $.ajax({
      url: queryURL,
      method: "GET"
    })
    .done(function(NYTresponse) {
           console.log(NYTresponse.response.docs);

//////////////////////////////////////////////////////////////


// my var called NytData holds the result/////////////////////
     // var NytData = NYTresponse.response.docs;
     var Articletitle =NYTresponse.response.docs[0].headline.main;
     // console.log(Articletitle);
     var LinktoArticle=NYTresponse.response.docs[0].web_url

     console.log(LinktoArticle);
     var ArticleImage ="http://www.nytimes.com/"+NYTresponse.response.docs[0].multimedia[0].url;
     console.log(ArticleImage);
    var thumbnail_image =$("<img>");
      thumbnail_image.attr('src',ArticleImage);
  $("#display-blue-article").html(thumbnail_image)

    });
}
// }
////////////////////////////////////////////////////////////





//API call for WSJ////////////////////////////////////



function reachWSJapi(){
 // userInput = $("#searchBar").val().trim();

var queryURLWSJ = 'https://newsapi.org/v2/everything?' +
         'q=' + userInput + '&' +
         'sources=' + 'the-wall-street-journal' + '&' +
         'from=2018-01-15&' + //change date with moment
         'sortBy=popularity&' +
         'apiKey=29a6e2a1dcf34cc9a4528d592d8b5ed8';


     $.ajax({
       url: queryURLWSJ,
       method: "GET"
     }).done(function(response) {
       console.log(response);

       for (i=0; i<response.articles.length; i++) {
         var source = response.articles[i].source.id
         var title = response.articles[i].title
         console.log(source);
         if (source === "the-wall-street-journal") {
           console.log(title);
           break;
         }
       };
  var imageWSJ = response.articles[0].urlToImage;
  var thumbnail_image =$("<img>");
      thumbnail_image.attr('src', imageWSJ);
  $("#display-neutral-article").html(thumbnail_image)


     });

}
///////////////////////////////////////////////////////





//API call for BB/////////////////////////////////////
function reachBBapi(){
// userInput=$("#searchBar").val().trim();

var queryURLBreitbart = 'https://newsapi.org/v2/everything?' +
         'q=' + userInput + '&' +
         'sources=' + 'breitbart-news' + '&' +
         'from=2018-01-15&' + //change date with moment
         'sortBy=popularity&' +
         'apiKey=29a6e2a1dcf34cc9a4528d592d8b5ed8';


     $.ajax({
       url: queryURLBreitbart,
       method: "GET"
     }).done(function(response) {
       console.log(response);

       for (i=0; i<response.articles.length; i++) {
         var source = response.articles[i].source.id
         var title = response.articles[i].title
         console.log(source);
         if (source === "breitbart-news") {
           console.log(title);
           break;
         }
       };

   var imageBB = response.articles[0].urlToImage;
  var thumbnail_image =$("<img>");
      thumbnail_image.attr('src', imageBB);
  $("#display-neutral-article").html(thumbnail_image)


     });
   }
//////////////////////////////////////////////////////



//when user clicks submit////////////////////////////
$("#submitBtn").on("click", function(event){
event.preventDefault();

userInput=$("#searchBar").val().trim();
if (userInput){
reachNYTapi();
reachWSJapi();
reachBBapi();
}

});

$("#nytArticle").append(LinktoArticle);
$("#wsjArticle").append(LinktoArticle);
$("#breitbartArticle").append(LinktoArticle);
