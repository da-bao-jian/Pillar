import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch, Route } from 'react-router-dom';
import NavBarContainer from './nav/navbar_container';
import Modal from "./modal/modal";
import MainPage from './main/main_page';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';
import ChatBox from './chat/chat_box_container';
import DashBoard from './chat/dashboard';
import SplashPageContainer from './splash/splash_page_container';

const App = () => (
  <div>
    <Modal />
    <ProtectedRoute path="/" component={NavBarContainer} />
    <Switch>
        <Route exact path="/chat" component={DashBoard} /> 
        <Route exact path="/" component={MainPage} />
        <AuthRoute path="/" component={SplashPageContainer} />
    </Switch>
  </div>
);

export default App;