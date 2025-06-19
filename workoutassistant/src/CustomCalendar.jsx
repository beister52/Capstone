import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

function CustomCalendar() {
    const [events, setEvents] = useState([
        {
            title: "Workout Session",
            start: new Date(2025, 2, 20, 10, 0), // March 20, 2025, 10:00 AM
            end: new Date(2025, 2, 20, 12, 0),   // March 20, 2025, 12:00 PM
        },
        {
            title: "Check Form",
            start: new Date(2025, 2, 22, 14, 0), // March 22, 2025, 2:00 PM
            end: new Date(2025, 2, 22, 16, 0),   // March 22, 2025, 4:00 PM
        },
    ]);
  
    return (
        <div style={{ height: "80vh", padding: "20px" }}>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                view="month"
                defaultView="month" // Ensures the default view is a month
                style={{ height: "100%", width: "100%" }}
        />
        </div>
    );
};
  
export default CustomCalendar;
  