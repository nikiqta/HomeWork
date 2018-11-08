function getMessage() {

    $('body').append($(`<span>${getRandomInt(49)} </span>`));

    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }
    $.get('/data/messages')
        .then(function (data) {
           console.log(data);
        });
}