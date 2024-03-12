import React, { useState, useEffect } from 'react';
import { Form, Button, Table } from 'react-bootstrap';
import axios from 'axios';

const getNext7Days = () => {
  const dates = [];
  for (let i = 1; i <= 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    dates.push(date.toISOString().split('T')[0]);
  }
  return dates;
};

const AddScheduleScreen = () => {
  const [schedule, setSchedule] = useState({});
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const dates = getNext7Days();
  const times = ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];

  useEffect(() => {
    const fetchCourses = async () => {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      if (userInfo) {
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        try {
          const { data } = await axios.get('/api/courses/teacher/courses', config);
          //const courseNames = data.map(course => course.name); // Extract course names from the response
          setCourses(data);
          setSelectedCourse(data.length > 0 ? data[0] : '');
        } catch (error) {
          console.error('Failed to fetch courses:', error);
          // Handle error here
        }
      }
    };

    fetchCourses();
  }, []);

  const handleCheckboxChange = (date, time) => {
    setSchedule(prevSchedule => {
      const newSchedule = { ...prevSchedule };
      if (newSchedule[date] && newSchedule[date].includes(time)) {
        newSchedule[date] = newSchedule[date].filter(t => t !== time);
      } else {
        newSchedule[date] = [...(newSchedule[date] || []), time];
      }
      return newSchedule;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (!userInfo) {
      alert('You are not logged in.');
      return;
    }
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    try {
      await axios.post('/api/schedule/add', { schedule, courseId: selectedCourse }, config);
      
      alert('Schedule added successfully!');

      setSchedule({});
      
    } catch (error) {
      alert(`Failed to add the schedule: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <>
      <h2>Add Your Schedule</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="courseSelect">
          <Form.Label>Select Course:</Form.Label>
          <Form.Control as="select" value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)}>
            {courses.map((courseName, index) => (
              <option key={index} value={courseName}>
                {courseName}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Date / Time</th>
              {dates.map(date => (
                <th key={date}>{date}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {times.map(time => (
              <tr key={time}>
                <td>{time}</td>
                {dates.map(date => (
                  <td key={date}>
                    <Form.Check
                      type="checkbox"
                      checked={schedule[date]?.includes(time) || false}
                      onChange={() => handleCheckboxChange(date, time)}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
        <Button type="submit">Submit Schedule</Button>
      </Form>
    </>
  );
};

export default AddScheduleScreen;
