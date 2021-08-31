const axios = require("axios");

const getWeather = (longitude, latitude, callback) => {
  axios
    .get(
      `http://api.weatherstack.com/current?access_key=239e058de8e9c780c3b084843678523f&query=${longitude},${latitude}&units=f`
    )
    .then((res) => {
      if (res.data.error) {
        callback(res.data.error.info);
      } else {
        callback(
          `It is currently ${res.data.current.temperature} degress out. It feels like ${res.data.current.feelslike} out.`
        );
      }
    })
    .catch((err) => {
      callback("Error while connecting to weather api");
    });
};

module.exports = getWeather;
