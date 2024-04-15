import PropTypes from "prop-types";
import { useState } from "react";
import styled from "styled-components";

const Root = styled.div`
  display: flex;
  align-items: flex-start;
`;

const CheckBoxInput = styled.input`
  -webkit-appearance: none;
  appearance: none;
  width: 1.6em;
  height: 1.6em;
  border-radius: 0.15em;
  margin-right: 0.5em;
  border: 0.15em solid var(--accent-color);
  outline: none;
  cursor: pointer;
  z-index: -1;

  &:checked {
    background-color: var(--accent-color);
    position: relative;
  }

  &:checked::before {
    content: "✓";
    font-size: 1.5em;
    color: #fff;
    position: absolute;
    right: 1px;
    top: -3px;
  }

  &:hover {
    box-shadow: 0 0 20px var(--accent-color);
  }
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  text-decoration: ${(p) => (p.checked ? "line-through" : "none")};
`;

function CheckBoxItem({ label, onCheck, checked }) {
  const [isChecked, setIsChecked] = useState(checked);

  const toggleIsChecked = () => {
    onCheck();
    setIsChecked(!isChecked);
  };

  return (
    <Root>
      <Label checked={isChecked}>
        <CheckBoxInput
          type="checkbox"
          checked={isChecked}
          onChange={toggleIsChecked}
        />
        <span>{label}</span>
      </Label>
    </Root>
  );
}

CheckBoxItem.propTypes = {
  label: PropTypes.string.isRequired,
  onCheck: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
};

export default CheckBoxItem;
