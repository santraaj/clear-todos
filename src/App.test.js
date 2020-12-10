import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import TodoTable from './TodoTable';
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test('renders todotable', () => {
  const row = [
    {desc: 'Go to coffee', date: '9.12.2020'}
  ]

  const todotable = render(<TodoTable todos={row} />);
  expect(todotable.container).toHaveTextContent('Go to coffee');
})

test('add todo', () => {
  const { container, getByText, getByPlaceholderText } = render(<App />);

  const desc = getByPlaceholderText('Description');
  fireEvent.change(desc, { target: { value: 'Go to coffee' } })

  const date = getByPlaceholderText('Date');
  fireEvent.change(date, { target: { value: '9.12.2020'} }); 

  const button = getByText('Add');
  fireEvent.click(button);

  expect(container).toHaveTextContent('Go to coffee');

  const button2 = getByText('Clear');
  fireEvent.click(button2);

  expect(container).not.toHaveTextContent('');
})


