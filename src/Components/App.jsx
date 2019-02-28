import React, { Component } from 'react';
import './../Cssy/App.css';
import Header from "./Header.jsx"
import Main from "./Main.jsx"
import FormComponent from "./FormComponent";

class App extends Component {
  render() {
    return (<div className="all">
      <Header></Header>
      <Main></Main>
      <FormComponent></FormComponent>
    </div>
    );
  }
}

export default App;
