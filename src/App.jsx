
import { useState } from "react";
import "./App.css";

function App() {
  const [students, setStudents] = useState([
    { id: 1, name: "Rahul Kumar", course: "AWS Cloud", email: "rahul@gmail.com" },
    { id: 2, name: "Priya Sharma", course: "DevOps", email: "priya@gmail.com" },
    { id: 3, name: "Arjun Reddy", course: "React JS", email: "arjun@gmail.com" }
  ]);

  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [email, setEmail] = useState("");
  const [search, setSearch] = useState("");

  function addStudent(e) {
    e.preventDefault();

    if (!name.trim() || !course.trim() || !email.trim()) {
      alert("Please fill all fields");
      return;
    }

    setStudents([...students, {
      id: Date.now(),
      name,
      course,
      email
    }]);

    setName("");
    setCourse("");
    setEmail("");
  }

  function deleteStudent(id) {
    setStudents(students.filter(student => student.id !== id));
  }

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(search.toLowerCase()) ||
    student.course.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">
      <header className="header">
        <div>
          <h1>Student Management</h1>
          <p>Manage your students in one place</p>
        </div>
        <span className="logo">SMS</span>
      </header>

      <main className="container">
        <section className="stats">
          <div className="stat-card">
            <h3>Total Students</h3>
            <h2>{students.length}</h2>
          </div>

          <div className="stat-card">
            <h3>Available Courses</h3>
            <h2>{new Set(students.map(s => s.course)).size}</h2>
          </div>
        </section>

        <section className="form-card">
          <h2>Add New Student</h2>
          <form onSubmit={addStudent}>
            <input placeholder="Student Name" value={name}
              onChange={e => setName(e.target.value)} required />

            <input placeholder="Course Name" value={course}
              onChange={e => setCourse(e.target.value)} required />

            <input type="email" placeholder="Email Address" value={email}
              onChange={e => setEmail(e.target.value)} required />

            <button type="submit">Add Student</button>
          </form>
        </section>

        <section className="table-card">
          <div className="table-header">
            <h2>Student List</h2>
            <input placeholder="Search students..."
              value={search}
              onChange={e => setSearch(e.target.value)} />
          </div>

          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Course</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map(student => (
                  <tr key={student.id}>
                    <td>{student.id.toString().slice(-5)}</td>
                    <td>{student.name}</td>
                    <td>{student.course}</td>
                    <td>{student.email}</td>
                    <td>
                      <button className="delete-btn"
                        onClick={() => deleteStudent(student.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}

                {filteredStudents.length === 0 && (
                  <tr>
                    <td colSpan="5">No students found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      <footer>
        Student Management Application | AWS Amplify
      </footer>
    </div>
  );
}

export default App;
