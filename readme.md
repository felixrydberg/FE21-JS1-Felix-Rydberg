Lib: Anime.js 
Animation blob, "week list" fade in and translateY up.


Form: 
    -Input, placeholder required: City name
    -Submit, Search for city

Main Figure:
    -Today: 100% width top 
        -Horizontal list
    -Next 5 days flex no-wrap
        -list för 3 kraven (Icon, Temperatur, Desc. In this order)



Icon: data.weather.icon (https://www.weatherbit.io/api/codes)

Temp: data.temp

Luftfuktighet: data.rh %



API KEY: 5d1dd1bec194429d99de01090d43dac6

Daily:

Lat:
https://api.weatherbit.io/v2.0/forecast/daily?key=be8ff8960a0b4942be77aa7dc4843b08&lang=sv&units=m&lat=${lat}&lon=${lon}

City:

https://api.weatherbit.io/v2.0/forecast/daily?key=be8ff8960a0b4942be77aa7dc4843b08&lang=sv&units=m&city=${city}

Current: 
Lat:
https://api.weatherbit.io/v2.0/current?key=be8ff8960a0b4942be77aa7dc4843b08&lang=sv&units=m&lat=${lat}&lon=${lon}&days=6

City:
https://api.weatherbit.io/v2.0/current?key=be8ff8960a0b4942be77aa7dc4843b08&lang=sv&units=m&city=${city}&days=6

TODO: 
    Set value of lat lon from api
    under 1024