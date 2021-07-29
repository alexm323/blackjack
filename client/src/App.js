import './App.css';
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from './components/Landing'


function App() {
  return (
    <div className="App">
      <Router>
          <Switch>
              <Route exact path='/'>
                <Landing />
              </Route>
          </Switch>
      </Router>
    </div>
  );
}

export default App;
