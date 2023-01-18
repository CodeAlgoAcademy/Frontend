import {render, screen} from '@testing-library/react'
import Index from '../curriculum/index'

test('Curriculum renders correctly', () => {
    render(<Index />)
    const textElement = screen.getByText('Curriculum')
    expect(textElement).toBeInTheDocument()
})
