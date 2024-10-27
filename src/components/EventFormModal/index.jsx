import { format } from "date-fns";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";

const formatDateTime = (value) => {
  return format(value, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
};

const EventForm = ({ onSubmitComplete, onSubmitSuccess }) => {
  const [summary, setSummary] = useState("");
  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");

  const handleNameChange = (e) => {
    setSummary(e.target.value);
  };
  const handleStartDateTimeChange = (e) => {
    setStartDateTime(e.target.value);
  };
  const handleEndDateTimeChange = (e) => {
    setEndDateTime(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const event = {
      summary,
      start: {
        dateTime: formatDateTime(startDateTime),
      },
      end: {
        dateTime: formatDateTime(endDateTime),
      },
    };
    try {
      const res = await window.gapi.client.calendar.events.insert({
        calendarId: "primary",
        resource: event,
      });
      const id = JSON.parse(res.body).id;
      const newEvent = {
        ...event,
        id,
      };
      onSubmitSuccess(newEvent);
    } catch (err) {
      console.error(err);
    } finally {
      onSubmitComplete();
    }
  };

  const summaryFieldId = "event-form-summary";
  const startDateTimeFieldId = "event-form-start-date-time";
  const endDateTimeFieldId = "event-form-end-date-time";
  return (
    <form onSubmit={handleSubmit}>
      <section className="field">
        <label htmlFor={summaryFieldId}>Summary</label>
        <input
          onChange={handleNameChange}
          type="text"
          id={summaryFieldId}
          value={summary}
          required
        />
      </section>
      <section className="field">
        <label htmlFor={startDateTimeFieldId}>Start Date & Time</label>
        <input
          onChange={handleStartDateTimeChange}
          type="datetime-local"
          id={startDateTimeFieldId}
          value={startDateTime}
          required
        />
      </section>
      <section className="field">
        <label htmlFor={endDateTimeFieldId}>End Date & Time</label>
        <input
          onChange={handleEndDateTimeChange}
          type="datetime-local"
          id={endDateTimeFieldId}
          value={endDateTime}
          required
        />
      </section>
      <button>Create</button>
    </form>
  );
};

EventForm.propTypes = {
  onSubmitComplete: PropTypes.func,
  onSubmitSuccess: PropTypes.func,
};

const EventFormModal = ({ isOpen, onClose, onAddNewEvent }) => {
  const modalRef = useRef(null);
  useEffect(() => {
    if (!isOpen) {
      modalRef.current.close();
    } else {
      modalRef.current.showModal();
    }
  }, [isOpen]);
  return (
    <dialog onClose={onClose} ref={modalRef}>
      <EventForm onSubmitComplete={onClose} onSubmitSuccess={onAddNewEvent} />
    </dialog>
  );
};

EventFormModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onAddNewEvent: PropTypes.func,
};

export default EventFormModal;
