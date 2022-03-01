import React from 'react';
import { findByText, render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { getUser } from './get-user';
import { mocked } from 'jest-mock';

jest.mock('./get-user');
const mockGetUser = mocked(getUser, true);

describe('when everything is OK', () => {
  beforeEach(async() => {  // Con beforeEach podemos evitar repetir el render(<componente/>)
    render(<App/>);
    await waitFor(() => expect(mockGetUser).toHaveBeenCalled());
  })
  test('should render the App component without crashing', () => {
    // render(<App />); con beforeEach nos ahorramos repetir esta línea
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
    // render(<App />); con beforeEach nos ahorramos repetir esta línea
    // screen.getByText('Input:');
    screen.getAllByText('Input:'); //Debemos usar el All porque duplicamos el input, por ende debe buscar varios elementos, no solo uno.
//  screen.getByText(/Input/);
//  Podemos poner una regular expression en vez de un string
  })

  test('should select the input element by its role', () => {
    // render(<App />); con beforeEach nos ahorramos repetir esta línea
    // textbox equivale al role del input
    // screen.getByRole('textbox'); 
    screen.getAllByRole('textbox'); //También debemos usar All aquí
    // expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getAllByRole('textbox')[0]).toBeInTheDocument(); //Recibirá un array de inputs, por eso necesitamos especificar una posicion para testear.
    expect(screen.getAllByRole('textbox')[1]).toBeInTheDocument();
    expect(screen.getAllByRole('textbox').length).toEqual(2);
  })

  test('should select a label element by its text', () => {
    // render(<App />); con beforeEach nos ahorramos repetir esta línea
    screen.getByLabelText('Input:'); //Aquí no es necesario usar All porque react library solo leerá una label
  })

  test('should select input element by placeholder test', () => {
    // render(<App />); con beforeEach nos ahorramos repetir esta línea
    // screen.getByPlaceholderText('Example');
    screen.getAllByPlaceholderText('Example'); //Aquí también debemos usar All
  })

  test('should select the input element by its role with queryByRole', () => {
    const result = screen.queryByRole('textbox');
    //console.log(result); //El resultado será null
  })

  test('should return null, should not find the role "whatever" in our component', () => {
    expect(screen.queryByRole('whatever')).toBeNull();
  })
});

describe('when the component fetches the user successfully', () => {
  beforeEach(() => {
    mockGetUser.mockClear();
  })

  test('should call getUser once', async () => {
    render(<App/>);
    await waitFor(() => expect(mockGetUser).toHaveBeenCalledTimes(1));
  })

  test('should render the username passed', async () => {
    const name = 'John';
    // mockGetUser.mockImplementationOnce(() =>
    //   Promise.resolve({ id: '1', name })
    // );
    mockGetUser.mockResolvedValueOnce({ id: '1', name });
    render(<App/> );
    expect(screen.queryByText(/UserName/)).toBeNull();
    expect(await screen.findByText(/Username/)).toBeInTheDocument();
    expect(await screen.findByText(`Username: ${name}`)).toBeInTheDocument();
  })
});
