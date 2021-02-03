
import Annotator from './components/Annotator'
import { Fragment } from 'react';
import { Route, Switch, BrowserRouter } from "react-router-dom";
import { createBrowserHistory } from "history";


var hist = createBrowserHistory();

function App() {
  return (
    <Fragment>
    <BrowserRouter history={hist}>
    <Switch>
    <Route path="/" component={Annotator} />
    </Switch>
    </BrowserRouter>
    </Fragment>
  );
}

export default App;
