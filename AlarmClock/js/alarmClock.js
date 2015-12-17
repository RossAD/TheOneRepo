
$(document).ready( function() {

    //This code will run after your page loads
    //Function to display the time is 12-hour format
    var hours, minutes, seconds, meridium;
    function displayTime() {
        var currentTime = new Date();
        hours = currentTime.getHours();
        minutes = currentTime.getMinutes();
        seconds = currentTime.getSeconds();
        meridium = "am";
        
        if (seconds < 10) {
            seconds = "0" + seconds;   
        }
        if (minutes < 10) {
            minutes = "0" + minutes;   
        }
        
        if (hours > 12) {
            hours = hours - 12;
            meridium = "pm";
        }
        
        if (hours < 10) {
            hours = "0" + hours;   
        }
        
        if (hours === 0) {
            hours = 12;   
        }
        
        var clockDiv = document.getElementById('clock');
        clockDiv.innerText = hours + ":" + minutes + ":"+ seconds + " " + meridium;
    }
  // Function to display the Day of the week  
  function displayDay() {
        var day;
        
        switch (new Date().getDay()) {
            case 0: 
                day = "Sunday";
                break;
            case 1: 
                day = "Monday";
                break;
            case 2:
                day = "Tuesday";
                break;
            case 3:
                day = "Wednesday";
                break;
            case 4:
                day = "Thursday";
                break;
            case 5:
                day = "Friday";
                break;
            case 6:
                day = "Saturday";
                break;
        
        }
        
        var dayDiv = document.getElementById('day');
        dayDiv.innerText = day;
    }
    //Function to display Month, day, year date
    function displayDate() {
        var currentDay = new Date();
        var month;
        var date = currentDay.getDate();
        var year = currentDay.getFullYear();
        
        switch (new Date().getMonth()) {
            case 0:
                month = "January";
                break;
            case 1:
                month = "February";
                break;
            case 2:
                month = "March";
                break;
            case 3:
                month = "April";
                break;
            case 4:
                month = "May";
                break;
            case 5:
                month = "June";
                break;
            case 6:
                month = "July";
                break;
            case 7:
                month = "August";
                break;
            case 8:
                month = "September";
                break;
            case 9:
                month = "October";
                break;
            case 10:
                month = "November";
                break;
            case 11:
                month = "December";
                break;
        }
        var dateDiv = document.getElementById('date');
        dateDiv.innerText = month + " " + date + ", " + year;
    }
    //Alarm for clock
    var alarmHour, alarmMin, alarmMerid;
    //Grabs desired alarm time on click of submit button
    document.getElementById('button').onclick=function getAlarm() {
        alarmHour = document.getElementById("hour").value;
        alarmMin = document.getElementById("minute").value;
        alarmMerid = document.getElementById("meridium").value;  
    };
    
    function checkAlarm() {
       if((alarmHour == hours) && (alarmMin == minutes) && (alarmMerid == meridium)) {
               
       }
    }
    setInterval(displayTime, 1000);
    setInterval(displayDay, 1000);
    setInterval(displayDate, 1000);
    
});