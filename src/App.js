import "./App.css";
import {BrowserRouter, Switch, Route} from "react-router-dom"

import Home from "./views/Home";
import { Navbar } from "./services/Navbar";
import AddMovie from "./views/AddMovie";
import UpdateMovie from "./views/UpdateMovie";
import Movie from "./views/Movie";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path="/" component={() => <Home />} exact />
          <Route path="/addmovie" component={() => <AddMovie />} exact />
          <Route path="/movie/:id" component={() => <Movie />} />
          <Route path="/updatemovie" component={() => <UpdateMovie />} exact />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
