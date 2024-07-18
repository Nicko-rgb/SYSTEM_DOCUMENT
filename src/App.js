import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './componentes/Login/Login';
import RegistroDoc from './componentes/RegistroDoc/RegistroDoc';
import Scaner from './componentes/Scaner/Scaner';
import Extrae from './componentes/RegistroDoc/Extrae';
import Panel from './componentes/Panel/Panel';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/registro" element={<RegistroDoc />} />
                <Route path="/scan/docuement" element={<Scaner />} />
                <Route path="/extrae" element={<Extrae />} />
                <Route path="/panel" element={<Panel />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
