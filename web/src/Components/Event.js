import React from "react";
import { useHistory } from "react-router-dom";


const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const mapDay = n => days[n];

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
const mapMonth = n => months[n];

export default function Event(props) {
  const history = useHistory();

  const d = new Date(props.event.start.dateTime);
  const day = mapDay(d.getDay());
  const date = d.getDate();
  const month = mapMonth(d.getMonth());

  const handleClick = (e) => {
    e.preventDefault();
    if (!props.extended) history.push(`/events/${props.event.id}`)
  };

  return (
    <a onClick={handleClick} href={`/events/${props.event.id}`} className="event">
      <div className="calendar">
        <span className="day">{day}</span>
        <span className="date">{date}</span>
        <span className="month">{month}</span>
      </div>
      <div className="details">
        <span className="times">
          {new Date(props.event.start.dateTime).toLocaleTimeString()}
          {' '}-{' '}
          {new Date(props.event.end.dateTime).toLocaleTimeString()}
        </span>
        <span className="summary">
          {props.event.summary}
        </span>
        {props.extended && (
          <a href={props.event.location} target="_blank" rel="noopener noreferrer">Join event!</a>
        )}
      </div>
    </a>
  )
};
