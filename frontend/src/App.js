import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'

import Navbar from './components/Navbar'
import Landing from './components/Landing'
import TodoList from './components/TodoList'


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar /> 
          <Route exact path="/" component={Landing} />
          <div className="container-fluid">
            <Route exact path="/todo-list" component={TodoList} />
          </div>
      </div>
    </Router>
  );
}

export default App;
