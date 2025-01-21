
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


async function getData() {
    const date_obj = new Date()
    const date = date_obj.getDate()
    const month = date_obj.getMonth() + 1
    const year = date_obj.getFullYear()
    
    const url = `http://calapi.inadiutorium.cz/api/v0/en/calendars/default/${year}/${month}/${date}`
    try {
        const response = await fetch(url, {
            redirect:"follow"
        })
        if (!response.ok){
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        console.log(json)
        // celebration
        const celebrations = []
        if(json && json.celebrations){
            for( let i = 0; i < json.celebrations.length; i++) {
                celebrations.push(json.celebrations[i].title)
            }
        }
       
        
        const season = document.querySelector("#season")
        console.log(season)
        for(let i = 0; i < celebrations.length; i++){
            const p = createEle("p", celebrations[i])
            season.appendChild(p)
        }
        
        
    }catch(err){
        console.error(err.message);
    }
}

async function addDate() {
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

addDate()
getData()
