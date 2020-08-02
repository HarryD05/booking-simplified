import React from 'react';

//helpers
import { orderEventsByDate } from '../../helpers/index';

//Components
import EventItem from './EventItem';

const EventList = props => {
  let { events } = props;

  events = orderEventsByDate(events);

  const output = events.map(event => {
    return (<EventItem key={event._id} event={event} bookings={props.bookings} onDetail={props.onViewDetail} />)
  });

  return (
    <ul className="events-list">
      {output}
    </ul>
  )
}

export default EventList;