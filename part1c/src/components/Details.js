const Details = ({ countries }) => {
    return (
        <div>
            {countries.map(
                country => <div key={country.name}>
                    <h2>{country.name}</h2>
                    <h4>{country.capital}</h4>
                    <h4>{country.area}</h4>
                    {/* <ul>
                        {Object.values(country.language).map(
                            language => <li key={language}>{language}</li>
                        )}
                    </ul> */}
                    <img src={country.flags.png} alt={`${country.name} flag`} />
                </div>
            )}
        </div>
    )
}


export default Details;