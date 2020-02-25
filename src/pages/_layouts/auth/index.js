import React from 'react'
import { element } from 'prop-types'

import { Wrapper } from './styles'

const AuthLayout = ({ children }) => {
  return <Wrapper>{children}</Wrapper>
}

AuthLayout.propTypes = {
  children: element.isRequired,
}

export default AuthLayout
