import { useState, useEffect } from 'react'
import axios from 'axios'

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

  if (length == 1) {
    if (information && languages && image) {
      return (
        <div>
          find countries <input value={value} onChange={handleChange} />
          <h1>{country}</h1>
          <div>capital {information.capital} </div>
          <div>area {information.area}</div>
          <h3>languages: </h3>
          <ul>
            {Object.keys(languages).map(key => <li key={key}>{languages[key]}</li>)}
          </ul>
          <img src={image}/>
        </div>
    )
    }
    return (
      <p>loading...</p>
    )
  }


  if (length < 10 && length > 1) {
    return (
      <div>
        find countries <input value={value} onChange={handleChange} />
        {countriesToShow.map(country => <div key={country}>{country}</div>)}
      </div>
    )
  }
  
  return (
    <div>
      find countries <input value={value} onChange={handleChange} />
      <p>too many countries</p>
    </div>
  )
}


export default App