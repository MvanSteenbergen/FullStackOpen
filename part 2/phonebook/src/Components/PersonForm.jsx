export const PersonForm = ({ addPerson, newName, handleNameAdd, newNumber, handleNumberAdd }) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name:   <input
          value={newName}
          onChange={handleNameAdd} />
      </div>
      <div>
        number: <input
          value={newNumber}
          onChange={handleNumberAdd} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}
