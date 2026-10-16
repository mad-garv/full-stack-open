import Person from "./Person"

const Persons = ({ personsToShow, deletePerson }) =>
    <ul>
        {personsToShow.map(person =>
            <Person key={person.id} person={person} deletePerson={() => {deletePerson(person.id, person.name)}}/>
        )}
    </ul>

export default Persons