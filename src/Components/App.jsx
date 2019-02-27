import React, { Component } from 'react';
import './../Cssy/App.css';
import Header from "./Header.jsx"
import Main from "./Main.jsx"
import FormComponentPlace from "./FormComponentPlace.jsx"
import FormComponentDate from "./FormComponentDate.jsx"


class App extends Component {
  render() {
    return (<div>
      <Header></Header>
      <Main></Main>
      <FormComponentPlace></FormComponentPlace>
      <FormComponentDate></FormComponentDate>
    </div>
    );
  }
}

export default App;
