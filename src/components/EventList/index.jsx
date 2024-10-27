import { useEffect, useState } from "react";

const EventList = () => {
  const [events, setEvents] = useState(null);
  useEffect(() => {
    let ignore = false;
    const fetchAndSetEvents = async () => {
      try {
        const request = {
          calendarId: "primary",
          timeMin: new Date().toISOString(),
          showDeleted: false,
          singleEvents: true,
          maxResults: 10,
          orderBy: "startTime",
        };
        const response = await window.gapi.client.calendar.events.list(request);
        if (ignore) return;
        setEvents(response.result.items);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAndSetEvents();
    return () => {
      ignore = true;
    };
  }, [setEvents]);
  return events
    ? events.reduce(
        (str, event) =>
          `${str}${event.summary} (${event.start.dateTime || event.start.date})\n`,
        "Events:\n"
      )
    : "Loading... events";
};

export default EventList;
