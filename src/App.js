import React, {useState, useEffect} from 'react';
import Container from '@material-ui/core/Container';
import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import HomeScreen from './screens/homeScreen/HomeScreen';
import './App.scss';
import LoginScreen from './screens/loginScreen/LoginScreen';
import {Switch, Route, Redirect, useHistory} from 'react-router-dom';
import { useSelector } from 'react-redux';
import WatchScreen from './screens/watchScreen/WatchScreen';
import SearchScreen from './screens/SearchScreen';


const Layout = ({children})=>{
  const [sidebar, toggleSidebar] = useState(false);

  const handleToggleSidebar = ()=>toggleSidebar(value => !value);

  return (
    <>
      <Header handleToggleSidebar={handleToggleSidebar} />
      <div className="app_container">
        <Sidebar sidebar={sidebar} handleToggleSidebar={handleToggleSidebar} />
        <Container fluid className="app_main">
          {children}
        </Container>
      </div>
    </>
  )
}


function App() {

  const {accessToken, loading} = useSelector(state=>state.auth);


  const history = useHistory();
  useEffect(()=>{
    if(!loading && !accessToken) {
      history.push('/auth')
    }
  },[accessToken, loading, history]);

  return (
      <Switch>
        <Route exact path="/" >
          <Layout>
            <HomeScreen/>
          </Layout>
        </Route>
        <Route path="/auth">
          <LoginScreen/>
        </Route>
        <Route path="/search/:query" >
          <Layout>
            <SearchScreen/>
          </Layout>
        </Route>
        <Route path="/watch/:id" >
          <Layout>
            <WatchScreen/>
          </Layout>
        </Route>
        <Route>
          <Redirect to="/" />
        </Route>
      </Switch>
  );
}

export default App;
