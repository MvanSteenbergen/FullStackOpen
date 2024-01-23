import React from 'react';
const Information = ({ country, information, languages, image, temperature, wind, icon }) => {
    return (
        <div>
            <h1>{country}</h1>
            <div>capital {information.capital} </div>
            <div>area {information.area}</div>
            <h3>languages: </h3>
            <ul>
                {Object.keys(languages).map(key => <li key={key}>{languages[key]}</li>)}
            </ul>
            <img src={image} alt="Country Flag" />
            <h1>Weather in {information.capital}</h1>
            <p>temperature: {temperature.toFixed(2)} Celsius</p>
            <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="Weather Icon" />
            <p>wind: {wind} m/s</p>
        </div>
    );
};

export default Information;
