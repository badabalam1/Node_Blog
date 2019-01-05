import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ListPage, EditorPage, PostPage, LoginPage } from '../pages'

const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={ListPage} />
        <Route path='/editor' component={EditorPage} />
        <Route path='/post/:id' component={PostPage} />
        <Route path='/Login' component={LoginPage} />
      </Switch>
    </div>
  )
}

export default App