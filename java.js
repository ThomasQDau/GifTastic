$(document).ready(function () {

    var animalsArr = ['Koe no Katachi', 'Kimi no na wa', 'Psycho Pass', 'Spice and Wolf', 'Re:Zero kara Hajimeru Isekai Seikatsu', 'No Game No Life', 'Overlord', 'Bakemonogatari', 'Shigatsu wa Kimi no Uso', 'Toradora'];
    for (var i = 0; i < animalsArr.length; i++) {
        var newButton = $('<button>');
        newButton.text(animalsArr[i]);
        newButton.attr('data-term', animalsArr[i]);
        newButton.addClass('button');
        $('#buttons').append(newButton);
    }

    $('#search').on('click', function () {
        event.preventDefault();
        if ($('#searchterm').val().trim() != '') {
            var newButton = $('<button>');
            newButton.text($('#searchterm').val().trim());
            newButton.attr('data-term', $('#searchterm').val().trim());
            $('#searchterm').val('');
            newButton.addClass('button');
            $('#buttons').append(newButton);
        }
    })

    $(document).on('click', '.button', function () {
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            $(this).attr('data-term') + "&api_key=dc6zaTOxFJmzC&limit=10";
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                for (var i = 0; i < 10; i++) {
                    var newGif = $('<div>');
                    var img = $('<img>');
                    newGif.addClass('imgdiv');
                    img.attr('data-state', "still");
                    img.addClass('gif');
                    img.attr('src', response.data[i].images.fixed_height_still.url)
                    img.attr('data-still', response.data[i].images.fixed_height_still.url);
                    img.attr('data-animate', response.data[i].images.fixed_height.url);
                    newGif.append('<p style="text-align:center;">rating: ' + response.data[i].rating + '</p><br>');
                    newGif.append(img);
                    $('#gifs').prepend(newGif);
                }
            })
    })

    $(document).on('click', '.gif', function () {
        if ($(this).attr('data-state') == "still") {
            $(this).attr('data-state', "animate");
            $(this).attr('src', $(this).attr('data-animate'));
        } else {
            $(this).attr('data-state', "still");
            $(this).attr('src', $(this).attr('data-still'));
        }
    })
})