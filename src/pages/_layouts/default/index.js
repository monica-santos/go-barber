import React from 'react'
import { element } from 'prop-types'

import { Wrapper } from './styles'
import { Header } from '~/components/Header'

const DefaultLayout = ({ children }) => {
  return (
    <Wrapper>
      <Header />
      {children}
    </Wrapper>
  )
}

DefaultLayout.propTypes = {
  children: element.isRequired,
}

export default DefaultLayout
