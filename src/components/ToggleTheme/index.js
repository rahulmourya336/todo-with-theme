import React from "react";
import { PositionThemeButton } from "../../styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

const ToggleTheme = ({ theme, toggleTheme }) => {
  return (
    <PositionThemeButton>
      <input
        type="checkbox"
        className="checkbox"
        id="checkbox"
        onChange={toggleTheme}
        checked={theme === "dark" ? false : true}
      />
      <label htmlFor="checkbox" className="label">
        <FontAwesomeIcon icon={faMoon} color="grey" />
        <FontAwesomeIcon icon={faSun} color="yellow" />
        <div className="ball"></div>
      </label>
    </PositionThemeButton>
  );
};

export default ToggleTheme;
