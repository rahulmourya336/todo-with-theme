import { ThemeProvider } from "styled-components";
import Header from "./components/Header";
import Todo from "./components/Todo";
import { useDarkMode } from "./hooks/useDarkMode";
import { Wrapper } from "./styles";
import { darkTheme, lightTheme } from "./utils/theme.config";

function App() {
  const [theme, toggleTheme, componentMounted] = useDarkMode();
  const themeMode = theme === "light" ? lightTheme : darkTheme;

  if (!componentMounted) return <div />;

  return (
    <ThemeProvider theme={themeMode}>
      <Wrapper>
        <Header theme={theme} toggleTheme={toggleTheme} />
        <Todo />
      </Wrapper>
    </ThemeProvider>
  );
}

export default App;
