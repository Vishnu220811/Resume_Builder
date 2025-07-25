import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import ResumeForm from './components/ResumeForm';

import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/form" element={<ResumeForm />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
