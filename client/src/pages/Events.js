import React, { useContext, useState, useEffect } from 'react';

//Components
import Modal from '../components/Modal';
import Backdrop from '../components/Backdrop';
import EventList from '../components/events/EventList';
import Spinner from '../components/Spinner';

//Context
import { AuthContext } from '../context/AuthContext';

//Services
import EventService from '../services/EventService';
import BookingService from '../services/BookingService';
import AuthService from '../services/AuthService';

const Events = props => {
  // eslint-disable-next-line
  const authContext = useContext(AuthContext);

  const [isCreating, setIsCreating] = useState(false);
  const [eventInput, setEventInput] = useState({ title: "", description: "", price: 0, date: "" });
  const [events, setEvents] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [userDetails, setUserDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [placeholder, setPlaceholder] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      setEvents(await EventService.getEvents());

      if (authContext.token) {
        setBookings(await BookingService.getBookings(authContext.token));
        setUserDetails(await AuthService.userDetails(authContext.token));
      }

      setIsLoading(false);
    }

    fetchData();
  }, [isCreating, authContext, placeholder]);


  const onChange = e => {
    setEventInput({
      ...eventInput,
      [e.target.name]: e.target.value
    });
  }

  const startCreateEventHandler = () => {
    setIsCreating(true);
  }

  const modalCancel = () => {
    setIsCreating(false);
    setSelectedEvent(null);
  }

  const modalConfirm = async e => {
    const { title, price, date, description } = eventInput;
    if (
      title.trim().length === 0 ||
      price.trim().length === 0 ||
      date.trim().length === 0 ||
      description.trim().length === 0
    ) {
      return;
    }


    eventInput.price = +eventInput.price;
    const newEvent = await EventService.createEvent(eventInput, authContext.token);

    setIsCreating(false);

    setEvents([...events, {
      _id: newEvent._id,
      title: newEvent.title,
      description: newEvent.description,
      price: newEvent.price,
      date: newEvent.date,
      creator: {
        _id: authContext.userId
      }
    }]);
  }

  const renderModal = () => {
    return (
      <>
        <Backdrop />
        <Modal
          title="Add Event"
          canCancel canConfirm
          onCancel={modalCancel} onConfirm={modalConfirm}
          confirmText="Confirm"
        >
          <form>
            <div className="form-control">
              <label htmlFor="title">Title</label>
              <input type="text" name="title" onChange={onChange} required></input>
            </div>
            <div className="form-control">
              <label htmlFor="price">Price</label>
              <input type="number" name="price" onChange={onChange} required></input>
            </div>
            <div className="form-control">
              <label htmlFor="date">Date</label>
              <input type="datetime-local" name="date" onChange={onChange} required></input>
            </div>
            <div className="form-control">
              <label htmlFor="description">Description</label>
              <textarea type="text" name="description" rows="4" onChange={onChange} required></textarea>
            </div>
          </form>
        </Modal>
      </>
    )
  }

  const renderCreateEvent = () => {
    return (
      <>
        {isCreating ? renderModal() : null}

        <div className="events-control">
          <h2>Hi, {userDetails.name}</h2>
          <p>Share your own events!</p>
          <button className="btn" onClick={startCreateEventHandler}>Create Event</button>
        </div>
      </>
    )
  }

  const showDetailHandler = eventId => {
    setSelectedEvent(events.find(e => e._id === eventId));
  }

  const renderEvents = () => {
    if (events) {
      if (events.length > 0) {
        return <EventList events={events} bookings={bookings} onViewDetail={showDetailHandler} />
      }
    }

    return null;
  }

  const bookEvent = async () => {
    await BookingService.bookEvent(selectedEvent._id, authContext.token);
    setSelectedEvent(null);
    setPlaceholder(!placeholder);
  }

  const renderSelectedEventModal = () => {
    const { title, price, date, description, creator } = selectedEvent;

    const content = (
      <>
        <h2>£{price} - {new Date(date).toLocaleDateString()}</h2>

        <p>{description}</p><br />

        <em className="sub-text">Created by {creator.name} ({creator.email})</em>
      </>
    );

    if (authContext.token) {
      return (
        <>
          <Backdrop />
          <Modal
            title={title}
            canCancel canConfirm
            onCancel={modalCancel}
            onConfirm={bookEvent}
            confirmText={'Book'}
          >
            {content}
          </Modal>
        </>
      )
    }

    return (
      <>
        <Backdrop />
        <Modal
          title={title}
          canCancel
          onCancel={modalCancel}
        >
          {content}
        </Modal>
      </>
    )
  }

  return (
    <div className="events">
      <h1>Events</h1>

      {userDetails !== null ? renderCreateEvent() : null}

      {selectedEvent !== null ? renderSelectedEventModal() : null}

      {isLoading ? <Spinner /> : renderEvents()}
    </div>
  );
}

export default Events;