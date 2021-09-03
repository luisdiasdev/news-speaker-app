import React from 'react'
import { HashRouter, Route } from 'react-router-dom'

import Main from '../pages/Main'

export const Router: React.FC = () => {
  return (
    <HashRouter>
      <Route exact path='/'>
        <Main />
      </Route>
    </HashRouter>
  )
}
