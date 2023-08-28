import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", email: "" });

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const handleAddUser = () => {
    setUsers([...users, newUser]);
    setNewUser({ name: "", email: "" });
  };

  const handleDeleteUser = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
  };

  return (
    <div className="App">
      <h1>User Management App</h1>
      <form>
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          className="input-field"
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          className="input-field"
        />
        <button type="button" onClick={handleAddUser} className="add-button">
          Add User
        </button>
      </form>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <div className="user-container">
              <span className="user-name">{user.name}</span>
              <button
                onClick={() => handleDeleteUser(user.id)}
                className="delete-button"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
