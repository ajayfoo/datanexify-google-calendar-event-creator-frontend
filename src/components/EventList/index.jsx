import { useEffect, useState } from "react";
import { format } from "date-fns";
import classes from "./style.module.css";

const formatDateTime = (dateTime) => {
  return format(dateTime, "do MMM yyyy h:m aaa");
};

const EventList = () => {
  const [events, setEvents] = useState([]);
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
  const eventsRows = events.map((e) => {
    const time = e.start.dateTime
      ? formatDateTime(e.start.dateTime)
      : formatDateTime(e.start.date);
    return (
      <tr className={classes.tr} key={e.id}>
        <td>{e.summary}</td>
        <td>{time}</td>
      </tr>
    );
  });
  return (
    <article>
      <h2>Events</h2>
      <table className={classes["events-table"]}>
        <thead>
          <tr className={classes.tr}>
            <th>Summary</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>{eventsRows}</tbody>
      </table>
    </article>
  );
};

export default EventList;
