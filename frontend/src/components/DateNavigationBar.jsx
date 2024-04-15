import styled from "styled-components";
import { CircleChevronLeft, CircleChevronRight } from "lucide-react";
import PropTypes from "prop-types";

const Root = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
`;

const PrevDate = styled(CircleChevronLeft)`
  cursor: pointer;
`;

const NextDate = styled(CircleChevronRight)`
  cursor: pointer;
`;

function DateNavigationBar({ selectedDate, setSelectedDate }) {
  const formattedDate = selectedDate.toISOString().slice(0, 10);

  const handleDateChange = (action) => {
    const currentDate = new Date(selectedDate);
    let updatedDate;
    if (action === "INCREMENT") {
      updatedDate = currentDate.setDate(currentDate.getDate() + 1);
    } else if (action === "DECREMENT") {
      updatedDate = currentDate.setDate(currentDate.getDate() - 1);
    } else {
      updatedDate = new Date();
    }
    setSelectedDate(new Date(updatedDate));
  };

  return (
    <Root>
      <PrevDate onClick={() => handleDateChange("DECREMENT")} />
      {formattedDate}
      <NextDate onClick={() => handleDateChange("INCREMENT")} />
    </Root>
  );
}

DateNavigationBar.propTypes = {
  selectedDate: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.string,
  ]),
  setSelectedDate: PropTypes.func.isRequired,
};

export default DateNavigationBar;
