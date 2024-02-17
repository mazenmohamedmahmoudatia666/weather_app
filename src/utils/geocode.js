const request = require("request");
const dotenv = require("dotenv");
dotenv.config();

const geocode = (address, callback) => {
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    address +
    "&appid=" +
    process.env.APPID + // my API key
    "&units=metric";

  request({ url, json: true }, (error, response, body) => {
    if (error) {
      callback("Unable to connect to location services!", undefined);
    } else if (!body || body.message) {
      callback("Unable to find location. Try another search.", undefined);
    } else {
      callback(undefined, {
        latitude: body.latitude,
        longitude: body.longitude,
        location: body.name,
      });
    }
  });
};

module.exports = geocode;
