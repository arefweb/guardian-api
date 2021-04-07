import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Components/Home";
import About from "./Components/About";
import Post from "./Components/Post";
import Error from "./Components/Error";
import Navbar from "./Components/Navbar";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { reducer, initialStore } from "./reducer";

const store = createStore(reducer, initialStore);

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/post/:id+">
            <Post />
          </Route>
          <Route path="*">
            <Error />
          </Route>
        </Switch>

      </Router>
    </Provider>
  );
}

export default App
