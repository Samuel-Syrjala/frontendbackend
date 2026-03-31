import { useState, useEffect } from 'react'
import personService from './services/personservice'
import Notification from './components/Notification'
import './style.css'

const Person = ({ person, handleDelete }) => {
    return (
        <p>
            {person.name} {person.number}
            <button onClick={() => handleDelete(person.id, person.name)}>delete</button>
        </p>
    )
}

const Persons = ({ persons, handleDelete }) => (
    <div>
        {persons.map(person =>
            <Person key={person.id} person={person} handleDelete={handleDelete} />
        )}
    </div>
)

const PersonForm = ({ addPerson, newName, handleNameChange, newNumber, handleNumberChange }) => {
    return (
        <form onSubmit={addPerson}>
            <div>
                name: <input value={newName} onChange={handleNameChange} />
            </div>
            <div>
                number: <input value={newNumber} onChange={handleNumberChange} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}
const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [notificationMessage, setNotificationMessage] = useState(null)
    const [notificationType, setNotificationType] = useState('success')

    useEffect(() => {
        personService
            .getAll()
            .then(initialPersons => setPersons(initialPersons))
    }, [])

    const addPerson = (event) => {
        event.preventDefault()
        if (persons.some(p => p.name === newName)) {
            setNotificationMessage(`${newName} is already added to phonebook`)
            setNotificationType('error')
            setTimeout(() => setNotificationMessage(null), 5000)
            return
        }
        const newPerson = { name: newName, number: newNumber }
        personService
            .create(newPerson)
            .then(returnedPerson => {
                setPersons(persons.concat(returnedPerson))
                setNewName('')
                setNewNumber('')

                setNotificationMessage(`Added ${returnedPerson.name}`)
                setNotificationType('success')
                setTimeout(() => setNotificationMessage(null), 5000)
            })
    }

    const handleNameChange = (event) => setNewName(event.target.value)
    const handleNumberChange = (event) => setNewNumber(event.target.value)

    const handleDelete = (id, name) => {
        if (window.confirm(`Delete ${name}?`)) {
            personService
                .remove(id)
                .then(() => {
                    setPersons(persons.filter(p => p.id !== id))
                    setNotificationMessage(`Deleted ${name}`)
                    setNotificationType('success')
                    setTimeout(() => setNotificationMessage(null), 5000)
                })
                .catch(error => {
                    console.error('Failed to delete person:', error)
                    setNotificationMessage(`Information of ${name} has already been removed from server`)
                    setNotificationType('error')
                    setTimeout(() => setNotificationMessage(null), 5000)
                    setPersons(persons.filter(p => p.id !== id))
                })
        }
    }

    return (
        <div>
            <h2>Phonebook</h2>

            <Notification message={notificationMessage} type={notificationType} />

            <h3>Add new</h3>
            <PersonForm
                addPerson={addPerson}
                newName={newName}
                handleNameChange={handleNameChange}
                newNumber={newNumber}
                handleNumberChange={handleNumberChange}
            />

            <h3>Numbers</h3>
            <Persons persons={persons} handleDelete={handleDelete} />
        </div>
    )
}

export default App