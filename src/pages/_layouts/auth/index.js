import React from 'react'
import { element } from 'prop-types'

import { Wrapper, Content } from './styles'

const AuthLayout = ({ children }) => {
  return (
    <Wrapper>
      <Content>{children}</Content>
    </Wrapper>
  )
}

AuthLayout.propTypes = {
  children: element.isRequired,
}

export default AuthLayout
