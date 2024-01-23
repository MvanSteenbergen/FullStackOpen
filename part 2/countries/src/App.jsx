import { useState, useEffect } from 'react'
import axios from 'axios'
import CountryList from './Components/CountryList'
import Information from './Components/Information'


const App = () => {
  const [value, setValue] = useState('')
  const [information, setInformation] = useState({})
  const [countryList, setCountryList] = useState([])
  const [country, setCountry] = useState('')
  const [length, setLength] = useState(100)
  const [countriesToShow, setCountriesToShow] = useState([])
  const [image, setImage] = useState('')
  const [languages, setLanguages] = useState({})


  useEffect(() => {
    console.log("fetching countries...")
    if(countryList){
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then(response => {
          var updated = response.data.map(country => country.name.common)
          setCountryList(updated)
          setCountriesToShow(updated)
          setLength(updated.length)
          setValue('')
        })
    }
  }, [])
  
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
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
        .then(response => {
          setInformation(response.data)
          setImage(response.data.flags.png)
          setLanguages(response.data.languages)
        })
    }
  }

  const handleClick = (country) => {
    setValue(country)
    setCountry(country)
    setCountriesToShow([country])
    setLength(1)
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${country}`)
      .then(response => {
        setInformation(response.data)
        setImage(response.data.flags.png)
        setLanguages(response.data.languages)
      })
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