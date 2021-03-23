/* global dayOk */

// ladowanie strony
var underWWW = new XMLHttpRequest();

// --- stale i zmienne dla obslugi dat ---
const oneDay = 86400000; //86 400 000 milisekund = 1 dzien
var sysDate = new Date();
var firstDate, secondDate;
// name of month
const nameMonthFullPL = 
        ["styczeń", "luty", "marzec", "kwiecień", "maj", "czerwiec",
        "lipiec", "sierpień", "wrzesień", "październik", "listopad", "grudzień"];

const nameMonthFullEN = 
        ["January","February","March","April","May","June",
        "July","August","September","October","November","December"];

const nameMonthFullGE =
        ["Januar", "Februar", "März", "April", "Mai", "Juni",
        "Juli", "August", "September", "Oktober", "November", "Dezember"];

const nameMonthFullES =
        ["enero", "febrero", "marzo", "abril", "mayo", "junio",
        "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    
const nameMonthFullIT =
        ["gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno",
        "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre"];

// name of days
const nameDayFullPL = ["niedziela", "poniedziałek", "wtorek", "środa", "czwartek", "piątek", "sobota"];
const nameDayFullEN = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const nameDayFullGE = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
const nameDayFullES = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
const nameDayFullIT = ["domenica", "lunedì", "martedì", "mercoledì", "giovedì", "venerdì", "sabato"];

const normalYear =[31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; //rok zwykly
const leapYear =[31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; //rok przestepny

//var firstDate = enteredDate();
// --- koniec zmiennych do obslugi daty ---

function openPage(pageName, elmnt, color) {
  // Hide all elements with class="tabcontent" by default */
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Remove the background color of all tablinks/buttons
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].style.backgroundColor = "";
  }

  // Show the specific tab content
  document.getElementById(pageName).style.display = "block";

  // Add the specific color to the button used to open the tab content
  elmnt.style.backgroundColor = color;
    
  // ładowanie zawartiosci ze stron zewnetrznych
  var subpageHome = new XMLHttpRequest();
  subpageHome.open('GET', 'mwmHTML/home.html', false);
  subpageHome.send();
  document.getElementById('subpageHome').innerHTML = subpageHome.response;
  
  var subpageCalendar = new XMLHttpRequest();
  subpageCalendar.open('GET', 'mwmHTML/daty.html', false);
  subpageCalendar.send();
  document.getElementById('subpageCalendar').innerHTML = subpageCalendar.response;
  
  var subpageGallery = new XMLHttpRequest();
  subpageGallery.open('GET', 'mwmHTML/gallery.html', false);
  subpageGallery.send();
  document.getElementById('subpageGallery').innerHTML = subpageGallery.response;
  
  var subpageMedia = new XMLHttpRequest();
  subpageMedia.open('GET', 'mwmHTML/media.html', false);
  subpageMedia.send();
  document.getElementById('subpageMedia').innerHTML = subpageMedia.response;
  
  var header = new XMLHttpRequest();
  header.open('GET', 'mwmHTML/header.html', false);
  header.send();
  document.getElementById('headerPage').innerHTML = header.response;
  
  var footer = new XMLHttpRequest();
  footer.open('GET', 'mwmHTML/footer.html', false);
  footer.send();
  document.getElementById('footerPage').innerHTML = footer.response;
}

//odsluga daty
function firstDates(){
    // wprowadzam date
    firstDate = enteredDate();
    dayToCheck = howManyDaysBetween(sysDate, firstDate);
    enteredDays = document.getElementById("enterYourDays").value;
    yourChoosenDay = dayYouChoose(firstDate, enteredDays);
    
    //robie obliczenia
    document.getElementById("firstDate").innerHTML = 
            nameDayFullPL[firstDate.getDay()] + ", " + 
            firstDate.getDate() + " " +
            nameMonthFullPL[firstDate.getMonth()] +  " " +
            firstDate.getFullYear();
    
    document.getElementById("leapYear").innerHTML =
            checkLeapYear(firstDate.getFullYear());
    
    document.getElementById("dayOfYourLife").innerHTML = 
            dayToCheck + " czyli "
            // howManyDayBetween(sysDate, firstDate) + " (" 
            + yearsMonthDaysBetweenPL(sysDate, firstDate);
   
    if ((dayToCheck % 500) === 0) {
        document.getElementById("party").innerHTML = "Party Time!";
        alert("Party Time!");}
    else {document.getElementById("party").innerHTML = " ";}
    
    document.getElementById("enteredDaysOfLife").innerHTML = 
            enteredDays.valueOf() +
            " dzień Twojego życia wypada " +
            nameDayFullPL[yourChoosenDay.getDay()] + ", " + 
            yourChoosenDay.getDate() + " " +
            nameMonthFullPL[yourChoosenDay.getMonth()] +  " " +
            yourChoosenDay.getFullYear();
    document.getElementById("leapYear2").innerHTML =
            checkLeapYear(yourChoosenDay.getFullYear());
}

function enteredDate(){
    var yourDay, yourMonth, yourYear;
    var maxDay, enteredMonth;
    var message;
    var dayOK, monthOK, yearOK;
    //firstDate = yourYear + "-" + yourMonth + "-" + yourDay;
    // sprawdzenie poprawnosci wprowadzonych danych
    
    yourDay = document.getElementById("enterYourDay").value;
    yourMonth = document.getElementById("enterYourMonth").value;
    yourYear = document.getElementById("enterYourYear").value;
    message = "Uwagi: ";
    
    enteredMonth = yourMonth - 1;
    
    if(checkLeapYear(yourYear) === true){
         maxDay = leapYear[enteredMonth];
    } else {
        maxDay = normalYear[enteredMonth]; 
    }
       
    if(isNaN(yourDay) || yourDay < 1 || yourDay > maxDay)
        { message += "Wprowadź poprawny dzień. "; 
    } else {
        dayOK = true; 
    }
    
    if(isNaN(yourMonth) || yourMonth < 1 || yourMonth > 12)
        { message += "Wprowadź poprawny miesiąc. "; 
    } else {
        monthOK = true;
    }
        
    if(isNaN(yourYear) || yourYear === " " || yourYear ==="" || yourYear === null) {
        message += "Podaj rok.";
    } else if(Number(yourYear) === 0){
        message += "Nie ma takiego roku.";
    } else {
        yearOK = true;
    }
    
    if (dayOK === true && monthOK === true && yearOK === true) {
        firstDate = new Date(yourYear + "-" + yourMonth + "-" + yourDay);
        document.getElementById("message").innerHTML = "";
        document.getElementById("firstDate").innerHTML = "Twoja data urodzenia to " + firstDate; //yourYear + "-" + yourMonth + "-" + yourDay;
    } else {
        document.getElementById("message").innerHTML = message;
    }
}

//sprawdzenie roku przestepnego
function checkLeapYear (yourYearEntered){
    if( ((yourYearEntered % 4) === 0 && (yourYearEntered % 100 !== 0)) || (yourYearEntered % 400) === 0) {
        return true;// ", rok przestępny!";
    } else {
        return false;// ", rok zwykły.";
    }
}

function howManyDaysBetween(sysDate, myDate){
    //document.getElementById("dayOfYourLife").innerHTML = Math.floor((sysDate - myDate) / oneDay);
    return Math.floor((sysDate - myDate) / oneDay); 
}

function yearsMonthDaysBetweenPL(date1, date2){
    var diff = new Date(Math.abs(date1.getTime() - date2.getTime()));
    return (diff.getFullYear() - 1970) + " lat " + diff.getMonth() + " miesięcy " + (diff.getDate() - 1) + " dni";
    //(diff.getFullYear() - 1970) + " lat " + diff.getMonth() + " miesięcy " + (diff.getDate() - 1) + " dni";
}

function dayYouChoose(myDate, howManyDays){    
     return new Date(myDate.getTime() + (howManyDays * oneDay));
}