import styled from "styled-components";
import logo from "../assets/schedo-logo.png";

const Root = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0rem 1rem;
  align-items: center;
  color: var(--accent-color);
  font-size: 2rem;
`;

const Logo = styled.img`
  width: 175px;
`;

function TopBar() {
  return (
    <Root>
      <Logo src={logo} alt="Schedo Logo" />
    </Root>
  );
}

export default TopBar;
