import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import { Card, CardBody, CardHeader } from "../ui/Card";
import { Button } from "../ui/Button";

export const MeetingCalendar: React.FC = () => {
const [events, setEvents] = useState([
{
id: "1",
title: "Investor Meeting",
start: "2026-07-12",
color: "#2563eb",
},
{
id: "2",
title: "Startup Pitch",
start: "2026-07-15",
color: "#16a34a",
},
{
id: "3",
title: "Business Review",
start: "2026-07-18",
color: "#f59e0b",
},
{
id: "4",
title: "Product Demo",
start: "2026-07-24",
color: "#dc2626",
},
]);

const [requests, setRequests] = useState([
{
id: 1,
investor: "Michael Rodriguez",
date: "12 July 2026",
time: "11:00 AM",
status: "Pending",
},
{
id: 2,
investor: "Sarah Johnson",
date: "15 July 2026",
time: "3:00 PM",
status: "Accepted",
},
]);

const [availability, setAvailability] = useState([
{
id: 1,
day: "Monday",
time: "10:00 AM - 12:00 PM",
},
{
id: 2,
day: "Wednesday",
time: "2:00 PM - 4:00 PM",
},
]);

const [showForm, setShowForm] = useState(false);
const [meetingTitle, setMeetingTitle] = useState("");

const confirmedMeetings = requests.filter(
(request) => request.status === "Accepted"
);

const handleDateClick = (info: any) => {
const title = prompt("Enter Meeting Title");

if (!title) return;

setEvents([
...events,
{
id: Date.now().toString(),
title,
start: info.dateStr,
color: "#2563eb",
},
]);
};

const handleEventClick = (info: any) => {
if (window.confirm(`Delete "${info.event.title}"?`)) {
setEvents(events.filter((event) => event.id !== info.event.id));
}
};

const editAvailability = (id: number) => {
const newTime = prompt("Enter new availability time");

if (!newTime) return;

setAvailability(
availability.map((slot) =>
slot.id === id ? { ...slot, time: newTime } : slot
)
);
};

return (
<Card className="mt-6">
<CardHeader>
<div className="flex justify-between items-center">
<h2 className="text-xl font-bold text-gray-900">
Meeting Scheduling Calendar
</h2>

<Button onClick={() => setShowForm(!showForm)}>
+ Schedule Meeting
</Button>
</div>
</CardHeader>

<CardBody>
{showForm && (
<div className="border rounded-lg p-4 mb-6 bg-gray-50">
<h3 className="text-lg font-semibold mb-3">
Schedule New Meeting
</h3>

<input
type="text"
placeholder="Meeting Title"
className="w-full border rounded-md p-2 mb-3"
value={meetingTitle}
onChange={(e) => setMeetingTitle(e.target.value)}
/>

<Button
onClick={() => {
if (!meetingTitle) return;

setEvents([
...events,
{
id: Date.now().toString(),
title: meetingTitle,
start: new Date().toISOString().split("T")[0],
color: "#2563eb",
},
]);

setMeetingTitle("");
setShowForm(false);
}}
>
Save Meeting
</Button>
</div>
)}

{/* Meeting Requests */}
<div className="mb-8">
<h3 className="text-lg font-semibold mb-4">
Meeting Requests
</h3>

<div className="space-y-4">
{requests.map((request) => (
<div
key={request.id}
className="border rounded-lg p-4 flex justify-between items-center bg-white shadow-sm"
>
<div>
<h4 className="font-semibold">
{request.investor}
</h4>

<p className="text-sm text-gray-600">
{request.date} • {request.time}
</p>

<span
className={`text-sm font-medium ${
request.status === "Accepted"
? "text-green-600"
: request.status === "Declined"
? "text-red-600"
: "text-yellow-600"
}`}
>
{request.status}
</span>
</div>

<div className="flex gap-2">
<Button
size="sm"
onClick={() =>
setRequests(
requests.map((item) =>
item.id === request.id
? { ...item, status: "Accepted" }
: item
)
)
}
>
Accept
</Button>

<Button
size="sm"
variant="outline"
onClick={() =>
setRequests(
requests.map((item) =>
item.id === request.id
? { ...item, status: "Declined" }
: item
)
)
}
>
Decline
</Button>
</div>
</div>
))}
</div>
</div>

{/* Confirmed Meetings */}
<div className="mb-8">
<h3 className="text-lg font-semibold mb-4">
Confirmed Meetings
</h3>

{confirmedMeetings.length === 0 ? (
<p className="text-gray-500">
No confirmed meetings.
</p>
) : (
<div className="space-y-3">
{confirmedMeetings.map((meeting) => (
<div
key={meeting.id}
className="border rounded-lg p-4 bg-green-50"
>
<h4 className="font-semibold">
{meeting.investor}
</h4>

<p className="text-sm text-gray-600">
{meeting.date} • {meeting.time}
</p>

<span className="text-green-600 font-medium">
Confirmed
</span>
</div>
))}
</div>
)}
</div>

{/* Calendar */}
<FullCalendar
plugins={[
dayGridPlugin,
timeGridPlugin,
interactionPlugin,
]}
initialView="dayGridMonth"
selectable={true}
editable={true}
height="650px"
events={events}
dateClick={handleDateClick}
eventClick={handleEventClick}
headerToolbar={{
left: "prev,next today",
center: "title",
right: "dayGridMonth,timeGridWeek,timeGridDay",
}}
/>
{/* Availability */}
<div className="mt-8">
<h3 className="text-lg font-semibold mb-4">
My Availability
</h3>

<div className="space-y-3">
{availability.map((slot) => (
<div
key={slot.id}
className="flex justify-between items-center border rounded-lg p-4"
>
<div>
<p className="font-medium">{slot.day}</p>
<p className="text-sm text-gray-600">
{slot.time}
</p>
</div>

<Button
size="sm"
onClick={() => editAvailability(slot.id)}
>
Edit
</Button>
</div>
))}
</div>
</div>

</CardBody>
</Card>
);
};
