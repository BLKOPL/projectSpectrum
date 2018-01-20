//API call for NYT////////////////////////////////////////////
var userInput
var LinktoArticle
var articleCounter = 0;

function reachNYTapi(){

userInput=$("#searchBar").val().trim();
if (userInput){
 // If search item is Nan this will not let the user click submit

var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=9bbd8167715c47cf98ffd217a669c995&sort=newest&q=" + userInput ;

    $.ajax({
      url: queryURL,
      method: "GET"
    })
    .done(function(NYTresponse) {
           // console.log(NYTresponse.response.docs);
// my var called NytData holds the result/////////////////////
     var NytData = NYTresponse.response.docs ;
// console.log(NytData);

// forloop that will display the 5 headers.
    $("#display-blue-article").empty();

     for (i=0; i<5; i++){
       var nytArticleTitles = NYTresponse.response.docs[i].headline.main;
       // console.log(nytArticleTitles);

       // var ArticleImage ="http://www.nytimes.com/"+NYTresponse.response.docs[i].multimedia.url;

       articleCounter++;
        // maybe add a class on each list item and use on click function later on and say this.
       var NytHeader="<ol><p><li class='Nyt_article_list list-group-item'>"+ nytArticleTitles  +"</li></p></ol>";
       //    // console.log(ArticleImage);
         // var thumbnail_image =$("<img>");
         //   thumbnail_image.attr('src',ArticleImage);
         //   console.log(thumbnail_image);
        $("#display-blue-article").append(NytHeader);
       // $("#display-blue-imag").html(thumbnail_image )

// how can I hake each its open

};
     // console.log(NytData);
     // var ArticHeadLine =NYTresponse.response.docs[i].headline;
     // console.log(ArticHeadLine);
  //    var LinktoArticle=NYTresponse.response.docs[0].web_url
  //    var publishedAt  =NYTresponse.response.docs[0].pub_date
  //    // var title1 = NYTresponse.response.docs[0].headline.main
  //
  //
  //    // console.log(LinktoArticle);

  // // $(".titleBlue").html(title1);
  //   $(".time_date").html(publishedAt);

    });
}
}
////////////////////////////////////////////////////////////
//
//
//
//
//
// //API call for WSJ////////////////////////////////////



function reachWSJapi(){
 userInput = $("#searchBar").val().trim();
 if (userInput){

var queryURLWSJ = 'https://newsapi.org/v2/everything?' +
         'q=' + userInput + '&' +
         'sources=' + 'the-wall-street-journal' + '&' +
         'sortBy=publishedAt&' +
         'language=en&' +
         'apiKey=29a6e2a1dcf34cc9a4528d592d8b5ed8';


     $.ajax({
       url: queryURLWSJ,
       method: "GET"
     }).done(function(response) {
       // console.log(response);
          if (response.articles.length==0){
            alert(" display no article on the html for this section")
          }
          else{
       // for (i=0; i<response.articles.length; i++) {
       //   var source = response.articles[i].source.id
       //   var title = response.articles[i].title
       //   console.log(source);
       //   if (source === "the-wall-street-journal") {
       //     console.log(title);
       //     break;
       //   }
       // };
  // var imageWSJ = response.articles[0].urlToImage;
  // var time_date2  = response.articles[0].publishedAt
  // var title2 = response.articles[0].title
  // var description=response.articles[0].title.description
  // console.log(imageWSJ);
  // var thumbnail_image =$("<img>");
      // thumbnail_image.attr('src', imageWSJ);


//to dynamically create article list
    $("#display-neutral-article").empty();

       for (i=0; i<5; i++){
             var wsjArticleTitles = response.articles[i].title;
             console.log(wsjArticleTitles);

             // var ArticleImage ="http://www.nytimes.com/"+NYTresponse.response.docs[i].multimedia.url;

             articleCounter++;
              // maybe add a class on each list item and use on click function later on and say this.
             var WsjHeader="<ol><p><li class='Wsj_article_list list-group-item'>"+ wsjArticleTitles  +"</li></p></ol>";
             //    // console.log(ArticlewsjArticleTitlesImage);
               // var thumbnail_image =$("<img>");
               //   thumbnail_image.attr('src',ArticleImage);
               //   console.log(thumbnail_image);
              $("#display-neutral-article").append(WsjHeader);




  // $("#display-neutral-article").html(thumbnail_image)
  // $(".titleNeutral").html(title2);
  // $(".time_date2").html(description);

}
     }

})
}
}
// // // ///////////////////////////////////////////////////////
// //
// // //
// // //
// // //
// // // //API call for BB/////////////////////////////////////
function reachBBapi(){
userInput=$("#searchBar").val().trim();

var queryURLBreitbart = 'https://newsapi.org/v2/everything?' +
         'q=' + userInput + '&' +
         'sources=' + 'breitbart-news' + '&' +
         'sortBy=publishedAt&' +
         'language=en&' +
         'apiKey=29a6e2a1dcf34cc9a4528d592d8b5ed8';


     $.ajax({
       url: queryURLBreitbart,
       method: "GET"
     }).done(function(response) {
//
//        console.log(response.articles);
//        if (response.articles.length==0){
//          alert(" display no article on the html for this section")
//        }
//          else{
//
//        for (i=0; i<response.articles.length; i++) {
//          var source = response.articles[i].source.id
//          var title = response.articles[i].title
//          console.log(source);
//          if (source === "breitbart-news") {
//            // console.log(title);
//            break;
//          }
//        };

// // code error on 119
//    var imageBB = response.articles[0].urlToImage;
//    var time_date3  = response.articles[0].publishedAt
//    var title3 = response.articles[0].title
//    console.log(imageBB);
//    var thumbnail_image =$("<img>");
//        thumbnail_image.attr('src', imageBB);

//to dynamically create article list
  $("#display-red-article").empty();

       for (i=0; i<5; i++){
             var bbArticleTitles = response.articles[i].title;
             console.log(bbArticleTitles);

             // var ArticleImage ="http://www.nytimes.com/"+NYTresponse.response.docs[i].multimedia.url;

             articleCounter++;
              // maybe add a class on each list item and use on click function later on and say this.
             var BbHeader="<ol><p><li class='Bb_article_list list-group-item'>"+ bbArticleTitles  +"</li></p></ol>";
             //    // console.log(ArticlewsjArticleTitlesImage);
               // var thumbnail_image =$("<img>");
               //   thumbnail_image.attr('src',ArticleImage);
               //   console.log(thumbnail_image);
              $("#display-red-article").append(BbHeader);

//    $("#display-neutral-article").html(thumbnail_image)
//    $(".titleRed").html(title3);
//    $(".time_date3").html(time_date3);
//
}
})

}

// //////////////////////////////////////////////////////
//
// create a var that holds a button
// then when user hits submit call this button
// when user clicks on this button call the #submitBtn function

//when user clicks submit////////////////////////////
$("#submitBtn").on("click", function(event){
event.preventDefault();

reachNYTapi();
reachWSJapi();
reachBBapi();


});



$("#nytArticle").append(LinktoArticle);
$("#wsjArticle").append(LinktoArticle);
$("#breitbartArticle").append(LinktoArticle);


// $(".Nyt_article_list").on("click", function(event){
// event.preventDefault();
//
// // var section4_blue_article=
// for (i=0; i<NytHeader.length; i++){
//   var nytArticleTitles = NYTresponse.response.docs[i].headline.main;
//   articleCounter++;
//
//
// });
// create an on click event listener to create another div to section 4 for compare and contrast
