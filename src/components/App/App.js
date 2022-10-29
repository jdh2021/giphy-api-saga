import React from 'react';
import { HashRouter as Router, Route } from "react-router-dom";
import Search from '../Search/Search';
import Favorites from '../Favorites/Favorites';


function App(props) {
  return (
    <Router>
      <div>
        <h1>Giphy Search!</h1>
        <Route exact path='/'>
          <Search />
        </Route>
        <Route exact path='/favorites'>
          <Favorites />
        </Route>
      </div>
    </Router>
  );
}

export default App;
