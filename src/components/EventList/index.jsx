import { format } from "date-fns";
import classes from "./style.module.css";
import PropTypes from "prop-types";

const formatDateTime = (dateTime) => {
  return format(dateTime, "do MMM yyyy h:m aaa");
};

const EventList = ({ events }) => {
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

EventList.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object),
};

export default EventList;
