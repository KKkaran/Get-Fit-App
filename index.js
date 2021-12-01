
// display date and time
function updateTime() {
    $('#clock').html(moment().format('MMMM Do YYYY, h:mm:ss a'))
};

// highlight day on calendar
var highlightDay = function() {
    var weekDay = moment().format('dddd').toLowerCase()
    
    // check if article shares id with weekday
    var cardDate = $("#" + weekDay)
    
    if (cardDate) {
        cardDate.css("background-color", "#add8e6")
    }
};

highlightDay();
updateTime();
setInterval(updateTime, 1000);