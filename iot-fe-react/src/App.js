import logo from './logo.svg';
import './App.css';
import AppRoutes from './routes/AppRoutes';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './elements/Header';
function App() {
  return (
    <Router>
        <div className="App">
          <Header />
          <AppRoutes />
        </div>
      </Router>
  );
}

export default App;
