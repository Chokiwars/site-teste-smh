import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import ProposalEngine from './pages/proposal-engine';
import Header from "components/ui/Header";
import Homepage from './pages/homepage/PaginaHome';
import SobreNos from "./pages/SobreNos/SobreNos";
import FormularioPedidosClientes from "pages/FormularioPedidosClientes/FormularioPedidosClientes";
import ServicesPage from './pages/Servicos/Servicos';
import Solucoes from "pages/Solucoes/Solucoes";
import LoginClientes from './pages/LoginClientes/LoginClientes';
import Clientes from "./pages/NossosClientes/NossosClientes";
import CadastroClientes from "pages/CadastroClientes/CadastroClientes";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <Header />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<Homepage />} />
        <Route path="/proposal-engine" element={<ProposalEngine />} />
        <Route path="/formulario-pedidos-clientes" element={<FormularioPedidosClientes/>} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/sobre-nos" element={<SobreNos />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/solucoes" element={<Solucoes />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/login-clientes" element={<LoginClientes />} />
        <Route path="/cadastro-clientes" element={<CadastroClientes />} />

        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
