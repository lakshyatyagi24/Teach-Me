import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Table } from 'react-bootstrap';

const ScheduleScreen = () => {
    const [scheduleData, setScheduleData] = useState({
        dates: [],
        times: [],
        bookings: {},
        teacherName: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const { courseId, teacherId } = useParams();

    useEffect(() => {
        const fetchSchedule = async () => {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            if (userInfo) {
                const config = {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`,
                    },
                };
                try {
                    setLoading(true);
                    const response = await axios.get(`/api/schedule/${courseId}/${teacherId}`, config);
                    //console.log('API Response:', response);
                    
                    // Assuming each item in the response array has 'date', 'times', and 'bookings'
                    const scheduleList = response.data;
    
                    // Extract dates and times
                    const dates = scheduleList.map(item => item.date);
                    const times = scheduleList.reduce((acc, item) => {
                        acc.push(...item.times);
                        return acc;
                    }, []);
    
                    // Assuming bookings is an object with date keys and time values
                    const bookings = scheduleList.reduce((acc, item) => {
                        acc[item.date] = item.bookings;
                        return acc;
                    }, {});
    
                    // Use these extracted values to create the formattedData
                    const formattedData = {
                        dates,
                        times,
                        bookings,
                        // Add the teacher name extraction logic as needed
                        teacherName: '',
                    };
                    //console.log("formattedData", formattedData);
                    setScheduleData(formattedData);
                    setLoading(false);
                } catch (err) {
                    console.error('Fetching Schedule Error:', err);
                    setError(err.response && err.response.data && err.response.data.message ? err.response.data.message : err.message);
                    setLoading(false);
                }
            }
        };
    
        fetchSchedule();
    }, [courseId, teacherId]);
    

    return (
        <div className="schedule-container">
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : (
                <>
                    <h2>Schedule for {scheduleData.teacherName}</h2>
                    <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th className="date-column">Date</th>
                            {scheduleData.dates?.map((date, index) => (
                                <th key={index}>{date}</th>
                            ))}
                        </tr>
                    </thead>
                        <tbody>
                            {scheduleData.times?.map((time, index) => (
                                <tr key={index}>
                                    <td>{time}</td>
                                    {scheduleData.dates?.map((date, dateIndex) => {
                                        const timesForDate = scheduleData.bookings[date];
                                        const isBooked = Array.isArray(timesForDate) && timesForDate.includes(time);
                                        const cellClass = isBooked ? 'booked' : 'available'; // Use the classes defined in the CSS
                                        return (
                                            <td
                                                key={`${date}-${time}`}
                                                className={cellClass} // Apply the class here
                                            >
                                                {isBooked ? 'Booked' : 'Available'}
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </>
            )}
        </div>
    );
};

export default ScheduleScreen;
