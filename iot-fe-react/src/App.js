import logo from './logo.svg';
import './App.css';
import AppRoutes from './routes/AppRoutes';
import { BrowserRouter as Router } from 'react-router-dom';
function App() {
  return (
    <Router>
        <div className="App">
          <AppRoutes />
        </div>
      </Router>
  );
}

export default App;
