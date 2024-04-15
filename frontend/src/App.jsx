import styled from "styled-components";
import { useEffect, useState } from "react";
import TopBar from "./components/TopBar";
import Header from "./components/Header";
import { RotateCcw, Copyright, Github } from "lucide-react";
import CreateScedoBar from "./components/CreateSchedoBar";
import SchedoList from "./components/SchedoList";

const ResetDate = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

// Total viewport height - footer height
const AppLayout = styled.div`
  min-height: calc(100vh - 40px);
`;

const Footer = styled.div`
  position: relative;
  left: 0;
  bottom: -2px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.9rem;
  color: #31363f;
`;

// Time stamps are stored in this format -> ISO 8601 format
// Making data hardcoded for now

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [schedos, setSchedos] = useState([]);

  useEffect(() => {
    const schedosData = JSON.parse(localStorage.getItem("schedos"));
    if (schedosData && schedosData.length !== 0) {
      setSchedos(schedosData);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("schedos", JSON.stringify(schedos));
  }, [schedos]);

  return (
    <>
      <AppLayout>
        {/* TODO: Style thos differently */}
        <TopBar />

        <ResetDate onClick={() => setSelectedDate(new Date())}>
          Get to today
          <RotateCcw />
        </ResetDate>

        <Header
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          schedos={schedos}
        />

        <CreateScedoBar
          schedos={schedos}
          setSchedos={setSchedos}
          selectedDate={selectedDate}
        />

        {schedos.length > 0 && (
          <SchedoList
            schedos={schedos}
            setSchedos={setSchedos}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        )}
      </AppLayout>
      {/* TODO: Github is deprecated in lucide find alternatives, 
      style footer differently */}
      <Footer>
        <Copyright size={20} /> &nbsp; 2024 Krishna Teja &nbsp; &nbsp;
        <Github sze={20} /> &nbsp; Krishna-anhsirk
      </Footer>
    </>
  );
}

export default App;
