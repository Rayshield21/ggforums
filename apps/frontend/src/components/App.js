import React, { Component, Fragment } from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
// import { Provider as AlertProvider } from 'react-alert'
import { Provider } from 'react-redux'
// import AlertTemplate from 'react-alert-template-basic'
import ReactDOM from 'react-dom';
import PrivateRoute from './common/PrivateRoute'
import Header from './layout/Header';
import Alerts from './layout/Alerts'
import Login from './accounts/Login';
import Register from './accounts/Register';
import PostList from './posts/PostList';
import PostDetail from './posts/PostDetail'
import Profile from './accounts/profile/Profile'
import store from '../store'
import { loadUser } from '../actions/auth'

class App extends Component {
  componentDidMount(){
    store.dispatch(loadUser)
  } 
  render (){
    return (
      <Provider store={store}>
        {/* <AlertProvider template={AlertTemplate}> */}
          <Router>
            <Fragment>
              <Header/>
              {/* <Alerts/> */}
              <div className="container">
                <Switch>
                  {/* <PrivateRoute exact path='/post/create' component={PostList}/> */}
                  <Route exact path='/' component={PostList} />
                  <Route exact path='/login' component={Login} />
                  <Route exact path='/register' component={Register} />
                  <Route exact path='/profile/:username' component={Profile} />
                  <Route exact path='/posts/:id' component={PostDetail} />
                </Switch>
              </div>
            </Fragment>
          </Router>
        {/* </AlertProvider> */}
      </Provider> 
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'))