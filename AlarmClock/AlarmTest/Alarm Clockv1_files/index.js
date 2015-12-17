
$(document).ready( function() {

    //generic button creator
    function newButton (divId, callBack) {
    	if (typeof callBack === 'function')
    		document.getElementById(divId).addEventListener('click', callBack);
    }
    
    //Function to display the time is 12-hour format
    var hours, minutes, seconds, meridian, alarmHour, alarmMinute, alarmMeridian;
    
    function displayTime() {
        var currentTime = new Date();
        hours = currentTime.getHours();
        minutes = currentTime.getMinutes();
        seconds = currentTime.getSeconds();
        meridian = "am";
        
        if (seconds < 10) {
            seconds = "0" + seconds;   
        }
        if (minutes < 10) {
            minutes = "0" + minutes;   
        }
        if (hours > 12) {
            hours = hours - 12;
            meridian = "pm";
        }
        if (hours < 10) {
            hours = "0" + hours;   
        }
        if (hours == 0) {
            hours = 12;   
        }
        
        var clockDiv = document.getElementById('clock');
        clockDiv.innerText = hours + ":" + minutes + ":"+ seconds + " " + meridian;
    }
    //Function to display alternate time zone
    function displayAlt() {
    	var altTime = new Date();
    	// local time in milliseconds
    	var localTime = altTime.getTime();
    	//Getting local UTC offset converted to milliseconds
    	var locUtcOffSet = altTime.getTimezoneOffset()*60000;
    	var uniTimeCode = localTime + locUtcOffSet;
    	var valu = document.getElementById("zone");
    	// Time zone selection
    	var offSet;
    	switch (Number(valu.options[valu.selectedIndex].value)) {
    		case 0:
    			// New York City (Eastern US)
    			offSet = -4;
    			break;
    		case 1:
    			// San Antonio (Central US)
    			offSet = -5;
    			break;
    		case 2:    	
    			// Denver (Mountain US)
    			offSet = -6;
    			break;
    		case 3:
    			// San Francisco (Pacific US)
    			offSet = -7;
    			break;
    		case 4:
    			// UTC
    			offSet = 0;
    			break;	
    	}
    	//Convert the offset hours into milliseconds and add to UTC to get desired Time Zone
    	var zone = uniTimeCode + (3600000*offSet);
    	var altZone = new Date(zone);
    	var zoneDiv = document.getElementById('zoneTime');
    	zoneDiv.innerText = altZone.toLocaleString();	
    }
    // Function and global variable for weather widget
    var wxLoc;
	function displayWx() {
		var wxDiv = document.getElementById("wx1");
		var wxIcon = document.getElementById("wxIcon");
		var lstUp = document.getElementById("lastUpdate");
		//displays time of last refresh
		lstUp.innerText = "Last Updated at " + hours + ":" + minutes + " " + meridian;		
		//sets weather location to local on initial page refresh
		if (wxLoc == undefined)
			wxLoc = "autoip";
		//listens for button click and grabs zip code entered
		newButton('wxButt', function() {
			wxLoc = document.getElementById('wxZip').value;
			displayWx();
			document.getElementById('wxZip').value = "";
			});

		//sends request for weather object to Wunderground, returned in parsed JSON format		
		$.ajax({
			url:("http://api.wunderground.com/api/70ba34089d4744a1/conditions/q/" + wxLoc + ".json"),
			dataType: "jsonp",
			success : function(jsonFile) {
				var loc = jsonFile['current_observation']['display_location']['full'];
				var temp = jsonFile['current_observation']['temperature_string'];
				var cond = jsonFile['current_observation']['weather'];
				var wxIconUrl = jsonFile['current_observation']['icon_url'];
				var wxForc = jsonFile['current_observation']['forecast_url']
				wxDiv.innerText = "Current Location: " + loc + "\nConditions: " + 
					cond + "\nTemperature: " + temp;
				wxIcon.src = wxIconUrl;
				document.getElementById("wxLink").href = wxForc;
			},
			error: function(error) {
				alert("Your Weather request has produced an error.  Please try again with a valid Zip Code.");
			},
		});
		
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
        
        switch (currentDay.getMonth()) {
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
    
    //Grabs desired alarm time on click of submit button
    newButton('alarmButton', function() {
        alarmHour = document.getElementById('hour').value;
        alarmMinute = document.getElementById('minute').value;
        alarmMeridian = document.getElementById('meridian').value;
        if ((alarmHour > 12 || alarmHour < 1) || (alarmMinute > 59 || alarmMinute < 0)) {
        	alert(alarmHour + ":" + alarmMinute + " " + alarmMeridian + " is not valid, enter a valid time using a 12-Hour clock.");
        	alarmHour = undefined;
        	alarmMinute = undefined;
        	alarmMeridian = undefined;
        }
        document.getElementById('hour').value = "";
        document.getElementById('minute').value = "";
        document.getElementById('meridian').value = "";
    })

    //Displays current set alarm
    function currentAlarm() {
    	var alarmDiv = document.getElementById('currentAlarm');
    	if (alarmHour == undefined || alarmMinute == undefined || alarmMeridian == undefined)
    		alarmDiv.innerText = "Current Alarm : Not Set";
    	else
    		alarmDiv.innerText = "Current Alarm: " + alarmHour + ":" + alarmMinute + " " + alarmMeridian;
	}
    
    //Check current time vs current alarm
    function checkAlarm() {
       var i = 0;
       var snButt = document.getElementById('snoozeButt');
       var x = 1;
       function alarmLoop() {
       		setTimeout(function() {
       			var alarmDing = new Audio('../AlarmClock/sounds/DingLing.mp3');
       			alarmDing.currentTime = 0;
       			alarmDing.play();
       			if ($("#body").hasClass("norm"))
       				$("#body").removeClass("norm").addClass("alarm");
       			else
       				$("#body").removeClass("alarm").addClass("norm");
       			i++;
       			//Button to stop alarm
       			newButton('snoozeButt', function(){x = 0});
       			if ((i < 60) && (x == 1)) { 
       				alarmLoop();
       			}
       			else {
       				//Remove button once alarm shut off
       				$("#snoozeButt").removeClass("snoozeVisible");
       				snButt.innerText = "";
       				if ($("#body").hasClass("alarm"))
       					$("#body").removeClass("alarm").addClass("norm");
       			}	
       		}, 1000);
       }
       
       if((alarmHour == hours) && (alarmMinute == minutes) && (seconds == 0) && (alarmMeridian == meridian)) {	
       		//Add button to shut off alarm
       		$("#snoozeButt").addClass("snoozeVisible"); 		
       		snButt.innerText = "Stop Alarm";
       		alarmLoop();
       }	      
    }
    //set weather refresh in minutes
    var wxRefresh = 5;
    
    setInterval(displayWx, 60000*wxRefresh);
    setInterval(displayTime, 1000);
    setInterval(displayAlt, 1000);
    setInterval(displayDay, 1000);
    setInterval(displayDate, 1000);
    setInterval(currentAlarm, 1000);
    setInterval(checkAlarm, 1000);
    setTimeout(displayWx, 1020);
});