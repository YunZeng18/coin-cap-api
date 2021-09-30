import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CryptoList from "./component/CryptoList";
import Crypto from "./component/Crypto";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={CryptoList} />
        <Route path="/:coinId" component={Crypto} />
      </Switch>
    </Router>
  )
}