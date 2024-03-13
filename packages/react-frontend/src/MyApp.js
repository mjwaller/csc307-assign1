import React, {useState, useEffect} from 'react';
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([]);

  function removeOneCharacter(id) {
    fetch(`http://localhost:8000/users/${id}`, { method: 'DELETE' })
        .then((res) => {
            if (res.status === 204) {
                setCharacters(characters.filter(character => character._id !== id));
            } else {
                throw new Error('Error: Failed to delete user');
            }
        })
        .catch((error) => {
            console.log(error);
        });
}

    function updateList(person) {
        postUser(person)
            .then((res) => {
                if (res.status === 201) {
                    return res.json();
                } else {
                    throw new Error('Error: Failed to add user');
                }
            })
            .then((newUser) => {
                setCharacters([...characters, newUser]); 
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function fetchUsers() {
	const promise = fetch("http://localhost:8000/users");
	return promise;
    }
    
    function postUser(person) {
	const promise = fetch("Http://localhost:8000/users", {
	    method: "POST",
	    headers: {
		"Content-Type": "application/json",
	    },
	    body: JSON.stringify(person),
	});
	return promise;
    }

   useEffect(() => {
    fetchUsers()
        .then((res) => res.json())
        .then((json) => setCharacters(json))
        .catch((error) => {
            console.log(error);
        });
}, []); 
    
    return (
	<div className="container">
	    <Table
		characterData={characters}
		removeCharacter={removeOneCharacter}
	    />
	    <Form handleSubmit={updateList} />
	</div>
    ); 
}

export default MyApp;
