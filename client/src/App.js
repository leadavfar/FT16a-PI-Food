/* import './App.css'; */
import "./global.css";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import LandingPage from "./components/LandingPage.jsx";
import Home from "./components/Home.jsx";
import CreateRecipe from "./components/CreateRecipe.jsx"
import Detail from "./components/Detail";

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path= "/" component= {LandingPage}/>
        <Route exact path = "/home" component= {Home}/>
        <Route path = "/Recipe" component= {CreateRecipe}/>
        <Route path = "/home/:id" component= {Detail}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
