import PropTypes from "prop-types";
import styled from "styled-components";
import DateNavigationBar from "./DateNavigationBar";
import moment from "moment";

const Root = styled.div`
  display: flex;
  justify-content: center;
  margin: 1rem;
`;

const HeaderCard = styled.div`
  min-width: 300px;
  padding: 1rem;
  border: 1px solid var(--accent-color);
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const ProgressIndicator = styled.div`
  width: 75px;
  height: 75px;
  border-radius: 50%; /* Makes it a circle */
  background-color: #007bff; /* Adjust the color as needed */
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
`;

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function Header({ selectedDate, setSelectedDate, schedos }) {
  const schedosOfToday = schedos.filter(
    (schedo) =>
      schedo.due_date.slice(0, 10) ===
      moment(selectedDate).format().slice(0, 10)
  );

  const completedSchedos = schedosOfToday.filter(
    (schedo) => schedo.done !== null
  );
  const incompleteSchedos = schedosOfToday.filter(
    (schedos) => schedos.done === null
  );

  return (
    <Root>
      <HeaderCard>
        <Inner>
          SCHEDOS DONE
          <DateNavigationBar
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </Inner>
        <ProgressIndicator>{`${completedSchedos.length}/${incompleteSchedos.length}`}</ProgressIndicator>
      </HeaderCard>
    </Root>
  );
}

Header.propTypes = {
  selectedDate: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.string,
  ]),
  setSelectedDate: PropTypes.func.isRequired,
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
};

export default Header;
