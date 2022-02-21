import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('when everything is OK', () => {
  
  test('should render the App component without crashing', () => {
    render(<App />);
    screen.debug();
  })
// Testeamos que exista o no una palabra en el documento con try & catch
  // test('should select the children that is being passed to the CustomInput component', () => {
  //   render(<App />);
  //   screen.getByText('Input:');
  //   let error;
  //   try {
  //     screen.getByText('Input')
  //   } catch(err) {
  //     error = err;
  //   }
  //   expect(error).toBeDefined();
  // })

  test('should select the children that is being passed to the CustomInput component', () => {
    render(<App />);
    screen.getByText('Input:');
//  screen.getByText(/Input/);
//  Podemos poner una regular expression en vez de un string
  })

});
