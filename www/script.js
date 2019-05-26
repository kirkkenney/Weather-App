var apiKey = 'd7f1663f161b02f36124833bb2e4185c';
var units = 'metric';
var country = 'gb';

var overlay = document.querySelector('#overlay');
var overlaySearch = document.querySelector('#overlaySearch');
var overlaySubmit = document.querySelector('#overlaySubmit');
var mainSearch = document.querySelector('#mainSearch');
var mainSubmit = document.querySelector('#mainSubmit');
var main = document.querySelector('#main');


function getWeather(location) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${location},${country}&units=${units}&appid=${apiKey}`)
    .then(function(resp) { return resp.json() })
    .then(function(data) {
        if (data.cod == '404') {
            document.querySelector('#error').innerHTML = "Could not find that location ...";
            document.querySelector('#location').innerHTML = "Could not find that location ...";
            overlaySearch.value = '';
            mainSearch.value = '';
            overlaySearch.focus();
            mainSearch.focus();
        } else {
            console.log(data)
            overlaySearch.value = '';
            mainSearch.value = '';
            displayWeather(data);
        };
    });
};

function displayWeather(d) {
    var description = document.querySelectorAll('.description');
    var temp = document.querySelectorAll('.temp');
    var wind = document.querySelectorAll('.wind');
    var infoTiles = document.querySelectorAll('.info-right');
    var icon = document.querySelectorAll('.icon');
    var timeDisplay = document.querySelectorAll('.time');
    var location = document.querySelector('#location');
    overlay.style.marginLeft = "-100%";
    setTimeout(function() {
        overlay.style.display = "none";
        main.style.display = "block";
    }, 500);
    main.className = '';
    location.innerHTML = "Showing weather for " + d.city.name;
    for (i = 0; i < 4; i++) {
        document.querySelectorAll('.info-left')[i].style.backgroundImage = `url('https://openweathermap.org/img/w/${d.list[i].weather[0].icon}.png')`;
        infoTiles[i].innerHTML = '';
        description[i].innerHTML = d.list[i].weather[0].description;
        temp[i].innerHTML = "Temp: " + d.list[i].main.temp + ' &deg;C';
        wind[i].innerHTML = "Wind: " + d.list[i].wind.speed + " m/s";
        // icon[i].innerHTML = `<img src='https://openweathermap.org/img/w/${d.list[i].weather[0].icon}.png' />`;
        var time = d.list[i].dt_txt.split(' ');
        var timeString = time[1].substring(0, 5);
        timeDisplay[i].innerHTML = timeString;
        var umbrella = document.createElement('div');
        var ponytail = document.createElement('div');
        var tshirt = document.createElement('div');
        var shorts = document.createElement('div');
        var jeans = document.createElement('div');
        var hoodie = document.createElement('div');
        var coat = document.createElement('div');
        if (d.list[i].weather[0].description.indexOf('rain') > 0 || d.list[i].weather[0].description.indexOf('snow') > 0) {
            umbrella.classList.add('tile', 'umbrella');
            infoTiles[i].appendChild(umbrella);
        };
        if (d.list[i].wind.speed > 5.5) {
            ponytail.classList.add('tile', 'ponytail');
            infoTiles[i].appendChild(ponytail);
        };
        if (d.list[i].main.temp >= 25) {
            shorts.classList.add('tile', 'shorts');
            tshirt.classList.add('tile', 'tshirt');
            infoTiles[i].appendChild(shorts);
            infoTiles[i].appendChild(tshirt);
        } else if (d.list[i].main.temp < 25 && d.list[i].main.temp >= 18) {
            tshirt.classList.add('tile', 'tshirt');
            jeans.classList.add('tile', 'jeans');
            infoTiles[i].appendChild(tshirt);
            infoTiles[i].appendChild(jeans);
        } else if (d.list[i].main.temp < 18 && d.list[i].main.temp >= 5) {
            jeans.classList.add('tile', 'jeans');
            hoodie.classList.add('tile', 'hoodie');
            infoTiles[i].appendChild(jeans);
            infoTiles[i].appendChild(hoodie);
        } else {
            jeans.classList.add('tile', 'jeans');
            coat.classList.add('tile', 'coat');
            infoTiles[i].appendChild(jeans);
            infoTiles[i].appendChild(coat);
        };
    };
    var card = document.querySelectorAll('.card');
    if (d.list[0].weather[0].main == "Rain" || d.list[0].weather[0].main == "Drizzle") {
        main.className = 'rain';
        for (i = 0; i < 4; i++) {
            card[i].style.backgroundColor = "rgba(215, 206, 255, .8)";
            location.style.backgroundColor = "rgba(215, 206, 255, .8)";
        }
    } else if (d.list[0].weather[0].main == "Snow") {
        main.className = 'snow';
        for (i = 0; i < 4; i++) {
            card[i].style.backgroundColor = "rgba(209, 232, 255, .6)";
            location.style.backgroundColor = "rgba(209, 232, 255, .6)";
        }
    } else if (d.list[0].weather[0].main == "Clouds") {
        main.className = 'overcast';
        for (i = 0; i < 4; i++) {
            card[i].style.backgroundColor = "rgba(219, 222, 224, .6)";
            location.style.backgroundColor = "rgba(219, 222, 224, .6)";
        }
    } else if (d.list[0].weather[0].main == "Clear") {
        main.className = 'sunny';
        for (i = 0; i < 4; i++) {
            card[i].style.backgroundColor = "rgba(255, 253, 193, .6)";
            location.style.backgroundColor = "rgba(255, 253, 193, .6)";
        }
    }
}

overlaySubmit.addEventListener('click', function() {
    var location = overlaySearch.value;
    getWeather(location);
});

mainSubmit.addEventListener('click', function() {
    var location = mainSearch.value;
    getWeather(location);
});

overlaySearch.addEventListener('keyup', function(event) {
    if (event.keyCode == '13') {
        var location = overlaySearch.value;
        getWeather(location);
    };
});

mainSearch.addEventListener('keyup', function(event) {
    if (event.keyCode == '13') {
        var location = mainSearch.value;
        getWeather(location);
    };
});
