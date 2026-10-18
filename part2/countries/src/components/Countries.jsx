import Country from "./Country"

const Countries = ({ countriesToShow }) => {
    return (
        <div>
            {countriesToShow.length > 10 && (
                <p>Too many matches, specify another filter</p>
            )}
            {countriesToShow.length <= 10 && countriesToShow.length > 1 && (
                <ul>
                    {countriesToShow.map(country => (
                        <li key={country.cca3}>
                            {country.name.common}
                        </li>
                    ))}
                </ul>
            )}
            {countriesToShow.length === 1 && (
                <Country country={countriesToShow[0]} />
            )}
        </div>
    )
}

export default Countries