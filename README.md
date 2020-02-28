* to play https://nickmartello.github.io/GiphyAPI/

# GIPHY API

This project is the first instance of using AJAX and also api keys. If you type in a name of a character into the search box, it will request data from a server and append the GIF's to the HTML.



```javascript
$("#gif-buttons").on("click", "button", function () {

    let searchTerm = $(this).attr("data-title");

    let queryURL = "https://api.giphy.com/v1/gifs/search"
    queryURL += "?api_key=KsHx01jSsGL9FW02U0n28y1XP2eCXcLd&q=" + searchTerm + "&limit=10";

    console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response)

        for (let i = 0; i < response.data.length; i++) {
            let stillImage = response.data[i].images.fixed_width_still.url;
            let animatedImage = response.data[i].images.fixed_width.url;
            let mainURL = stillImage;
            let gifImage = $("<img>").attr("src", mainURL).attr("data-still", stillImage).attr("data-animate", animatedImage).attr("data-state", "still").addClass("gif");
            let rating = response.data[i].rating;
            let p = $("<p>").text("Rating: " + rating);
            $(".gifs").prepend(p, gifImage);
        }

     
 

