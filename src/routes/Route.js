import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { bool, element, func, oneOfType } from 'prop-types'

import AuthLayout from '~/pages/_layouts/auth'
import DefaultLayout from '~/pages/_layouts/default'
import { store } from '~/store'

const RouteWrapper = ({ component: Component, isPrivate, ...rest }) => {
  const { signed } = store.getState().auth
  if (!signed && isPrivate) {
    return <Redirect to="/" />
  }

  if (signed && !isPrivate) {
    return <Redirect to="/dashboard" />
  }

  const Layout = signed ? DefaultLayout : AuthLayout

  return (
    <Route
      {...rest}
      render={props => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
    />
  )
}

RouteWrapper.propTypes = {
  component: oneOfType([element, func]).isRequired,
  isPrivate: bool,
}

RouteWrapper.defaultProps = {
  isPrivate: false,
}

export default RouteWrapper
