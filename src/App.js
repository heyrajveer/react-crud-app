import { useEffect, useState } from "react";
import "./App.css";
import { EmployeeData } from "./EmployeeData";

function App() {
  const [data, setData] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [id, setId] = useState(null); // null means we're adding a new record

  useEffect(() => {
    setData(EmployeeData);
  }, []);

  const handleEdit = (id) => {
    const emp = data.find(item => item.id === id);
    if (emp) {
      setId(emp.id);
      setFirstName(emp.firstName);
      setLastName(emp.lastName);
      setAge(emp.age);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure to delete this item? ID: " + id)) {
      const updatedData = data.filter(item => item.id !== id);
      setData(updatedData);
      // If you're editing the same item, also clear the form
      if (id === id) clearForm();
    }
  };

  const handleSave = () => {
    if (!firstName || !lastName || !age) {
      alert("Please fill all fields");
      return;
    }

    if (id === null) {
      // Add mode
      const newId = data.length > 0 ? Math.max(...data.map(d => d.id)) + 1 : 1;
      const newEmployee = {
        id: newId,
        firstName,
        lastName,
        age: parseInt(age)
      };
      setData([...data, newEmployee]);
    } else {
      // Edit mode
      const updatedData = data.map(item =>
        item.id === id
          ? { ...item, firstName, lastName, age: parseInt(age) }
          : item
      );
      setData(updatedData);
    }

    clearForm();
  };

  const clearForm = () => {
    setFirstName('');
    setLastName('');
    setAge('');
    setId(null);
  };

  return (
    <div className="App container mt-4">
      <h2 className="mb-4">Employee Table</h2>

      {/* Form Section */}
      <div className="mb-4 p-3 border rounded" style={{ maxWidth: "600px", margin: "auto" }}>
        <div className="mb-2">
          <label>First Name: </label>
          <input
            type="text"
            className="form-control"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter First Name"
          />
        </div>
        <div className="mb-2">
          <label>Last Name: </label>
          <input
            type="text"
            className="form-control"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Enter Last Name"
          />
        </div>
        <div className="mb-2">
          <label>Age: </label>
          <input
            type="number"
            className="form-control"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Enter Age"
          />
        </div>
        <div className="d-flex gap-2">
          <button className="btn btn-success" onClick={handleSave}>
            {id === null ? "Save" : "Update"}
          </button>
          <button className="btn btn-secondary" onClick={clearForm}>
            Clear
          </button>
        </div>
      </div>

      {/* Table Section */}
      <table className="table table-hover table-bordered mt-4">
        <thead className="table-dark">
          <tr>
            <th>Sr.No</th>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.id}</td>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
              <td>{item.age}</td>
              <td>
                <button
                  className="btn btn-primary btn-sm me-2"
                  onClick={() => handleEdit(item.id)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
