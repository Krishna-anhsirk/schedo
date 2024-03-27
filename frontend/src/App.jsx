import styled from "styled-components";
import TodoList from "./components/TodoList";

const Root = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

// Time stamps are stored in this format -> ISO 8601 format
// Making data hardcoded for now
const todoEntries = [
  {
    id: 1,
    title: "Pick up groceries",
    description: `
      List of groceries basically
      1. Aloo (1kg)
      2. Tomato (2kg)
      3. Onion (3kg)
      `,
    done: false, // Boolean
    date_due: "some date string",
    date_created: "2024-03-26T15:30:00.000Z",
    date_updated: "some date string",
    date_deleted: "some date string",
  },
  {
    id: 2,
    title: "Start packing essentials for trip",
    description: `
      List
      1. Soap (1)
      2. Gifts I bought for parents
      3. Sweets (5 boxes)
      `,
    done: false, // Boolean
    date_due: "some date string",
    date_created: "2024-03-27T15:30:00.000Z",
    date_updated: "some date string",
    date_deleted: "some date string",
  },
  {
    id: 3,
    title: "Complete reading the novel",
    description: null,
    done: false, // Boolean
    date_due: "some date string",
    date_created: "2024-03-28T15:30:00.000Z",
    date_updated: "some date string",
    date_deleted: "some date string",
  },
];

function App() {
  return (
    <Root>
      <div>Start coding!</div>
      <TodoList todos={todoEntries} />
    </Root>
  );
}

export default App;
