import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './componentes/Login/Login';
import RegistroDoc from './componentes/RegistroDoc/RegistroDoc';
import Scaner from './componentes/Scaner/Scaner';
import Extrae from './componentes/RegistroDoc/Extrae';
import Panel from './componentes/Panel/Panel';
import StatuDoc from './componentes/StatuDoc/StatuDoc';
import FileUpload from './componentes/Grid/FileUpload';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/registro" element={<RegistroDoc />} />
                <Route path="/scan/docuement" element={<Scaner />} />
                <Route path="/extrae" element={<Extrae />} />
                <Route path="/panel" element={<Panel />} />
                <Route path="/document-status" element={<StatuDoc />} />
                <Route path="/file-upload" element={<FileUpload />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
