// import { render, screen } from '@testing-library/react';
// import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });


import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from './Components/Login'; // Adjust the path as necessary
import '@testing-library/jest-dom/extend-expect';

describe('Login Component', () => {
  let setUserMock;

  beforeEach(() => {
    setUserMock = jest.fn();
    render(<Login setUser={setUserMock} />);
  });

  test('renders login form correctly', () => {
    expect(screen.getByPlaceholderText('Enter ID')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Log In/i })).toBeInTheDocument();
  });

  test('shows error message when both fields are empty', () => {
    fireEvent.click(screen.getByRole('button', { name: /Log In/i }));
    expect(screen.getByText('ID field and Password field is empty')).toBeInTheDocument();
  });

  test('shows error message when ID is empty', () => {
    fireEvent.change(screen.getByPlaceholderText('Enter Password'), { target: { value: 'testpassword' } });
    fireEvent.click(screen.getByRole('button', { name: /Log In/i }));
    expect(screen.getByText('ID field is empty')).toBeInTheDocument();
  });

  test('shows error message when password is empty', () => {
    fireEvent.change(screen.getByPlaceholderText('Enter ID'), { target: { value: 'testid' } });
    fireEvent.click(screen.getByRole('button', { name: /Log In/i }));
    expect(screen.getByText('Password field is empty')).toBeInTheDocument();
  });

  test('calls setUser with user data on successful login', async () => {
    const mockFetch = jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ token: 'mockToken', username: 'testuser' }),
      })
    );

    fireEvent.change(screen.getByPlaceholderText('Enter ID'), { target: { value: 'testid' } });
    fireEvent.change(screen.getByPlaceholderText('Enter Password'), { target: { value: 'testpassword' } });
    fireEvent.click(screen.getByRole('button', { name: /Log In/i }));

    // Wait for the async code to finish
    expect(await screen.findByText('Login')).toBeInTheDocument();
    expect(setUserMock).toHaveBeenCalledWith({ token: 'mockToken', username: 'testuser' });

    mockFetch.mockRestore();
  });
});
