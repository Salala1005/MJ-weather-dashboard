// var APIKey = "5623fb7d8675d169764d733cafc79bab";
var searchInput = $("#search-input");
var searchButton = $("#search-button");
var searchHistory = JSON.parse(localStorage.getItem("input")) || [];

// TODO
// 1. When user search for a city in the input, call weather API and show the result in the HTML
//    - Add event listener to form submit
searchButton.on("click", function (e) {
  e.preventDefault();
  var searchInputValue = searchInput.val().trim();
  var queryURL =
    "http://api.openweathermap.org/data/2.5/forecast?q=" +
    searchInputValue +
    "&appid=5623fb7d8675d169764d733cafc79bab&units=metric";
  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      var cityName = data.city.name;
      var now = dayjs().format("DD/MM/YYYY");
      console.log(now);
      var temperature = data.list[0].main.temp;
      var icon =
        "https://openweathermap.org/img/w/" +
        data.list[0].weather[0].icon +
        ".png";
      console.log(icon);
      var humidity = data.list[0].main.humidity;
      var wind = data.list[0].wind.speed;

      var display = $(`<div class= "display m-3" >
      <h3>${cityName} (${now})</h2>
      <img src="${icon}" alt="Weather Icon">
      <p> Temperature: ${temperature}°c</p>
      <p> Humidity: ${humidity}%</p>
      <p> Wind Speed: ${wind}Mph</p>

      </div>`);

      // display.append(cityName, now, temperature, icon, humidity, wind)
      $("#today").append(display);

      // to get 5days forecast

      for (let i = 7; i < data.list.length; i += 7) {
        var temperature = data.list[i].main.temp;
        var icon =
          "https://openweathermap.org/img/w/" +
          data.list[i].weather[0].icon +
          ".png";
        var humidity = data.list[i].main.humidity;
        var wind = data.list[i].wind.speed;
        var dateTime = data.list[i].dt_txt;
        var date = dateTime.split(' ')[0];


        var disply = $(`<div class= "display col-md-2 card m-2 bg-primary" >

        <h4> ${date}</h4>
        <img src="${icon}" alt="Weather Icon">
        <p> Temp: ${temperature}°c</p>
        <p> Humidity: ${humidity}%</p>
        <p> Wind Speed: ${wind}Mph</p>

        </div>`);

        $("#forecast").append(disply);
      }
      saveHistory()

    });
});

// to save search histoty
function saveHistory() {
  var historyValue = $("#history").val();
  searchHistory.push(historyValue);
  localStorage.setItem("input", JSON.stringify(searchHistory));
};





//    - Call the API and render the result in the HTML
//        - Get the city name and show it in the main weather forecast card
//        - Get the first weather forecast item and get the following values
//            - date
//            - temperature
//            - wind speed
//            - humidity
//            - icon
//        - render those values to the main card
//        - Loop through all weathers array and get the following values
//            - date
//            - temperature
//            - wind speed
//            - humidity
//            - icon
//        - render those values to the smaller card
// 2. When user search for a city, store it in local storage
// 3. On initial page load load the search history and show it as a list in the HTML
//    - ....
//    - Build the API query URL based on the history stored in local storage
//    - Call the API and render the result in the HTML
// 4. When user click on the search history, call weather API and show the result in the HTML
// 5. CSS
