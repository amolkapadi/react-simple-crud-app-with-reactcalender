import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Trash2, Edit } from 'react-feather';
import './App.css';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [eventTitle, setEventTitle] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [events, setEvents] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleBtnClick = () => {
    setShowModal(true);
    setEditMode(false); // Reset edit mode when opening the modal
  };

  const handleEditEvent = (index) => {
    const selectedEvent = events[index];
    setEventTitle(selectedEvent.title);
    setSelectedDate(selectedEvent.date);
    setEditMode(true);
    setEditIndex(index);
    setShowModal(true);
    setShowCalendar(true);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setShowCalendar(false);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEventTitle('');
    setSelectedDate(null);
    setEditMode(false);
    setEditIndex(null);
  };

  const handleCreateEvent = () => {
    if (eventTitle && selectedDate) {
      if (editMode && editIndex !== null) {
        // Update existing event
        const updatedEvents = [...events];
        updatedEvents[editIndex] = { title: eventTitle, date: selectedDate };
        setEvents(updatedEvents);
      } else {
        // Add new event
        setEvents([...events, { title: eventTitle, date: selectedDate }]);
      }

      handleModalClose();
    }
  };

  const handleDeleteEvent = (index) => {
    const updatedEvents = [...events];
    updatedEvents.splice(index, 1);
    setEvents(updatedEvents);
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  return (
    <div className='container py-5'>
      <h1 className='text-white'>React Crate Event With Calendar App</h1>
      <button onClick={handleBtnClick} className='btn btn-outline-light mt-3'>Add Event</button>

      {showModal && (
        <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{editMode ? 'Edit Event' : 'Add Event'}</h5>
                <button type="button" className="btn-close" onClick={handleModalClose}></button>
              </div>
              <div className="modal-body">
                <label>Title of Event</label>
                <textarea
                rows="10"
                  className='form-control mt-2'
                  type="text"
                  placeholder="Event Title"
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                />
                <button type="button" className="btn btn-outline-dark mt-4" onClick={toggleCalendar}>
                  Select Date {selectedDate && `: ${selectedDate.toDateString()}`}
                </button>
                {showCalendar && (
                  <>
                    <Calendar onChange={handleDateSelect} value={selectedDate} />
                    {selectedDate && (
                      <p>Selected Date: {selectedDate.toDateString()}</p>
                    )}
                  </>
                )}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleModalClose}>
                  Close
                </button>
                <button type="button" className="btn btn-primary" onClick={handleCreateEvent}>
                  {editMode ? 'Update Event' : 'Save Event'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="row row-cols-1 row-cols-md-3 g-4 py-5">
        {events.map((event, index) => (
          <div key={index} className="col">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title"> Title : {event.title}</h5>
                <p className="card-text">Date: {event.date.toDateString()}</p>
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDeleteEvent(index)}
                >
                  <Trash2 size={16} />
                </button>
                <button
                  type="button"
                  className="btn btn-primary btn-sm mx-2"
                  onClick={() => handleEditEvent(index)}
                >
                  <Edit size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
