//Global Variables
var userInput
var LinktoArticle
var articleCounter = 0;
var NytHeader
var WsjHeader
var BbHeader
var nYT_articleImage
var nyt_snipit
var NytData // nyt Respo
var wSjData // WSJ repo holder
var bB_Data // BB Repo holder
var WSJ_articleImage
var bB_articleImage
var section4_ArticleLocation ="leftSide" // current div the image is clicked on left side or right side
// section4_ArticleLocation will be used below in an if else


// the below var is to make the next click on the title to be appended to the left/right section based on what was clicked first
var currentSelectedArticle=""


function reachNYTapi() {

  userInput = $("#searchBar").val().trim();
  // if (userInput) {
    // If search item is Nan this will not let the user click submit

    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=9bbd8167715c47cf98ffd217a669c995&sort=newest&q=" + userInput;

    $.ajax({
        url: queryURL,
        method: "GET"
      })
      .done(function(NYTresponse) {
        // console.log(NYTresponse.response.docs);
        // console.log(NYTresponse)
        NytData = NYTresponse.response.docs;
        // console.log(NytData[i].web_url);

        // forloop that will display the 5 headers.
        $("#display-blue-article").empty();

        for (i = 0; i < 5; i++) {

          // article link for read more
          // console.log(nytArticleLink);
          // var nytArticleLink = NYTresponse.response.docs[i].web_url;
          // console.log(nytArticleTitles);
          var nytArticleTitles = NytData[i].headline.main;
          console.log(NytData[i].headline.main);
          // date and time //
          // var publishedAt = NYTresponse.response.docs[i].pub_date

          // console.log(nYT_articleImage);

          articleCounter++;

          // maybe add a class on each list item and use on click function later on and say this.

          NytHeader = "<a onClick='displayNYTsection4(" + i + ")' href='#' ><li class='Nyt_article_list list-group-item'>" + nytArticleTitles + "</li></a>";

          $("#display-blue-article").append(NytHeader);

        };

      });
  // }
}

// //API call for WSJ////////////////////////////////////

function reachWSJapi() {
  userInput = $("#searchBar").val().trim();
  // if (userInput) {

    var queryURLWSJ = 'https://newsapi.org/v2/everything?' +
      'q=' + userInput + '&' +
      'sources=' + 'the-wall-street-journal' + '&' +
      'sortBy=publishedAt&' +
      'language=en&' +
      'apiKey=29a6e2a1dcf34cc9a4528d592d8b5ed8';


    $.ajax({
      url: queryURLWSJ,
      method: "GET"
    }).done(function(WSJresponse) {
      wSjData = WSJresponse.articles;

      // console.log(wSjData);
      // console.log(articles)
      // if (WSJresponse.articles.length == 0) {
      //   alert(" display no article on the html for this section")
      // } else {

        //to dynamically create article list
        $("#display-neutral-article").empty();

        for (i = 0; i < 5; i++) {
          var wsjArticleTitles = WSJresponse.articles[i].title;
          // console.log(wsjArticleTitles);

          var wsjArticleLink = WSJresponse.articles[i].url;

          articleCounter++;
          // maybe add a class on each list item and use on click function later on and say this.
          WsjHeader = "<a onClick='displayWSJsection4(" + i + ")' href='#' ><li class='Wsj_article_list list-group-item'>" + wsjArticleTitles + "</li></a>";





          $("#display-neutral-article").append(WsjHeader);

        }
      // }

    })
// }
}
// // // ///////////////////////////////////////////////////////

// // // //API call for BB/////////////////////////////////////
function reachBBapi() {
  userInput = $("#searchBar").val().trim();

  var queryURLBreitbart = 'https://newsapi.org/v2/everything?' +
    'q=' + userInput + '&' +
    'sources=' + 'breitbart-news' + '&' +
    'sortBy=publishedAt&' +
    'language=en&' +
    'apiKey=29a6e2a1dcf34cc9a4528d592d8b5ed8';


  $.ajax({
    url: queryURLBreitbart,
    method: "GET"
  }).done(function(BBresponse) {

    // console.log(BBresponse);
    // console.log(BBresponse.articles);
  // //   // updating bB_Data to hold the repo
    //  bB_Data = BBresponse.articles;
    // console.log(bB_Data);


    //to dynamically create article list
    $("#display-red-article").empty();

    for (i = 0; i < 5; i++) {
      var bbArticleTitles = BBresponse.articles[i].title;
      console.log(bbArticleTitles);

      var bbArticleLink = BBresponse.articles[i].url;

      // var ArticleImage ="http://www.nytimes.com/"+NYTresponse.response.docs[i].multimedia.url;

      articleCounter++;
      // maybe add a class on each list item and use on click function later on and say this.

      BbHeader = "<a onClick='displayBBsection4(" + i + ")' href='#' ><li class='Bb_article_list list-group-item'>" + bbArticleTitles + "</li></a>";




      $("#display-red-article").append(BbHeader);


    }
  });

};

// //////////////////////////////////////////////////////


////////////////////////////////////////START OF LI'S SECTION//////////////////////////////////////////




//when user clicks submit////////////////////////////
$("#submitBtn").on("click", function(event){

      event.preventDefault();
      reachNYTapi();
      reachWSJapi();
      reachBBapi();
      keywordArray.push(userInput);
      console.log(keywordArray);
      createButton();
      $('#searchBar').val('')
      $('.display').removeClass('display')
});

//when user presses enter////////////////////////////
$("#searchBar").keypress(function(event) {

  if (event.which == 13) {
      event.preventDefault();
      reachNYTapi();
      reachWSJapi();
      reachBBapi();
      keywordArray.push(userInput);
      console.log(keywordArray);
      createButton();
      $('#searchBar').val('')
      $('.display').removeClass('display')      
  }
});

// //when user clicks a keyword button////////////////////////////
// $(".previous-searches").on("click", function(event){
//
//
//       reachNYTapi();
//       reachWSJapi();
//       reachBBapi();
//       keywordArray.push(userInput);
//       console.log(keywordArray);
//       createButton();
//       console.log('sup');
// });




/////create buttons for section II div
var keywordArray = [];

function createButton() {
       $('.center-slider').empty();
       for (i = 0; i < keywordArray.length; i++) {
         $('.center-slider').append('<div><button class="previous-searches" onclick="reachNYTapi();reachWSJapi();reachBBapi();createButton();">' + keywordArray[i] + '</button></div>')
         // localStorage.setItem("keywords", JSON.stringify(keywordArray[i]));
         // var storedKeywords = JSON.parse(localStorage.getItem("keywords"));
       }
      };


$("#nytArticle").append(LinktoArticle);
$("#wsjArticle").append(LinktoArticle);
$("#breitbartArticle").append(LinktoArticle);







// when user clicks this titleRed in section 3 - the related info for thay section will be poplated in section 4

//===========================********=======================Code to make section 4 interavtivr =====******************==================//
function displayNYTsection4(i) {


  // console.log(NYTresponse.response.docs);
  // my var called NytData holds the result/////////////////////
  // updating
  var nYT_articleImage = $("<img>");
  nYT_articleImage.attr('src', "http://www.nytimes.com/" + NytData[i].multimedia[i].url);

// where to place the articles in the after the user clicks on one after the other

  if((currentSelectedArticle=="nyt" && section4_ArticleLocation=="rightSide")|| section4_ArticleLocation=="leftSide"){

  $("#left_selected_article").html(NytData[i].snippet)
  $("#left_selected_image").html(nYT_articleImage);
  $("#left_selected_date").html(NytData[i].pub_date);
  $("#left_read_more").html(NytData[i].web_url);
  //NytData[i].web_url


  section4_ArticleLocation="rightSide";

}
// if the first condition is true then no need to run the second code
else if((currentSelectedArticle=="nyt" && section4_ArticleLocation=="leftSide")|| section4_ArticleLocation=="rightSide") {


    section4_ArticleLocation="leftSide";  // resetting it
    $("#right_selected_article").html(NytData[i].snippet)
    $("#right_selected_image").html(nYT_articleImage);
    $("#right_selected_date").html(NytData[i].pub_date);
    $("#right_read_more").html(NytData[i].web_url);

}
currentSelectedArticle="nyt"  // resetting the value of currentSelectedArticle

};
// =======================================for WSJ===============================================
function displayWSJsection4(i) {
  console.log("WSJ HAS BEEN CLICKED - where to display div");

var WSJ_articleImage = $("<img>");
WSJ_articleImage.attr('src', wSjData[i].urlToImage);

if((currentSelectedArticle=="WSJ" && section4_ArticleLocation=="rightSide")|| section4_ArticleLocation=="leftSide"){

  section4_ArticleLocation="leftSide";  // resetting it
  $("#left_selected_article").html(wSjData[i].description)
  $("#left_selected_image").html(WSJ_articleImage);
  $("#left_selected_date").html(wSjData[i].publishedAt);
    $("#left_read_more").html(wSjData[i].url);

}


// if the first condition is true then no need to run the second code
else if((currentSelectedArticle=="WSJ" && section4_ArticleLocation=="leftSide")|| section4_ArticleLocation=="rightSide") {


    section4_ArticleLocation="leftSide";  // resetting it
    $("#right_selected_article").html(wSjData[i].description)
    $("#right_selected_image").html(WSJ_articleImage);
    $("#right_selected_date").html(wSjData[i].publishedAt);
        $("#right_read_more").html(wSjData[i].url);

}
currentSelectedArticle="WSJ"  // resetting the value of currentSelectedArticle

};
//=================================For BB===============================================

function displayBBsection4(i) {
  console.log("BB HAS BEEN CLICKED - where do we display this");
  //
  console.log(bB_Data); // the whole response
  console.log(bB_Data[i].title)  // titile
  console.log(bB_Data[i].description) // description
  console.log(bB_Data[i].publishedAt) // publication
  console.log(bB_Data[i].urlToImage)  // url image
  console.log(bB_Data[i].url) // read more link




  var bB_articleImage = $("<img>");
  bB_articleImage.attr('src',bB_Data[i].urlToImage);

  if((currentSelectedArticle=="bb" && section4_ArticleLocation=="rightSide")|| section4_ArticleLocation=="leftSide"){

  section4_ArticleLocation="leftSide";  // resetting it
  $("#left_selected_article").html(bB_Data[i].description)
  $("#left_selected_image").html(bB_articleImage);
  $("#left_selected_date").html(bB_Data[i].publishedAt);
  $("#left_read_more").html(bB_Data[i].url);
  }


  // if the first condition is true then no need to run the second code
  else if((currentSelectedArticle=="bb" && section4_ArticleLocation=="leftSide")|| section4_ArticleLocation=="rightSide") {


    section4_ArticleLocation="leftSide";  // resetting it
    $("#right_selected_article").html(bB_Data[i].description)
    $("#right_selected_image").html(bB_articleImage);
    $("#right_selected_date").html(bB_Data[i].publishedAt);
    $("#right_read_more").html(bB_Data[i].url);

  }
  currentSelectedArticle="bb"  // resetting the value of currentSelectedArticle

};

$(document).on('ready', function() {
  console.log("HI WORLD");

  $(".center").slick({
    centerPadding: '60px',
    slidesToShow: 3,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            arrows: true,
            centerMode: true,
            centerPadding: '40px',
            slidesToShow: 3
          }
        },
        {
          breakpoint: 480,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '40px',
            slidesToShow: 1
          }
        }
      ]
    });
});
