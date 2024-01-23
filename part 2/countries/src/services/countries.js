import axios from 'axios'

const getList = () => {
  const request = axios.get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
  return request.then(response => response.data)
}

const getCountry = (country) => {
  const request = axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${country}`)
  return request.then(response => response.data)
}

const getWeather = (latlng, api_key) => {
  const request = axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${latlng[0]}&lon=${latlng[1]}&limit=1&appid=${api_key}`)
  return request.then(response => response.data)
}

export default { 
  getList, getCountry, getWeather 
}