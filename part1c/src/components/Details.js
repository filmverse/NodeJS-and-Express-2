const Details = ({ countries }) => {
    return (
        <div>
            {countries.map(
                country => <div key={country.name}>
                    <h2>{country.name}</h2>
                    <h4>{country.capital}</h4>
                    <h4>{country.area}</h4>
                    {/* <ul>{Object.values(country.language).map(
                        lang => <li key={lang}>{lang}</li>
                    )}</ul> */}
                </div>
            )}
        </div>
    )
}


export default Details;