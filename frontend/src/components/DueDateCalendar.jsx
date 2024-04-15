import PropTypes from "prop-types";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Popover from "./Popover";
import styled from "styled-components";
import { useState } from "react";
import { BellRing } from "lucide-react";

const Trigger = styled.div`
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

function DueDateCalendar({ dueDate, setDueDate }) {
  const [onClose, setOnClose] = useState(false);
  const formattedDate = dueDate.toDateString();

  const handleDateSelection = (date) => {
    setDueDate(date);
    setOnClose(true);
  };

  const trigger = (
    <Trigger>
      <BellRing size={18} />
      {formattedDate}
    </Trigger>
  );

  return (
    <>
      <Popover
        buttonText={formattedDate}
        onClose={onClose}
        setOnClose={setOnClose}
        trigger={trigger}
      >
        <Calendar
          onChange={handleDateSelection}
          minDate={new Date()}
          value={dueDate}
          // minDetail="year"   TODO: Do it after changing the styling, the UI is confusing
        />
      </Popover>
    </>
  );
}

DueDateCalendar.propTypes = {
  dueDate: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]),
  setDueDate: PropTypes.func.isRequired,
};

export default DueDateCalendar;
