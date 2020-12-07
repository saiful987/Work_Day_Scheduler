var happyDay = {
    "8 AM": "",
    "9 AM": "",
    "10 AM": "",
    "11 AM": "",
    "12 PM": "",
    "1 PM": "",
    "2 PM": "",
    "3 PM": "",
    "4 PM": "",
    "5 PM": "",
  };
  
  $(document).ready(function(){
    if(!localStorage.getItem('happyDay')) {
      updateCalendarTasks(happyDay);
    } else {
      updateCalendarTasks(JSON.parse(localStorage.getItem('happyDay')));
    }
  })
  
  $('#date-today').text(moment().format('dddd') + ", " + moment().format('MMMM Do YYYY, h:mm a'));
  
  var clock = 1;
  for(const property in happyDay) {
    var happyEnter = "#text-entry" + clock;
    $(happyEnter).text(happyDay[property]);
    var happyTime = "#time" + clock;
    var happyHour = moment().hour();
    var happyTime = $(happyTime).text();
    var happyNumber = hourNumberFrommyHour(happyTime);  
    if(happyNumber < happyHour) {
      $(happyEnter).addClass("thePast");
    } else if (happyNumber > happyHour) {
      $(happyEnter).addClass("theFuture");
    } else {
      $(happyEnter).addClass("thePresent");
    }
    clock ++;
  }
  
  $("button").click(function() {
    value = $(this).siblings("textarea").val();
    myHour = $(this).siblings("div").text();
    
    saveSchedule(myHour, value);
  });
  
  function hourNumberFrommyHour(myHour) {
    switch(myHour) {
      case "8 AM": return 8;
      case "9 AM": return 9;
      case "10 AM": return 10;
      case "11 AM": return 11;
      case "12 PM": return 12;
      case "1 PM": return 13;
      case "2 PM": return 14;
      case "3 PM": return 15;
      case "4 PM": return 16;
      case "5 PM": return 17;
    }
  }
  
  function loadCorrectDataset() {
    result = localStorage.getItem('happyDay')
    return (result ? result : happyDay);
  }
  
  function initializeLocalStorage() {
    localStorage.setItem('happyDay', JSON.stringify(happyDay));
  };
  
  function saveToLocalStorage(dayObj) {
    localStorage.setItem('happyDay', JSON.stringify(dayObj));
  }
  
  function saveSchedule(myHour, val) {
    if(!localStorage.getItem('happyDay')) {
      initializeLocalStorage();
    }
  
    var workHours = JSON.parse(localStorage.getItem('happyDay'));
    workHours[myHour] = val
  
    saveToLocalStorage(workHours);
  }
  
  function updateCalendarTasks(dayObject) {
    $(".calendar-row").each(function(index) {
      var res = $(this).children("div");
      $(this).children("textarea").text(dayObject[res.text()]);
    })
  }
  