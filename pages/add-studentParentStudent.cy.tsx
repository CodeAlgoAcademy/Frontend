import React from 'react'
import ParentStudent from './add-student'

describe('<ParentStudent />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ParentStudent />)
  })
})