import PropTypes from "prop-types";
import styled from "styled-components";
import { Plus, Rocket } from "lucide-react";
import { useEffect, useState } from "react";
import "react-calendar/dist/Calendar.css";
import { v4 as uuidv4 } from "uuid";
import randomColor from "randomcolor";

import DueDateCalendar from "./DueDateCalendar";
import moment from "moment";

const Root = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Inner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CreateCard = styled.div`
  margin: 0.5rem;
  padding: 1rem;
  min-width: 300px;
  border: 1px solid blue;
  border-radius: var(--accent-radius);
  display: flex;
  justify-content: center;
  gap: 3.5rem;
  align-items: center;
`;

const CreateButton = styled.div`
  width: 75px;
  height: 75px;
  border-radius: 50%; /* Makes it a circle */
  background-color: #007bff; /* Adjust the color as needed */
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  cursor: pointer;
`;

const SchedoForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const CreationMessage = styled.div`
  margin-left: -8.5rem;
  display: flex;
  gap: 0.5rem;
`;

function CreateScedoBar({ schedos, setSchedos, selectedDate }) {
  const [schedoTitle, setSchedoTitle] = useState("");
  const [inputError, setInputError] = useState(null);
  const [dueDate, setDueDate] = useState(selectedDate);
  const [isCreated, setIsCreated] = useState(false);

  useEffect(() => {
    if (dueDate !== selectedDate) {
      setDueDate(selectedDate);
    }
  }, [selectedDate]);

  const handleTitleChange = (e) => {
    setInputError(null);
    setSchedoTitle(e.target.value);
  };

  const handleCreate = () => {
    if (schedoTitle.length === 0) {
      setInputError("This is a required field");
    } else {
      const schedo = {
        id: uuidv4(),
        color: randomColor(),
        done: null,
        due_date: moment(dueDate).format(),
        title: schedoTitle,
      };
      setSchedos([...schedos, schedo]);
      setSchedoTitle("");
      setDueDate(selectedDate);
      setIsCreated(true);
      setTimeout(() => setIsCreated(false), 3000);
    }
  };

  return (
    <Root>
      {isCreated && (
        <CreationMessage>
          Your schedo is scheduled <Rocket />
        </CreationMessage>
      )}
      <Inner>
        <CreateCard>
          <SchedoForm>
            <label>
              <input
                type="text"
                value={schedoTitle}
                onChange={handleTitleChange}
                placeholder="Enter your task!"
              />
            </label>
            {inputError && <div style={{ color: "red" }}>{inputError}</div>}
            <DueDateCalendar dueDate={dueDate} setDueDate={setDueDate} />
          </SchedoForm>
          <CreateButton onClick={handleCreate}>
            <Plus onClick={handleCreate} />
          </CreateButton>
        </CreateCard>
      </Inner>
    </Root>
  );
}

CreateScedoBar.propTypes = {
  selectedDate: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.string,
  ]),
  schedos: PropTypes.arrayOf(
    PropTypes.shape({
      color: PropTypes.string.isRequired,
      //TODO: Giving any for now, because it is null by default
      done: PropTypes.oneOfType([PropTypes.string, PropTypes.any]),
      due_date: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  setSchedos: PropTypes.func.isRequired,
};

export default CreateScedoBar;
