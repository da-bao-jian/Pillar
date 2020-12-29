import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch, Route } from 'react-router-dom';
import Modal from "./modal/modal";
import MainPage from './main/main_page';
import ChatBox from './chat/chat_box_container';
import DashBoard from './chat/dashboard';
import SplashPageContainer from './splash/splash_page_container';
import SideBar from './chat/side_bar_container';

const App = () => (
  <div>
    <Modal />
    {/* <Route path="/" component={SideBar} /> */}
    {/* <SideBar /> */}
    <Switch>
{/* <<<<<<< HEAD
        <AuthRoute exact path="/login" component={LoginFormContainer} />
        <AuthRoute exact path="/signup" component={SignupFormContainer} />
        <AuthRoute exact path="/" component={MainPage} />
        <ProtectedRoute exact path="/chat" component={DashBoard} /> 
======= */}
      {/* <Route exact path="/" component={MainPage} /> */}
      <AuthRoute exact path="/" component={SplashPageContainer} />
      <Route exact path="/chat" component={DashBoard} />
    </Switch>
  </div>
)

export default App;