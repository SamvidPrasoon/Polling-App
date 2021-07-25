import React from 'react';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import Login from './components/login2'
import Register from './components/register'
import Landing from './components/landingv2';
import './App.css';
import AuthState from './authcontext/authstate'
import PollState from './pollcontext/pollstate';
import Main from './components/main'
function App() {
  return (
    <AuthState>
    <PollState>
    <div className="App">
    <Router>
    <Switch>
        <Route exact path='/' component={Landing}/>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/register' component={Register}/> 
        <Route exact path='/main' component={Main}/> 
      
    </Switch>
</Router>
    </div>
    </PollState>
    </AuthState>
  );
}

export default App;
