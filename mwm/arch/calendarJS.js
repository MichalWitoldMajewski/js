//var myDate = new Date(1976, 4, 28);
//const oneDay = 86400000; //86 400 000 milisekund = 1 dzien

var sysDate = new Date();
// -----------------------------------
//odsluga daty
function yourDates(){
    // wprowadzam date
    yourDate = enteredDate();
    
    //robie obliczenia
    document.getElementById("yourDate").innerHTML = yourDate;
    document.getElementById("dayOfYourLife").innerHTML = howManyDayBetween(sysDate, yourDate);
            
}

function enteredDate(){
    var yourDay = document.getElementById("yourDay").value;
    var yourMonth = document.getElementById("yourMonth").value;
    var yourYear = document.getElementById("yourYear").value;
    
    yourDate = yourYear + "-" + yourMonth + "-" + yourDay;
    
    return new Date(yourDate);
    //document.getElementById("yourDate").innerHTML = "Twoja data urodzenia to " + yourYear + "-" + yourMonth + "-" + yourDay;
}

function howManyDayBetween(sysDate, myDate){
    //document.getElementById("dayOfYourLife").innerHTML = Math.floor((sysDate - myDate) / oneDay);
    return Math.floor((sysDate - myDate) / oneDay); 
}
// -----------------------------------

function howManyDayBetween(sysDate, myDate){
    return Math.floor((sysDate - myDate) / oneDay); 
}

function day100(myDate){    
     return new Date(myDate.getTime() + (100 * oneDay));
}
     
function day1000(myDate){    
     return new Date(myDate.getTime() + (1000 * oneDay));
}

function day5000(myDate){    
   //var date5000 =  new Date(myDate.getTime() + (5000 * oneDay));    
    return new Date(myDate.getTime() + (5000 * oneDay));
}

function day7500(myDate){    
     return new Date(myDate.getTime() + (7500 * oneDay));
}

function day10000(myDate){    
     return new Date(myDate.getTime() + (10000 * oneDay));
}

function corectDay(){
    
}

function corectMonth(){
    
}
