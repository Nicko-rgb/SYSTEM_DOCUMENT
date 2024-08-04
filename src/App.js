import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './componentes/Login/Login';
import RegistroDoc from './componentes/RegistroDoc/RegistroDoc';
import Scaner from './componentes/Scaner/Scaner';
import Panel from './componentes/Panel/Panel';
import StatuDoc from './componentes/StatuDoc/StatuDoc';
import RegistroAdmin from './componentes/RegistroAdmin/RegistroAdmin';
import ResetPassword from './componentes/Resetpass/ResetPassword';
import NewPassword from './componentes/Resetpass/NewPassword';
import { AuthProvider } from './componentes/Complementos/Autenticacion';

function App() {
    return (
        <AuthProvider >
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/registro" element={<RegistroDoc />} />
                    <Route path="/scan/docuement" element={<Scaner />} />
                    <Route path="/panel" element={<Panel />} />
                    <Route path="/document-status" element={<StatuDoc />} />
                    <Route path='/register/admin' element={<RegistroAdmin />} />
                    <Route path='/reset-password' element={<ResetPassword />} />
                    <Route path='/new-password/:token' element={<NewPassword />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
