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
    // Define all possible times
    const allTimes = [
        "8:00", "9:00", "10:00", "11:00", "12:00", 
        "13:00", "14:00", "15:00", "16:00", "17:00", 
        "18:00", "19:00", "20:00"
    ];


    useEffect(() => {
        const fetchSchedule = async () => {
            try {
                const userInfo = JSON.parse(localStorage.getItem('userInfo'));
                if (userInfo && userInfo.token) {
                    const { data: scheduleList } = await axios.get(
                        `/api/schedule/${courseId}/${teacherId}`,
                        { headers: { Authorization: `Bearer ${userInfo.token}` } }
                    );

                    const dates = scheduleList.map(item => item.date);
                    const bookings = scheduleList.reduce((acc, item) => {
                        acc[item.date] = allTimes.reduce((timesAcc, time) => {
                            timesAcc[time] = 'Booked'; // Default to booked
                            return timesAcc;
                        }, {});

                        item.times.forEach(timeSlot => {
                            if (timeSlot.booked === false) {
                                acc[item.date][timeSlot.time] = 'Available';
                            }
                        });

                        return acc;
                    }, {});

                    setScheduleData(prev => ({
                        ...prev,
                        dates,
                        times: allTimes,
                        bookings,
                    }));
                }
            } catch (error) {
                setError(error.response?.data?.message || error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchSchedule();
    }, [courseId, teacherId]);
    
    
      

    const handleSlotClick = async (date, time) => {
        // Check if the slot is already booked
        const slotStatus = scheduleData.bookings[date][time];
        const isBooked = slotStatus === 'Booked';
    
        // Update the local state to reflect the change immediately
        setScheduleData(prevState => {
            const updatedBookings = { ...prevState.bookings };
            updatedBookings[date][time] = isBooked ? 'Available' : 'Booked';
            return { ...prevState, bookings: updatedBookings };
        });
    
        // Update the database
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            if (userInfo) {
                const config = {
                    headers: { Authorization: `Bearer ${userInfo.token}` },
                };
                const requestBody = {
                    date, time, isBooked: !isBooked,
                };
                await axios.put(`/api/schedule/update`, requestBody, config);
            }
        } catch (error) {
            console.error('Error updating the schedule:', error);
            // Rollback state update if there's an error
            setScheduleData(prevState => {
                const updatedBookings = { ...prevState.bookings };
                updatedBookings[date][time] = isBooked ? 'Booked' : 'Available';
                return { ...prevState, bookings: updatedBookings };
            });
        }
    };
    
    
    
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="schedule-container">
            <h2>Schedule for {scheduleData.teacherName}</h2>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {scheduleData.dates.map(date => (
                        allTimes.map((time, index) => (
                            <tr key={`${date}-${time}-${index}`}>
                                {index === 0 && <td rowSpan={allTimes.length}>{date}</td>}
                                <td>{time}</td>
                                <td
                                    className={scheduleData.bookings[date][time] === 'Available' ? 'available' : 'booked'}
                                    onClick={() => handleSlotClick(date, time)}
                                >
                                    {scheduleData.bookings[date][time]}
                                </td>
                            </tr>
                        ))
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default ScheduleScreen;
