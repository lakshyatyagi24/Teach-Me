import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Table } from 'react-bootstrap';

const ScheduleScreen = () => {
    const [scheduleData, setScheduleData] = useState({ dates: [], times: [], bookings: {}, teacherName: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const { courseId, teacherId } = useParams();

    useEffect(() => {
        const fetchSchedule = async () => {
            try {
                setLoading(true);
                const { data } = await axios.get(`/api/schedule/${courseId}/${teacherId}`);
                setScheduleData(data);
                setLoading(false);
            } catch (err) {
                setError(err.response && err.response.data.message ? err.response.data.message : err.message);
                setLoading(false);
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
                                <th>Date</th>
                                {scheduleData.dates.map((date, index) => (
                                    <th key={index}>{date}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {scheduleData.times.map((time, index) => (
                                <tr key={index}>
                                    <td>{time}</td>
                                    {scheduleData.dates.map((date, dateIndex) => (
                                        <td
                                            key={`${date}-${time}`}
                                            className={
                                                scheduleData.bookings[date]?.includes(time)
                                                    ? 'booked'
                                                    : 'available'
                                            }
                                        >
                                            {scheduleData.bookings[date]?.includes(time)
                                                ? 'Booked'
                                                : 'Available'}
                                        </td>
                                    ))}
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
