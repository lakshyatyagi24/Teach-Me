import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../design/ScheduleScreen.css'; // Make sure the path is correct

const ScheduleScreen = () => {
    const [scheduleData, setScheduleData] = useState({ dates: [], times: [], bookings: {}, teacherName: '' });
    const { courseId, teacherId } = useParams();

    useEffect(() => {
        const fetchSchedule = async () => {
          try {
            const token = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")).token : null;
            const config = {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            };
            const response = await axios.get(`/api/schedule/${courseId}/${teacherId}`, config);
            setScheduleData(response.data);
          } catch (error) {
            console.error('There was an error fetching the schedule data:', error.response.data.message);
          }
        };
    
        if (courseId && teacherId) {
          fetchSchedule();
        }
      }, [courseId, teacherId]);

      const bookTimeSlot = (date, time) => {
        const token = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")).token : null;
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      
        axios.post(`/api/schedule/book`, { courseId, teacherId, date, time }, config)
          .then(() => {
            setScheduleData(prevData => {
              const updatedBookings = { ...prevData.bookings, [date]: prevData.bookings[date] ? [...prevData.bookings[date], time] : [time] };
              return { ...prevData, bookings: updatedBookings };
            });
            alert(`You've successfully scheduled a lesson in the course with the teacher at ${time} on ${date}.`);
          })
          .catch(error => {
            const errorMessage = error.response && error.response.data && error.response.data.message 
                                ? error.response.data.message 
                                : error.message;
            console.error('There was an error booking the time slot:', errorMessage);
            alert(`Failed to book the time slot: ${errorMessage}`);
          });
          
      };
      

    if (!scheduleData.dates || !scheduleData.times) {
        return <div>Loading schedule...</div>; // Placeholder for loading state
    }

    return (
        <div className="schedule-container">
            <h2>Schedule for {scheduleData.teacherName}</h2>
            <table>
                <thead>
                    <tr>
                        <th>Date/Time</th>
                        {scheduleData.dates.map(date => <th key={date}>{date}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {scheduleData.times.map(time => (
                        <tr key={time}>
                            <td>{time}</td>
                            {scheduleData.dates.map(date => (
                                <td
                                    key={`${date}-${time}`}
                                    className={scheduleData.bookings[date]?.includes(time) ? 'booked' : 'available'}
                                    onClick={() => !scheduleData.bookings[date]?.includes(time) && bookTimeSlot(date, time)}
                                >
                                    {scheduleData.bookings[date]?.includes(time) ? 'Booked' : 'Available'}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ScheduleScreen;
