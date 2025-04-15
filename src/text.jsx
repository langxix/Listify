import './App.css';
import Create from './components/create';
import Read from './components/read';
import Update from './components/update';
import Home from './components/Home'; // Import the Home component
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';


function App() {
  return (
    <Router>
      <div className='main'>
        <h2 className='main-header'>React CRUD Operations</h2>
        
        {/* Navigation Bar */}
        <nav className='nav'>
          <ul className='nav-links'>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/create'>Create</Link></li>
            <li><Link to='/read'>Read</Link></li>

          </ul>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/create' element={<Create />} />
          <Route path='/read' element={<Read />} />
          <Route path='/update' element={<Update />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
