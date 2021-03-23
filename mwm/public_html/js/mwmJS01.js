// ladowanie strony
var underWWW = new XMLHttpRequest();

// --- stale i zmienne dla obslugi dat ---
const oneDay = 86400000; //86 400 000 milisekund = 1 dzien
var sysDate = new Date();

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
function yourDates(){
    // wprowadzam date
    yourDate = enteredDate();
    your100 = day100(yourDate);
    dayToCheck = howManyDayBetween(sysDate, yourDate);
    checkFull = upToMissing(upTo(dayToCheck), howManyDayBetween(sysDate, yourDate));
    
    //robie obliczenia
    document.getElementById("yourDate").innerHTML = 
            nameDayFullPL[yourDate.getDay()] + ", " + 
            yourDate.getDate() + " " +
            nameMonthFullPL[yourDate.getMonth()] +  " " +
            yourDate.getFullYear();
    
    document.getElementById("leapYear").innerHTML =
            checkLeapYear(yourDate.getFullYear());
    
    document.getElementById("dayOfYourLife").innerHTML = 
            dayToCheck + " ("
            // howManyDayBetween(sysDate, yourDate) + " (" 
            + yearsMonthDaysBetweenPL(sysDate, yourDate) + ")";
    
    
    document.getElementById("dayTo").innerHTML = upTo(dayToCheck);
    document.getElementById("missingDayTo").innerHTML = checkFull;
            //upToMissing(upTo(dayToCheck), howManyDayBetween(sysDate, yourDate));
    
    
    document.getElementById("100Days").innerHTML =
            nameDayFullPL[your100.getDay()] + ", " +
            your100.getDate() + " " +
            nameMonthFullPL[your100.getMonth()] + " " +
            your100.getFullYear(); 
    
    if (checkFull === 0) {
        document.getElementById("party").innerHTML = "Party Time!";
        alert("Party Time!");}
    else {document.getElementById("party").innerHTML = " ";}
}

function enteredDate(){
    var yourDay = document.getElementById("yourDay").value;
    var yourMonth = document.getElementById("yourMonth").value;
    var yourYear = document.getElementById("yourYear").value;
    
    //yourDate = yourYear + "-" + yourMonth + "-" + yourDay;
    
    return new Date(yourYear + "-" + yourMonth + "-" + yourDay);
    //document.getElementById("yourDate").innerHTML = "Twoja data urodzenia to " + yourYear + "-" + yourMonth + "-" + yourDay;
}

//sprawdzenie roku przestepnego
function checkLeapYear (yourYearEntered){
    if( ((yourYearEntered % 4) === 0 && (yourYearEntered % 100 !== 0)) || (yourYearEntered % 400) === 0) {
        return ", rok przestępny!";
    } else {
        return ", rok zwykły.";
    }
}

function howManyDayBetween(sysDate, myDate){
    //document.getElementById("dayOfYourLife").innerHTML = Math.floor((sysDate - myDate) / oneDay);
    return Math.floor((sysDate - myDate) / oneDay); 
}

function yearsMonthDaysBetweenPL(date1, date2){
    var diff = new Date(Math.abs(date1.getTime() - date2.getTime()));
    return (diff.getFullYear() - 1970) + " lat " + diff.getMonth() + " miesięcy " + (diff.getDate() - 1) + " dni";
    //(diff.getFullYear() - 1970) + " lat " + diff.getMonth() + " miesięcy " + (diff.getDate() - 1) + " dni";
}

function upTo(dayToCheck){

    
    if (dayToCheck > 1000) {minDay = Math.floor(dayToCheck / 1000) * 1000 + 1;
                            maxDay = minDay + 1000 - 1;
                         }
    
    if (dayToCheck >= 1 && dayToCheck <= 100) return 100;
    if (dayToCheck >= 101 && dayToCheck <= 500) return 500;
    if (dayToCheck >= 501 && dayToCheck <= 1000) return 1000;
    //analiza dziesiątek
    // analiza setek
    if (dayToCheck >= minDay && dayToCheck <= maxDay) return maxDay; // analiza tysiecy
    /*
    if (dayToCheck >= 1001 && dayToCheck <= 2000) return 2000;
    if (dayToCheck >= 2001 && dayToCheck <= 2500) return 2500;
    if (dayToCheck >= 2501 && dayToCheck <= 3000) return 3000;
    if (dayToCheck >= 3001 && dayToCheck <= 4000) return 4000;
    if (dayToCheck >= 4001 && dayToCheck <= 5000) return 5000;
    if (dayToCheck >= 5001 && dayToCheck <= 6000) return 6000;
    if (dayToCheck >= 6001 && dayToCheck <= 7000) return 7000;
    if (dayToCheck >= 7001 && dayToCheck <= 8000) return 8000;
    if (dayToCheck >= 8001 && dayToCheck <= 9000) return 9000;
    if (dayToCheck >= 9001 && dayToCheck <= 10000) return 10000;
    if (dayToCheck >= 10001 && dayToCheck <= 11000) return 11000;
    if (dayToCheck >= 11001 && dayToCheck <= 12000) return 12000;
    if (dayToCheck >= 12001 && dayToCheck <= 13000) return 13000;
    if (dayToCheck >= 13001 && dayToCheck <= 14000) return 14000;
    if (dayToCheck >= 14001 && dayToCheck <= 15000) return 15000;
    if (dayToCheck >= 15001 && dayToCheck <= 16000) return 16000;
    if (dayToCheck >= 16001 && dayToCheck <= 17000) return 17000;
    if (dayToCheck >= 17001 && dayToCheck <= 18000) return 18000;
    if (dayToCheck >= 18001 && dayToCheck <= 19000) return 19000;
    if (dayToCheck >= 19001 && dayToCheck <= 20000) return 20000;
     */
}

function upToMissing(fullDay, yourDays){
    return fullDay - yourDays;     
}

function day100(myDate){    
     return new Date(myDate.getTime() + (100 * oneDay));
}