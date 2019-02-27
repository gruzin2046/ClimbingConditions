import React, { Component } from 'react';
import './../Cssy/App.css';
import Header from "./Header.jsx"
import Main from "./Main.jsx"
import FormComponent from "./FormComponent.jsx"


class App extends Component {
  render() {
    return (<div>
      <Header></Header>
      <Main></Main>
      <FormComponent></FormComponent>
    </div>
    );
  }
}

export default App;
