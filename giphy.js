let topics = ["Bugs Bunny", "Michael Jordan", "Daffy Duck"];

function renderButtons() {
    $("#gif-buttons").empty();

    topics.forEach(function (topic) {

        let button = $("<button>");
        button.text(topic);
        button.attr("data-title", topic);


        $("#gif-buttons").append(button);

    });

}

$("#add-gif").on("click", function (event) {
    event.preventDefault();
    let gifAct = $("#gif-input").val().trim();
    topics.push(gifAct);
    renderButtons();
    $("#gif-input").val();
});
    
$("add-gif").on("submit", function (event) {
    event.preventDefault();
    let topic = $("#gif-input").val().trim();
    topics.push(topic);
    renderButtons();
    $("#gif-input").val();
});

renderButtons();


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

        $(".gif").on("click", function () {
            let state = $(this).attr("data-state");
            if (state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
            } else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");

            }

        });
    });

});


