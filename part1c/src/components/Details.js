const Details = ({ countries }) => {
    return (
        <div>
            {countries.map(
                country => <ul key={country.name}>
                    <li>name:{country.name}</li>
                    <li>capital:{country.capital}</li>
                    <li>area:{country.area}</li>
                    <li>flag: {country.flag}</li>
                </ul>
            )}
        </div>
    )
}


export default Details;