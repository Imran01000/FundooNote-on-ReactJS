import logo from './logo.svg';
import './App.css';
import { Button } from '@material-ui/core'
import { AppBar, Toolbar } from '@material-ui/core'
import {BrowserRouter as Routing, Route, Switch} from 'react-router-dom'
import login from './pages/login/login';
import registration from './pages/registration/registration';
import forget_password from './pages/forget-password/forget_password';
import reset_password from './pages/reset-password/reset_password';
import dash_board from './components/dash-board/Dashboard';
import Color from './components/ColorPopper/Color'
import Trash from './components/Trash/Trash'
import ArchiveNotes from './components/Archive/ArchiveNotes'
import Reminder from './components/Reminder/Reminder';
function App() {
  return (
    <Routing>
     <div className="App">
        <Switch>
          <Route exact path="/" component={login}/>   
          <Route  path="/registration" component={registration}/>
          <Route  path="/forgetPassword" component={forget_password}/>
          <Route  path="/resetPassword" component={reset_password}/>
          <Route  path="/dash-board" component={dash_board}/>
          <Route  path="/trash" component={Trash}/>
          <Route  path="/color" component={Color}/>
          <Route  path="/archive" component={ArchiveNotes}/>
          <Route  path="/reminder" component={Reminder}/>
        </Switch>
     </div>
    </Routing>
  );
}

export default App;

