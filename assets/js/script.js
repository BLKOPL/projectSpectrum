//API call for NYT////////////////////////////////////////////
var userInput
var LinktoArticle
var articleCounter = 0;
var NytHeader
var WsjHeader
var BbHeader
var nYT_articleImage
var nyt_snipit
var NytData // nyt Respo

var currentDiv // current div the image is clicked on



function reachNYTapi() {

  userInput = $("#searchBar").val().trim();
  if (userInput) {
    // If search item is Nan this will not let the user click submit

    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=9bbd8167715c47cf98ffd217a669c995&sort=newest&q=" + userInput;

    $.ajax({
        url: queryURL,
        method: "GET"
      })
      .done(function(NYTresponse) {
        // console.log(NYTresponse.response.docs);
        NytData = NYTresponse.response.docs;
        // console.log(NytData);

        // forloop that will display the 5 headers.
        $("#display-blue-article").empty();

        for (i = 0; i < 5; i++) {

          // article link for read more
          // console.log(nytArticleLink);
          var nytArticleLink = NYTresponse.response.docs[i].web_url;
          // console.log(nytArticleTitles);
          var nytArticleTitles = NYTresponse.response.docs[i].headline.main;

          // date and time //
          var publishedAt = NYTresponse.response.docs[i].pub_date

          // console.log(nYT_articleImage);

          articleCounter++;

          // maybe add a class on each list item and use on click function later on and say this.

          NytHeader = "<a onClick='displayNYTsection4(" + i + ")' href='#' ><li class='Nyt_article_list list-group-item'>" + nytArticleTitles + "</li></a>";

          $("#display-blue-article").append(NytHeader);

        };

      });
  }
}

// //API call for WSJ////////////////////////////////////

function reachWSJapi() {
  userInput = $("#searchBar").val().trim();
  if (userInput) {

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
      console.log(WSJresponse);
      // console.log(articles)
      if (WSJresponse.articles.length == 0) {
        alert(" display no article on the html for this section")
      } else {

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
      }

    })
  }
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



    //to dynamically create article list
    $("#display-red-article").empty();

    for (i = 0; i < 5; i++) {
      var bbArticleTitles = BBresponse.articles[i].title;
      // console.log(bbArticleTitles);

      var bbArticleLink = BBresponse.articles[i].url;

      // var ArticleImage ="http://www.nytimes.com/"+NYTresponse.response.docs[i].multimedia.url;

      articleCounter++;
      // maybe add a class on each list item and use on click function later on and say this.

      BbHeader = "<a onClick='displayBBsection4(" + i + ")' href='#' ><li class='Bb_article_list list-group-item'>" + bbArticleTitles + "</li></a>";




      $("#display-red-article").append(BbHeader);


    }
  })

}

// //////////////////////////////////////////////////////


//when user clicks submit////////////////////////////
$("#submitBtn").on("click", function(event) {
  event.preventDefault();

  reachNYTapi();
  reachWSJapi();
  reachBBapi();

});


$("#nytArticle").append(LinktoArticle);
$("#wsjArticle").append(LinktoArticle);
$("#breitbartArticle").append(LinktoArticle);


// on click event to trigger section 4

// when user clicks link show the link to section 4


// when user clicks this titleRed in section 3 - the related info for thay section will be poplated in section 4


function displayNYTsection4(i) {
  console.log("Test")

  // console.log(NYTresponse.response.docs);
  // my var called NytData holds the result/////////////////////
  // updating
  $("#blue_selected_article").html(NytData[i].snippet)


  var nYT_articleImage = $("<img>");
  nYT_articleImage.attr('src', "http://www.nytimes.com/" + NytData[i].multimedia[i].url);
  $("#blue_selected_image").html(nYT_articleImage);

  $("#blue_selected_date").html(NytData[i].pub_date);

  // console.log("http://www.nytimes.com/" + NytData[i].multimedia[i].url);
  // console.log(NytData[i].pub_date);
  // console.log(NytData[i])
  // console.log(NytData[i].snippet)

};

// =======================================for WSJ===============================================
function displayWSJsection4(i) {
  console.log("WSJ HAS BEEN CLICKED - where to display div");


};

//=================================For BB===============================================

function displayBBsection4(i) {
  console.log("BB HAS BEEN CLICKED - where do we display this");


};
