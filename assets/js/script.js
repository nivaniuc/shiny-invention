const currentDateEl = $("#currentDay")
const timeBlocksEl = $("#timeBlocks")
const newDayPlanner = JSON.parse(localStorage.getItem("dayPlanner"))

init();
// Creates a list of collections
var dayPlanner = {
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

init();
// Used moment to get the date
function init() {
    var currentDate = moment().format('dddd, MMMM Do');
    currentDateEl.text(currentDate)
    checkLocalStorage();
}

//Check local storage
function checkLocalStorage() {

    if (newDayPlanner !== null) {
        dayPlanner = newDayPlanner;
    }

    else {
        saveDayPlanner()
    }
}

$.each(dayPlanner.listOfTask, function (index, item) {
    var blockDiv = $("<div>").addClass("row")
    var time = $("<h3>").addClass("col-3 hour").text(item.workTime).data("timeSlot", item.workTime)


    var schedule = $("<textarea/>").text(item.task).addClass("col-7").data("textAreaRow", index)

    if (dayPlanner.time[index] < moment().format("HH")) {
        schedule.addClass("past")
    }
    else if (dayPlanner.time[index] == moment().format("HH")) {
        schedule.addClass("present")
    }

    else if (dayPlanner.time[index] > moment().format("HH")) {
        schedule.addClass("future")
    }

    var saveButton = $("<button>").addClass("col-2 saveBtn fa fa-save").data("saveButton", index + 1)
    saveButton.on("click", function () {
        init();
        onButtonClicks(time, schedule, saveButton);
    })
    blockDiv.append(time, schedule, saveButton)
    timeBlocksEl.append(blockDiv)

})

//Compares the value of the text area and the saves on local storage
function onButtonClicks(time, schedule, saveButton) {
    event.preventDefault()
    if (saveButton.data("saveButton") - 1 === schedule.data("textAreaRow")) {
        var textAreaIndex = schedule.data("textAreaRow");
        dayPlanner.listOfTask[textAreaIndex].task = schedule.val();

        saveDayPlanner();
        populateDayPlanner(schedule);
    }
}

//Function to save to local storage
function saveDayPlanner() {
    localStorage.setItem("dayPlanner", JSON.stringify(dayPlanner))
}
