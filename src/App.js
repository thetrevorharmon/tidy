import React from "react";
import { Link } from "react-router-dom";

import { ThemeProvider } from "theme-ui";
import theme from "./theme";

export default class App extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <h1>Home page</h1>
        <Link to="/profile">Go back to profile</Link>
        <div>
          <img src="https://www.bestsadstatus.com/wp-content/uploads/2019/09/whatsapp-dp-for-girls-6.jpg"></img>
        </div>
      </ThemeProvider>
    );
  }
}
