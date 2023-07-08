import React from "react";

const Numbers = ({ usePeople, deleteOne }) => {
  const handleDelete = (id, name) => {
    deleteOne(id, name)
  }
  return (
    <>
      <ul style={{ listStyle: "none" }}>
        {usePeople.map((person) => (
          <li key={person.name}>
            {person.name} {person.number}
            <button onClick={() => handleDelete(person.id, person.name)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Numbers;
