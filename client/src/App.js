import './App.css';
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from './components/Landing'
import Signup from './components/Signup';
import BlackjackTable from './components/BlackJackTable';


function App() {
  return (
    <div className="App">
      <Router>
          <Switch>

              <Route exact path='/'>
                <Landing />
              </Route>

              <Route exact path='/signup'>
                <Signup />
              </Route>

              <Route exact path='/table'>
                <BlackjackTable />
              </Route>

          </Switch>
      </Router>
    </div>
  );
}

export default App;
