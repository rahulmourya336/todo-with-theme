import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { HeaderStyle } from "../../styles";
import ToggleTheme from "../ToggleTheme";

const Header = ({ theme, toggleTheme }) => {
  return (
    <HeaderStyle>
      <FontAwesomeIcon icon={faCheckCircle} size="2x" />
      TODO Application
      <ToggleTheme theme={theme} toggleTheme={toggleTheme}/>
    </HeaderStyle>
  );
};

export default Header;
