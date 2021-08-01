import { Route,BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.css';
import Entry from './Components/Entry/Entry.jsx'
import Home from './Components/Home/Home';

function App() {
  return (
    <div className="App">
      <Router >
        <Switch>
          <Route exact path = "/" component = {Entry}></Route>
          <Route exact path = "/login" component = {Entry}></Route>
          <Route exact path = "/home" component = {Home}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
