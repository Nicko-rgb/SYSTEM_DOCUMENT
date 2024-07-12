import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './componentes/Login/Login';
import Panel from './componentes/Panel/Panel';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/panel" element={<Panel />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
