const CountryList = ({ countriesToShow,  handleClick}) => {
    return (
        <div>
            <br/>
            {countriesToShow.map(country => 
                <div key={country}>{country}
                    &nbsp;
                    <button onClick={() => {handleClick(country)}}>show</button>
                </div>)
            }
        </div>
    );
};

export default CountryList;
