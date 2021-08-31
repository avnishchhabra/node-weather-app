console.log("client side js running...");

const weatherForm = document.querySelector("form");
const input = document.querySelector("input");
const firstPara = document.getElementById('firstPara')
const secondPara = document.getElementById('secondPara')

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  firstPara.textContent = 'Loading...'
  fetch(`http://localhost:3000/weather/?address=${input.value}`).then((res) =>
    res.json().then((data) => {
      console.log("data ear", data);
      if (data.error) {
        console.log("err", data.error);
        firstPara.textContent = data.error
      } else {
        console.log("forecast: ", data.forecast);
        console.log("location: ", data.location);
        firstPara.textContent = data.forecast
        secondPara.textContent = data.location
      }
    })
  );
});
