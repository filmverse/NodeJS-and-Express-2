const Detail = ({ country }) => {
    return (
        <div>
            <h2>{country.name}</h2>
            <h3>{country.capital}</h3>
            <h3>{country.area}</h3>
            <ul>
                {
                    country.language
                        ? Object.values(country.language).map(
                            clang => <li key={clang}>{clang}</li>
                        )
                        : "N/A"
                }
            </ul>
            <img src={country.flags.png} alt={`${country.name} flag`} />
        </div>
    )
}

export default Detail;