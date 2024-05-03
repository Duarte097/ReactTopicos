import logo from './logo.svg';
import './App.css';
import Contador from './components/Contador';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './AppRoutes';

function App() {
  return (
    <>
      <BrowserRouter>
        <header>Minha App</header>
        <hr/>
        <main>
            <AppRoutes/>
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;
