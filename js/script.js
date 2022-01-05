// Add event listeners
document.querySelector("header .form-latlon").addEventListener('submit', function(event){event.preventDefault(); usersearch("lat")});
document.querySelector("header .form-city").addEventListener('submit', function(event){event.preventDefault();  usersearch("city")});
window.addEventListener("load", function(){fetchURL(`https://api.ipgeolocation.io/ipgeo?apiKey=ce71d014f78f4924b85db66afeb9177f`, autoresponse)})
let searched=false,
width = 10,
error = false;
//Callback för window Eventlistener (Gör fetchen, skapar också animationen) 
function autoresponse(data) {
    let city =`${data.city}, ${data.country_name}`;
    fetchURL(`https://api.weatherbit.io/v2.0/current?key=8a23c972397e47c09f3a3188e596ff7f&lang=sv&units=m&city=${city}`, displaymain);
    fetchURL(`https://api.weatherbit.io/v2.0/forecast/daily?key=8a23c972397e47c09f3a3188e596ff7f&lang=sv&units=m&city=${city}&days=6`, displayside);
    document.body.appendChild(document.createElement("div")).classList.add("loader");
    animation(width);
}


// Skickar dem olika requesten till fetchURL, skapar också animationen
function usersearch(type) {
    if(searched===true){
        resetpage(type);
    }
    else {

        if(type==="lat"){
            // Info från lat lon formen
            let lat = document.querySelector(".input-lat"),
            lon = document.querySelector(".input-lon");
            fetchURL(`https://api.weatherbit.io/v2.0/current?key=8a23c972397e47c09f3a3188e596ff7f&lang=sv&units=m&lat=${lat}&lon=${lon}`, displaymain);
            fetchURL(`https://api.weatherbit.io/v2.0/forecast/daily?key=8a23c972397e47c09f3a3188e596ff7f&lang=sv&units=m&lat=${lat}&lon=${lon}&days=6`, displayside);
    
    
    
        }
        else if(type==="city") {
            //Info från city formen
            let city =document.querySelector(".input-city").value;
            fetchURL(`https://api.weatherbit.io/v2.0/current?key=8a23c972397e47c09f3a3188e596ff7f&lang=sv&units=m&city=${city}`, displaymain);
            fetchURL(`https://api.weatherbit.io/v2.0/forecast/daily?key=8a23c972397e47c09f3a3188e596ff7f&lang=sv&units=m&city=${city}&days=6`, displayside);
        }
        else {
            alert("Form Failed");
        }
        document.body.appendChild(document.createElement("div")).classList.add("loader");
        animation(width);
    }
}

// Skickar url till Apin
function fetchURL(url, callback) {
    fetch(url).then(
        function(response){
            if(response.status >= 200 && response.status <300){
                return response.json();
            }
            else{
                throw 'Fetch failed';
            }
        }).then(function(data){
            callback(data);})
        .catch((error) => errors(error));
}

function errors(message) {
    if(error===false){
        alert(message)
        error=true; 
        document.querySelector(".loader").remove()
    }
    else{
        error=false;
        document.querySelector(".loader").remove()
    }
}

// Display current api
function displaymain(json) {
    searched=true;
    let article = document.querySelector(".article-today"),
    ulTitle = document.createElement("ul"),
    ulImg = document.createElement("ul"),
    ulOther = document.createElement("ul"),
    classes = [
        "rh",
        "w-speed",
        "w-dir",
        "s-rise",
        "s-set",
    ];
    article.appendChild(ulTitle).classList.add("today-title");
    article.appendChild(ulImg).classList.add("today-img");
    article.appendChild(ulOther).classList.add("today-other");
    ulTitle.appendChild(document.createElement("li")).innerHTML=`${json.data[0].city_name}`;
    ulTitle.appendChild(document.createElement("li")).innerHTML=`${json.data[0].temp} °C`;
    ulImg.appendChild(document.createElement("img")).src=`image/icons/${json.data[0].weather.icon}.png`;
    ulImg.appendChild(document.createElement("p")).innerHTML=`${json.data[0].weather.description}`;


    for(let i = 0; i < classes.length; i++){
        let li = document.createElement("li");
        ulOther.appendChild(li).classList.add(classes[i]);
    }
    document.querySelector(".article-today .rh").innerHTML=`Luftfuktighet: ${json.data[0].rh} %`;
    document.querySelector(".article-today .w-speed").innerHTML=`Vindhastighet: ${json.data[0].wind_spd} m/s`;
    document.querySelector(".article-today .w-dir").innerHTML=`Riktning: ${json.data[0].wind_cdir_full}`;
    document.querySelector(".article-today .s-rise").innerHTML=`Soluppgång: ${json.data[0].sunrise}`;
    document.querySelector(".article-today .s-set").innerHTML=`Solnedgång: ${json.data[0].sunset}`;
    document.querySelector(".input-lat").value=json.data[0].lat;
    document.querySelector(".input-lon").value=json.data[0].lon;
    width = width + 45;
    animation(width);
}

// Display daily api
function displayside(json) {
    searched=true
    for(let i = 1; i < 6; i++){
        let article = document.createElement("article");
        let button = document.createElement("button");
        let ul = document.createElement("ul");
        let li = document.createElement("li")
        if(window.innerWidth > 1299) {
            document.querySelector("header .container").appendChild(article).classList.add("article-days");
        }
        else{
            document.querySelector("main .container").appendChild(article).classList.add("article-days");
        }
        article.classList.add(i)
        article.appendChild(ul).classList.add("days-title");
        ul.appendChild(li);
        li.appendChild(document.createElement("img")).src=`image/icons/${json.data[i].weather.icon}.png`;
        ul.appendChild(document.createElement("li")).innerHTML=`${json.data[i].weather.description}`
        ul.appendChild(document.createElement("li")).innerHTML=`${json.data[i].temp} °C`;
        article.appendChild(button).classList.add("button-others");
        button.innerHTML="▼";
        button.setAttribute("type", "button");
        article.addEventListener('click', function(){
            if(event.target===button){
                displayothers(this, json)
                anime({
                    targets: event.target,
                    rotateX: 180,
                    duration: 300,
                    direction: 'alternate',
                    easing: 'linear'
                });
            }
        })
    }
    width = width +45;
    animation(width)
}

// Display side button info
function displayothers(parent, json) {
    if(!parent.classList.contains("spawned")){
        for(let i = 0; i < document.querySelectorAll(".article-days").length; i++){
            document.querySelectorAll(".article-days")[i].classList.remove("spawned");
            if(document.querySelectorAll(".ul-others")[i]){
                document.querySelectorAll(".ul-others")[i].remove();
            }
        }
        parent.classList.add("spawned")
        let index = 0;
        let ul = document.createElement("ul");
        let classes = [    
            "w-speed",
            "w-dir"];
        if(parent.classList.contains("0")){
            index = 0;
        }
        else if(parent.classList.contains("1")){
            index = 1;
        }
        else if(parent.classList.contains("2")){
            index = 2;
        }
        else if(parent.classList.contains("3")){
            index = 3;
        }
        else if(parent.classList.contains("4")){
            index = 4;
        }
        parent.appendChild(ul).classList.add("ul-others");
        for(let i = 0; i < classes.length; i++){
            let li = document.createElement("li");
            ul.appendChild(li).classList.add(classes[i])
        }
        document.querySelector(".article-days .w-speed").innerHTML=`Vindhastighet: ${json.data[index].wind_spd} m/s`
        document.querySelector(".article-days .w-dir").innerHTML=`Riktning: ${json.data[index].wind_cdir_full}`
    }
}
//Tar bort alla element och sätter om "toggle" variabler
function resetpage(type) {
    todayLength = document.querySelectorAll(".article-today ul").length;
    daysLength = document.querySelectorAll(".article-days").length;
    for(let i = 0; i < todayLength; i++){
        document.querySelectorAll(".article-today ul")[0].remove()
    }
    for(let i = 0; i < daysLength; i++){
        document.querySelectorAll(".article-days")[0].remove()
    }
    searched=false
    width=10;
    usersearch(type)
}

function animation(width) {
    anime({
        targets: '.loader',
        width: width+"%",
        easing: 'easeInOutQuad',
        duration: 1000
      });
      if(width >= 100){
        setTimeout(() => {
        document.querySelector(".loader").style.transition="0.5s"
        document.querySelector(".loader").style.opacity=0
        }, 1100);
        setTimeout(() => {
           document.querySelector(".loader").remove() 
        }, 2000);
      }
}