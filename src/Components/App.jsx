import React, { Component } from 'react';
import './../Cssy/App.css';
import Header from "./Header.jsx"
import Main from "./Main.jsx"
import FormComponent from "./FormComponent";

class App extends Component {
  render() {
    return (
      <div className="all">
        <div>
          <Header></Header>
          <Main></Main>
          <FormComponent></FormComponent>
        </div>
        {/* <div className='foot'>
          <p>Made by Albert Łuniewicz. <span>All righst reseved</span></p>
        </div> */}
      </div>
    );
  }
}

export default App;
