/* global dayOk */

// ladowanie strony
var underWWW = new XMLHttpRequest();

// --- stale i zmienne dla obslugi dat / const and variables for operating on date---
const oneDay = 86400000; //86 400 000 milisekund = 1 dzien / day
var sysDate = new Date();
var firstDate, secondDate;
var temp1Date, temp2Date;

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

const normalYear = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; //rok zwykly
const leapYear = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; //rok przestepny

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
    firstDate = enteredFirstDate();
    firstDateMessage = writeFirstDate(firstDate);
}
function enteredFirstDate(){
    var yourDay, yourMonth, yourYear;
    var maxDay;// enteredMonth;
    var message;
    var dayOK, monthOK, yearOK;
   
    // sprawdzenie poprawnosci wprowadzonych danych
    yourDay = document.getElementById("enterYourDay").value;
    yourMonth = document.getElementById("enterYourMonth").value;
    yourYear = document.getElementById("enterYourYear").value;
    message = "Uwagi: ";
    
    //enteredMonth = yourMonth - 1;
    
    if(checkLeapYear(yourYear) === true){
         maxDay = leapYear[yourMonth - 1];
    } else {
        maxDay = normalYear[yourMonth - 1]; 
    }
       
    if(isNaN(yourDay) || yourDay < 1 || yourDay > maxDay || yourDay === null)
        { message += "Wprowadź dzień. "; 
    } else {
        dayOK = true; 
    }
    
    if(isNaN(yourMonth) || yourMonth < 1 || yourMonth > 12 || yourMonth === null) {
        message += "Wprowadź miesiąc. "; 
    } else {
        monthOK = true;
    }
        
    if(isNaN(yourYear) || yourYear === " " || yourYear ==="" || yourYear === null) {
        message += "Wprowadź rok.";
    } else if(Number(yourYear) === 0){
        message += "Nie ma takiego roku.";
    } else {
        yearOK = true;
    }
    
    if (dayOK === true && monthOK === true && yearOK === true) {
        return new Date(yourYear, yourMonth, yourDay);
    } else {
        document.getElementById("message1").innerHTML = message;
    }
}
function writeFirstDate(firstDate){
    var leapYearCheck;
    var message;
    var corectMonth;
    var corectDate;
    
    corectMonth = firstDate.getMonth() - 1;
    temp1Date = new Date(firstDate.getFullYear(), corectMonth, firstDate.getDate());
    
    // -- wypisanie daty urodzenia
    document.getElementById("message1").innerHTML = "" ;
    
    // -- elementy do tlumaczenia na jezyk obcy --
    document.getElementById("beginningDate1").innerHTML = "1) Urodziłeś / -aś się w " ;
    message = nameDayFullPL[temp1Date.getDay()] + ", " + 
            temp1Date.getDate() + " " +
            nameMonthFullPL[temp1Date.getMonth()] +  " " +
            temp1Date.getFullYear();
    // -- koniec tlumacza --
    
    document.getElementById("date1").innerHTML = message; 
            
    
    leapYearCheck = checkLeapYear(firstDate.getFullYear());
    if (leapYearCheck === true){
        document.getElementById("leapYear").innerHTML = ", rok przestępny.";        
    } else {
        document.getElementById("leapYear").innerHTML = ", rok normalny.";
    }
    
    // informacja o party time
    if ((howManyDaysBetween(sysDate, temp1Date) % 500) === 0) {
        document.getElementById("party").innerHTML = "Party Time! ";
        alert("Party Time!");}
    else {document.getElementById("party").innerHTML = " ";}
    
    // -- wypisanie ktory dzien zycia
    document.getElementById("beginningDayOfYourLife").innerHTML = "Dzisiaj jest: ";
    document.getElementById("dayOfYourLife").innerHTML =
             howManyDaysBetween(sysDate, temp1Date) + " czyli "
            + yearsMonthDaysBetweenPL(sysDate, temp1Date) + ".";
}

function secondDates(){
    secondDate = enteredSecondDate();
    writeDate2(secondDate);
}
function enteredSecondDate(){
    var yourDay, yourMonth, yourYear;
    var maxDay;// enteredMonth;
    var message;
    var dayOK, monthOK, yearOK;
   
    // sprawdzenie poprawnosci wprowadzonych danych
    yourDay = document.getElementById("enterYourDay2").value;
    yourMonth = document.getElementById("enterYourMonth2").value;
    yourYear = document.getElementById("enterYourYear2").value;
    message = "Uwagi: ";
    
    //enteredMonth = yourMonth - 1;
    
    if(checkLeapYear(yourYear) === true){
        maxDay = leapYear[yourMonth - 1];
    } else {
        maxDay = normalYear[yourMonth - 1]; 
    }
       
    if(isNaN(yourDay) || yourDay < 1 || yourDay > maxDay || yourDay === null)
        { message += "Wprowadź dzień. "; 
    } else {
        dayOK = true; 
    }
    
    if(isNaN(yourMonth) || yourMonth < 1 || yourMonth > 12 || yourMonth === null) {
        message += "Wprowadź miesiąc. "; 
    } else {
        monthOK = true;
    }
        
    if(isNaN(yourYear) || yourYear === " " || yourYear === "" || yourYear === null) {
        message += "Podaj rok.";
    } else if(Number(yourYear) === 0){
        message += "Nie ma takiego roku.";
    } else {
        yearOK = true;
    }
    
    if (dayOK === true && monthOK === true && yearOK === true) {
        return new Date(yourYear, yourMonth, yourDay);
    } else {
        document.getElementById("message2").innerHTML = message;
    }
}
function writeDate2(secondDate){
    var leapYearCheck;
    var message;
    var corectMonth;
    var corectDate;
    
    corectMonth = secondDate.getMonth() - 1;
    temp2Date = new Date(secondDate.getFullYear(), corectMonth, secondDate.getDate());
    
    // -- wypisanie daty urodzenia
    document.getElementById("message2").innerHTML = "" ;
    
    // -- elementy do tlumaczenia na jezyk obcy --
    document.getElementById("beginningDate2").innerHTML = "2) Druga data: " ;
    message = nameDayFullPL[temp2Date.getDay()] + ", " + 
            temp2Date.getDate() + " " +
            nameMonthFullPL[temp2Date.getMonth()] +  " " +
            temp2Date.getFullYear();
    // -- koniec tlumacza --
    
    document.getElementById("date2").innerHTML = message; 
            
    
    leapYearCheck = checkLeapYear(secondDate.getFullYear());
    if (leapYearCheck === true){
        document.getElementById("leapYear2").innerHTML = ", rok przestępny.";        
    } else {
        document.getElementById("leapYear2").innerHTML = ", rok normalny.";
    }
    
    // informacja o party time
    if ((howManyDaysBetween(sysDate, temp2Date) % 500) === 0) {
        document.getElementById("party2").innerHTML = "Party Time! ";
        alert("Party Time!");}
    else {document.getElementById("party2").innerHTML = " ";}
    
    // -- wypisanie ktory dzien zycia
    document.getElementById("beginningDayOfYourLife2").innerHTML = "Dzisiaj jest: ";
    document.getElementById("dayOfYourLife2").innerHTML =
             howManyDaysBetween(sysDate, temp2Date) + " czyli "
            + yearsMonthDaysBetweenPL(sysDate, temp2Date) + ".";
}

//--
function daysOfYourLife0(){
    daysOfYourLife1();
    daysOfYourLife2();
    
}
function daysOfYourLife1(){
    var sysDate, yourDate, daysDate, correctDate;
    var enteredYourDays;
    var leapYearCheck;
    var message;
    
    sysDate = new Date();
    yourDate = enteredFirstDate();
    enteredYourDays = document.getElementById("enterYourDays").value;
    correctDate = new Date(yourDate.getFullYear(), yourDate.getMonth() - 1, yourDate.getDate());
    daysDate = dayYouChoose(correctDate, enteredYourDays);
    
    //daysBeetwenDates = howManyDaysBetween(sysDate, yourDate);
    
    // komunikat na strone 
    message = enteredYourDays +
            " dzień Twojego życia wypada w " +
            nameDayFullPL[daysDate.getDay()] + ", " + 
            daysDate.getDate() + " " +
            nameMonthFullPL[daysDate.getMonth()] +  " " +
            daysDate.getFullYear();
    
    leapYearCheck = checkLeapYear(daysDate.getFullYear());
    if (leapYearCheck === true){
        message += ", rok przestępny.";
    } else {
        message += ", rok normalny.";
    }
    
    document.getElementById("messageDaysOfLife").innerHTML = message;
}
function daysOfYourLife2(){
    var sysDate, yourDate, daysDate, correctDate;
    var enteredYourDays;
    var leapYearCheck;
    var message;
    
    sysDate = new Date();
    yourDate = enteredSecondDate();
    enteredYourDays = document.getElementById("enterYourDays").value;
    correctDate = new Date(yourDate.getFullYear(), yourDate.getMonth() - 1, yourDate.getDate());
    daysDate = dayYouChoose(correctDate, enteredYourDays);
    
    //daysBeetwenDates = howManyDaysBetween(sysDate, yourDate);
    
    // komunikat na strone 
    message = enteredYourDays +
            " dzień Twojego życia wypada w " +
            nameDayFullPL[daysDate.getDay()] + ", " + 
            daysDate.getDate() + " " +
            nameMonthFullPL[daysDate.getMonth()] +  " " +
            daysDate.getFullYear();
    
    leapYearCheck = checkLeapYear(daysDate.getFullYear());
    if (leapYearCheck === true){
        message += ", rok przestępny.";
    } else {
        message += ", rok normalny.";
    }
    
    document.getElementById("messageDaysOfLife2").innerHTML = message;
}

//--
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

//odejmowanie dat
function subtract2dates(){ 
    document.getElementById("subtract2Dates").innerHTML = "różnica: " + 
            Math.abs(howManyDaysBetween(sysDate, firstDate) - howManyDaysBetween(sysDate, secondDate)) + ": " +
            yearsMonthDaysBetweenPL( firstDate, secondDate);
} 
//dodawanie dat
function add2dates() {
    var add2;
    var add2Date;
    
    add2 = howManyDaysBetween(sysDate, temp1Date) + howManyDaysBetween(sysDate, temp2Date);
    add2Date = new Date(add2 * oneDay);
    
    document.getElementById("add2Dates").innerHTML = "suma: " + add2 + ": " +
            (add2Date.getFullYear() - 1970) + " lat " + 
            add2Date.getMonth() + " miesiecy " + 
            add2Date.getDate() + " dni";
           
}