import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Toggleable from './Toggleable'

describe('<Toggleable />', () => {
  let container

  beforeEach(() => {
    container = render(
      <Toggleable buttonLabel="show..." >
        <div className="testDiv">
          togglable content
        </div>
      </Toggleable>
    ).container
  })

  test('renders its children', async () => {
    await screen.findAllByText('togglable content')
  })

  test('at beginning, children are not shown', () => {
    const div = container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })

  test('after clicking the button, children are displayed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('show...')
    await user.click(button)

    const div = container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })

  test('toggleable content can be closed', async () => {
    const user = userEvent.setup()
    const openButton = screen.getByText('show...')
    user.click(openButton)

    const closeButton = screen.getByText('cancel')
    user.click(closeButton)

    const div = container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })

})
