import PropTypes from "prop-types";
import styled from "styled-components";
import CheckBoxItem from "./CheckBoxItem";
import { Trash2 } from "lucide-react";
import moment from "moment";

const Root = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 3rem;
`;

const Inner = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  max-width: 300px;
`;

const SchedoCard = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0.5rem;
  padding: 1rem;
  min-width: 300px;
  border: 1px solid ${(p) => (p.color ? p.color : "var(--accent-color)")};
  border-radius: var(--accent-radius);
`;

const DeleteButton = styled(Trash2)`
  cursor: pointer;
`;

const SectionTitle = styled.h2`
  text-align: left;
  margin-left: -9.5rem;
`;

function SchedoList({ schedos, setSchedos, selectedDate }) {
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

  const handleDelete = (id) => {
    const updatedSchedos = schedos.filter((schedo) => schedo.id !== id);
    setSchedos(updatedSchedos);
  };

  const onCheck = (id) => {
    const updatedSchedos = schedos.map((schedo) => {
      if (schedo.id === id) {
        return { ...schedo, done: schedo.done ? null : new Date() };
      }
      return schedo;
    });
    setSchedos(updatedSchedos);
  };

  return (
    <Root>
      <Inner>
        {incompleteSchedos.map((schedo) => (
          <SchedoCard key={schedo.id} color={schedo.color}>
            <CheckBoxItem
              label={schedo.title}
              onCheck={() => onCheck(schedo.id)}
              checked={schedo.done ? true : false}
            />
            <DeleteButton onClick={() => handleDelete(schedo.id)} />
          </SchedoCard>
        ))}

        {completedSchedos.length > 0 && (
          <SectionTitle>Completed Tasks</SectionTitle>
        )}
        {completedSchedos.map((schedo) => (
          <SchedoCard key={schedo.id} color={schedo.color}>
            <CheckBoxItem
              label={schedo.title}
              onCheck={() => onCheck(schedo.id)}
              checked={schedo.done ? true : false}
            />
            <DeleteButton onClick={() => handleDelete(schedo.id)} />
          </SchedoCard>
        ))}
      </Inner>
    </Root>
  );
}

SchedoList.propTypes = {
  selectedDate: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.string,
  ]),
  setSchedos: PropTypes.func.isRequired,
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

export default SchedoList;
