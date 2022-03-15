import React from 'react';
import { findByText, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { getUser } from './get-user';
import { mocked } from 'jest-mock';

jest.mock('./get-user');
const mockGetUser = mocked(getUser, true);

// describe es lo que se ve como "Test Suites" y los "Test" son los test dentro de los describe
describe('when everything is OK', () => {
  beforeEach(async() => {  // Con beforeEach podemos evitar repetir el render(<componente/>)
    render(<App/>);
    await waitFor(() => expect(mockGetUser).toHaveBeenCalled());
  })
  //test('should render the App component without crashing', () => {
    // render(<App />); con beforeEach nos ahorramos repetir esta línea
    // screen.debug(); //El debug sirve para imprimir todo lo que se pase al test en la consola para buscar errores en los test
  //})
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

  // Podemos usar "it" (se usa mas en units) en vez de test
  test('should select the children that is being passed to the CustomInput component', () => {
    // render(<App />); con beforeEach nos ahorramos repetir esta línea
    // screen.getByText('Input:');
    screen.getAllByText('Input:'); //Debemos usar el All porque duplicamos el input, por ende debe buscar varios elementos, no solo uno.
//  screen.getByText(/Input/);
//  Podemos poner una regular expression en vez de un string
  })
  it('should select the children that is being passed to the CustomInput component', () => {
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
    // Es mucho mejor guardar la informacion a testear dentro de una variable, para que se lea mucho más ágil y simple. DONT REPEAT YOURSELF(DRY). Creamos una variable y luego si queremos cambiar la info, solo será UNA VEZ.
    const textbox = screen.getAllByRole('textbox'); //También debemos usar All aquí
    // expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(textbox[0]).toBeInTheDocument(); //Recibirá un array de inputs, por eso necesitamos especificar una posicion para testear.
    // expect(screen.getAllByRole('textbox')[1]).toBeInTheDocument(); //Este test ya no funcionará porque borramos el input duplicado
    // expect(screen.getAllByRole('textbox').length).toEqual(2); //Este test tampoco funcionará porque ahora solo hay 1 input
    expect(textbox.length).toEqual(1);
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

describe("When the user enter some text in the input element", () => {
  test('should display the text in the screen', async () => {
    render(<App/>);
    await waitFor(() => expect(mockGetUser).toHaveBeenCalled());

    expect(screen.getByText(/You typed: .../));

    // fireEvent.change(screen.getByRole('textbox'), {
    //   target: { value: 'David'},
    // });

    await userEvent.type(screen.getByRole('textbox'), 'David')

    expect(screen.getByText(/You typed: David/));
  });
});