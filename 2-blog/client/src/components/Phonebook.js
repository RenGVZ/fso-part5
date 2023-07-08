import React from "react";

const Phonebook = ({ newName, setName, newNumber, setNumber, addPerson }) => {
  return (
    <>
      <form onSubmit={addPerson}>
        <div>
          Name:{" "}
          <input value={newName} onChange={(e) => setName(e.target.value)} />
          <div>debug: {newName}</div>
        </div>
        <div>
          Number:{" "}
          <input
            value={newNumber}
            onChange={(e) => setNumber(e.target.value)}
          />
          <div>debug: {newNumber}</div>
        </div>
        <div>
          <button style={{ marginTop: "10px" }} type="submit">
            Add
          </button>
        </div>
      </form>
    </>
  );
};

export default Phonebook;
