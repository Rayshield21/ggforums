import React, { Component, Fragment } from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom';
import PostRoute from './common/PostRoute'
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
                  <Route key='list' exact path='/' component={PostList} />
                  <Route key='detail' exact path='/posts/:id' component={PostList} />
                  <Route exact path='/login' component={Login} />
                  <Route exact path='/register' component={Register} />
                  <Route exact path='/profile/:username' component={Profile} />
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