import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Root = styled.div`
  position: relative;
  display: inline-block;
`;

const Content = styled.div`
  position: absolute;
  top: calc(100% + 5px);
  left: 50%;
  transform: translateX(-50%);
  border-radius: 4px;
  padding: 10px;
  visibility: ${({ open }) => (open ? "visible" : "hidden")};
`;

const Popover = ({ children, onClose, setOnClose, trigger }) => {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef(null);

  useEffect(() => {
    if (onClose) {
      setIsOpen(false);
      setOnClose(false);
    }
  }, [onClose, setOnClose]);

  const handleClickOutside = (event) => {
    if (popoverRef.current && !popoverRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const handleEscapeKey = (event) => {
    if (event.key === "Escape") {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  const togglePopover = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Root ref={popoverRef}>
      <div onClick={togglePopover}>{trigger}</div>
      <Content open={isOpen}>{children}</Content>
    </Root>
  );
};

Popover.displayName = "Popover";

Popover.propTypes = {
  children: PropTypes.element.isRequired,
  onClose: PropTypes.bool.isRequired,
  setOnClose: PropTypes.func.isRequired,
  trigger: PropTypes.element.isRequired,
};

export default Popover;
