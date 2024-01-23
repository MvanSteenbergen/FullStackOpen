const Information = ({ country, information, languages, image }) => {
    return (
        <div>
            <h1>{country}</h1>
            <div>capital {information.capital} </div>
            <div>area {information.area}</div>
            <h3>languages: </h3>
            <ul>
                {Object.keys(languages).map(key => <li key={key}>{languages[key]}</li>)}
            </ul>
            <img src={image}/>
        </div>
    );
};

export default Information;
