const cityForm = document.querySelector("form");
const card = document.querySelector("section");
const details = document.querySelector(".details");
const time = document.querySelector(".time");
const icon = document.querySelector(".icon img");
const updateUI = (data) => {
  const cityDets = data.cityDets;
  const weather = data.weather;

  // update dets
  if (card.classList.contains("d-none")) card.classList.remove("d-none");
  details.innerHTML = `<h5>${cityDets.EnglishName}</h5>
          <div class="conditions">${weather.WeatherText}</div>
          <div class="temps">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
          </div>
        </div>`;

  let timeSrc = null;
  if (weather.IsDayTime) timeSrc = "./day-night/day.svg";
  else timeSrc = "./day-night/night.svg";
  time.setAttribute("src", timeSrc);
  const iconSrc = `./icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute("src", iconSrc);
};

const updateCity = async (city) => {
  const cityDets = await getCity(city);
  const weather = await getWeather(cityDets.Key);

  return {
    cityDets,
    weather,
  };
};

cityForm.addEventListener("submit", (e) => {
  // prevent def action
  e.preventDefault();
  // get city value
  const city = cityForm.city.value.trim();
  cityForm.reset();

  //   update city
  updateCity(city)
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));

  // set local storage
  localStorage.setItem("city", city);
});

if (localStorage.getItem("city")) {
  updateCity(localStorage.getItem("city"))
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));
}
