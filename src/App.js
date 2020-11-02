import React from "react";
import { Link } from "react-router-dom";

import { Form } from "./Form";

import { ThemeProvider } from "theme-ui";
import { theme } from "./theme";

export default class App extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Form />
      </ThemeProvider>
    );
  }
}
