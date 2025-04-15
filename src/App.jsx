// import './App.css';
import Read from './components/read'
import Home from './components/Home'
import Update from './components/update'
import Create from './components/create'
import { BrowserRouter , Routes , Route } from 'react-router-dom';



function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route exact path='/' element={<Home/>} />
    <Route exact path='/read' element={<Read/>} />
    <Route exact path='/create' element={<Create/>} />
    <Route exact path='/update' element={<Update/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
