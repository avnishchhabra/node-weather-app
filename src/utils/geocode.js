const axios = require("axios")

const getGeoCode = (address,callback) => {
    axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYXZuaXNoMjcyNyIsImEiOiJja3NzbDd2MTkwNWdrMnhvZnVzbmZlMHhzIn0.1UtN9bcK4kf0kYmlSJeksQ`)
    .then(res => {
      if (res.data.features.length) {
          const data = {
            longitude: res.data.features[0].center[0],
            latitude: res.data.features[0].center[1],
            place: res.data.features[0].place_name
          }
          callback(undefined,data)
      }
      else {
          callback('No match found. Try another search',undefined)
      }
    })
    .catch(err => {
      callback('Error while connecting to mapbox',undefined)
    })
  }

  module.exports = getGeoCode