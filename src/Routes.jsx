import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import ProposalEngine from './pages/proposal-engine';
import Homepage from './pages/homepage';
import Header from "components/ui/Header";
import FormularioPedidosFuncionarios from "pages/FormularioPedidosFuncionarios/FormularioPedidosFuncionarios";
import FormularioPedidosClientes from "pages/FormularioPedidosClientes/FormularioPedidosClientes";
import ServicesPage from './pages/services';
import LoginClientes from './pages/LoginClientes';
import Clientes from "./pages/NossosClientes";


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
        <Route path="/formulario-pedidos-funcionarios" element={<FormularioPedidosFuncionarios/>} />
        <Route path="/formulario-pedidos-clientes" element={<FormularioPedidosClientes/>} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/login" element={<LoginClientes />} />
        <Route path="*" element={<NotFound />} />
        
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
