$(document).ready(function () {

const jumbtronEl = $("#jumbotronBox")
const currentDateEl = $("#currentDay")
const timeBlocksEl = $("#timeBlocks")

init();
var dayPlanner = {
    timeSlots: ["9AM", "10AM", "11AM", "12AM", "1PM", "2PM", "3PM", "4PM", "5PM"],
    time: [9, 10, 11, 12, 13, 14, 15, 16, 17],
    listOfTask: [
        {
            workTime: "9AM",
            task: ""
        },
        {
            workTime: "10AM",
            task: ""
        },
        {
            workTime: "11AM",
            task: ""
        },
        {
            workTime: "12AM",
            task: ""
        },
        {
            workTime: "1PM",
            task: ""
        },
        {
            workTime: "2PM",
            task: ""
        },
        {
            workTime: "3PM",
            task: ""
        },
        {
            workTime: "4PM",
            task: ""
        },
        {
            workTime: "5PM",
            task: ""
        },
    ]
}

    function init() {
        var currentDate = moment().format('dddd, MMMM Do');
        currentDateEl.text(currentDate)
        //saveDayPlanner();
}

$.each(dayPlanner.timeSlots, function (index, item) {
    var blockDiv = $("<div>")
    blockDiv.addClass("row")
    blockDiv.data("number", index)
    var time = $("<h3>").addClass("col-3 hour").text(item)
    time.data("number", item)

    var schedule = $("<input/>")
    schedule.addClass("col-8")

    if (dayPlanner.time[index] < moment().format("HH")) {
        schedule.addClass("past")
    }
    else if (dayPlanner.time[index] == moment().format("HH")) {
    schedule.addClass("present")
}

    else if(dayPlanner.time[index]>moment().format("HH")){
    schedule.addClass("future")
}

var saveButton = $("<button>")
saveButton.addClass("col-1 saveBtn fa fa-save")
saveButton.data("number", index + 1)

saveButton.on("click", function () {
onButtonClicks(time, schedule, saveButton);
})

blockDiv.append(time, schedule, saveButton)
timeBlocksEl.append(blockDiv)

populateDayPlanner(schedule);

})

function onButtonClicks(time, schedule, saveButton) {

    event.preventDefault()
    var onSaveButtonClicked = saveButton.data("number");
    var getInputValue = schedule.val();
    var getTime = time.data("number")
    if (onSaveButtonClicked) {
        dayPlanner.listOfTask.push(getInputValue)
    }

    saveDayPlanner();

}

function saveDayPlanner(){

    localStorage.setItem("dayPlanner", JSON.stringify(dayPlanner))

    function populateDayPlanner(schedule) {
        var newDayPlannerObject = JSON.parse(localStorage.getItem("dayPlanner"))
        console.log(newDayPlannerObject.listOfTask[0])
        schedule.val(newDayPlannerObject.listOfTask[0])
    }
});