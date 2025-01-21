
const months = {
    "1": "January",
    "2": "February",
    "3": "March",
    "4": "April",
    "5": "May",
    "6": "June",
    "7": "July",
    "8": "August",
    "9": "September",
    "10": "October",
    "11": "November",
    "12": "December"
};

function formatDate (year, month, date) {
    let end = ""
    const last_digit = date.charAt(date.length-1)
    if( last_digit == "1" ){
        end = "st"
    }
    else if(last_digit == "2") {
        end = "nd"
    }
    else if(last_digit == "3") {
        end = "rd"
    }else {
        end = "th"
    }
    
    const res = `${months[month]} ${date}${end}, ${year}`

    return res

}

function createEle(eleName,content){
    const ele = document.createElement(eleName)
    const node = document.createTextNode(content)
    ele.appendChild(node)
    return ele
}

function addDate() {
    const date_obj = new Date()
    const date = date_obj.getDate()
    const month = date_obj.getMonth() + 1
    const year = date_obj.getFullYear()
    console.log(year, month, date)

     // date
    const formatted_date = formatDate(year.toString(), month.toString(), date.toString())
    console.log(formatted_date)
    // display 
    const display_date = document.querySelector("#date")
    display_date.innerHTML = formatted_date
}

function addNames(events) {
    const names = []
    for (let i = 0; i < events.length; i++) {
        names.push(events[i].name)
    }
    
    const season = document.querySelector("#season")
    console.log(season)
    for(let i = 0; i < names.length; i++){
        const p = createEle("p", names[i])
        season.appendChild(p)
    }
}


async function getData() {

    const date_obj = new Date()
    const day = date_obj.getDate()
    const month = date_obj.getMonth() + 1
    const year = date_obj.getFullYear()
    const nextYear = date_obj.getFullYear() + 1
    
    const url = `https://litcal.johnromanodorazio.com/api/dev/calendar/${year}`
    const url2 = `https://litcal.johnromanodorazio.com/api/dev/calendar/${nextYear}`

    const option = {
        "method": "GET",
        "headers": {
          "accept": "application/json",
          "Accept-Language": "en_US"
        }
    };
    
    try {
        const response = await fetch(url, option)
        const response_ny = await fetch(url2, option)
        
        if (!response.ok){
            throw new Error(`Response status: ${response.status}`);
        }

        if (!response_ny.ok){
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        const json2 = await response_ny.json();

        const litcal = json.litcal
        const litcal_ny = json2.litcal
        const eventsOfYr = getEvents(litcal, litcal_ny, year)
        console.log(eventsOfYr)
        const events = queryEvents(eventsOfYr, month, day)
        // names of events 
        addNames(events)
        
    }catch(err){
        console.error(err.message);
    }
}

function getEvents(litcal, litcal2, year) {
    events_of_the_year = []
    for(let i = 0; i < litcal.length; i++){
        if(litcal[i].year === year) {
            events_of_the_year.push(litcal[i])
        }
    }

    for(let i = 0; i < litcal2.length; i++){
        if(litcal2[i].year === year) {
            events_of_the_year.push(litcal2[i])
        }
    }

    return events_of_the_year
}

function queryEvents(litcal, month, day) {
   
    events = []
    for ( let i = 0; i < litcal.length; i++) {
        if(litcal[i].month === month && litcal[i].day === day ) {
            console.log(litcal[i])
            events.push(litcal[i])
        }
    }
 
    return events

}

addDate()
getData()
