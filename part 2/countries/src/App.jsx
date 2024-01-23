import { useState, useEffect } from 'react'
import axios from 'axios'
import CountryList from './Components/CountryList'
import Information from './Components/Information'
import countryService from './services/countries'


const api_key = import.meta.env.VITE_SOME_KEY

const App = () => {
  const [value, setValue] = useState('')
  const [information, setInformation] = useState({})
  const [countryList, setCountryList] = useState([])
  const [country, setCountry] = useState('')
  const [length, setLength] = useState(100)
  const [countriesToShow, setCountriesToShow] = useState([])
  const [image, setImage] = useState('')
  const [latlng, setLatlng] = useState([0, 0])
  const [languages, setLanguages] = useState({})
  const [temperature, setTemperature] = useState(0)
  const [wind, setWind] = useState(0)
  const [icon, setIcon] = useState('')


  useEffect(() => {
    if(countryList){
      countryService
        .getList()
        .then(countries => {
          var updated = countries.map(country => country.name.common)
          setCountryList(updated)
          setCountriesToShow(updated)
          setLength(updated.length)
          setValue('')
      })
    }
  }, [])

  useEffect(() => {
    if(country) {
      countryService
        .getCountry(country)
        .then(country => {
          setInformation(country)
          setLatlng(country.capitalInfo.latlng)
          setImage(country.flags.png)
          setLanguages(country.languages)
      })
    }
  }, [country])

  useEffect(() => {
    if(country) {
      countryService
        .getWeather(latlng, api_key)
        .then(weather => {
          setTemperature(weather.main.temp - 273.15)
          setWind(weather.wind.speed)
          setIcon(weather.weather[0].icon)
      })
    }
  }, [information])

  
  const handleChange = (event) => {
    setValue(event.target.value)
    var updated = countryList.filter(country => {
      return country.toLowerCase().includes(event.target.value.toLowerCase())})
    console.log("Input changed")
    setCountriesToShow(updated)
    setLength(updated.length)
    if(updated.length == 1) {
      var name = updated[0]
      console.log(name)
      setCountry(name)
    }
  }

  const handleClick = (country) => {
    setValue(country)
    setCountry(country)
    setCountriesToShow([country])
    setLength(1)
  }

  return (
    <div>
      Find countries <input value={value} onChange={handleChange} />
      {length == 1 ?
      <Information
          country = {country}
          information = {information}
          languages = {languages}
          image = {image}
          latlng = {latlng}
          temperature = {temperature}
          wind = {wind}
          icon = {icon}
        />
        :null
      }
      {length < 10 && length > 1 ?
        <CountryList 
          countriesToShow={countriesToShow}
          handleClick={handleClick}
        />
        :null
      }
      {length > 10 ?
        <p>Too many countries, please specify more clearly.</p>
        :null
      }
    </div>
  )
}


export default App