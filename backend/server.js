const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());           // Enable CORS
app.use(bodyParser.json()); // Parse incoming JSON requests

// Global array to store students
const students = [];

// Test Route
app.get('/', (req, res) => {
  res.send('Backend server is running!');
});

// Add Student Route
app.post('/add-student', (req, res) => {
  const { name, age, course, roomNo } = req.body;

  // Validate all fields
  if (!name || !age || !course || !roomNo) {
    return res.status(400).send({ success: false, message: 'All fields are required!' });
  }

  // Add the student to the array
  const student = { name, age, course, roomNo };
  students.push(student);
  console.log('Student Data Added:', student);

  res.send({
    success: true,
    message: 'Student added successfully!',
    data: student,
  });
});

// Route to get all students
app.get('/students', (req, res) => {
  res.status(200).json(students); // Return the students array as a JSON response
});

// Delete Student Route
app.delete('/delete-student/:name', (req, res) => {
  const studentName = req.params.name;
  const index = students.findIndex((s) => s.name === studentName);

  if (index !== -1) {
    const removedStudent = students.splice(index, 1); // Remove the student
    res.send({ success: true, message: 'Student deleted successfully!', data: removedStudent });
  } else {
    res.status(404).send({ success: false, message: 'Student not found!' });
  }
});

// Start the Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
