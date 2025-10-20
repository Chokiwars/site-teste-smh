import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion'; 

const formVariants = {

    loginInitial: { opacity: 0, x: 50 }, 
    recoveryInitial: { opacity: 0, x: -50 }, 
    
    animate: { opacity: 1, x: 0 },
    
    loginExit: { opacity: 0, x: -50 },
    recoveryExit: { opacity: 0, x: 50 },
};

const LoginForm = ({ handleLoginSubmit, setIsRecoveryMode }) => (
    <motion.form 
        key="login-form" 
        onSubmit={handleLoginSubmit} 
        className="space-y-6"
        variants={formVariants}
        initial="loginInitial"
        animate="animate"
        exit="loginExit"
        transition={{ duration: 0.4 }}
    >
        
        <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" id="email" required className="appearance-none block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-accent focus:border-accent sm:text-sm transition duration-150" placeholder="seu.email@smh.com"/>
        </div>
        
        <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
            <input type="password" id="password" required className="appearance-none block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-accent focus:border-accent sm:text-sm transition duration-150" placeholder="••••••••"/>
        </div>
        
        <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-lg font-semibold text-white bg-accent hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent transition duration-150">
            Entrar
        </button>
        
        <div className="mt-4 text-center">
            <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); setIsRecoveryMode(true); }}
                className="text-sm font-medium text-accent hover:text-primary transition duration-150"
            >
                Esqueceu a senha?
            </a>
        </div>
    </motion.form>
);


// --- Componente Formulário de Recuperação de Senha ---
const RecoveryForm = ({ handleRecoverySubmit, setIsRecoveryMode }) => (
    <motion.form 
        key="recovery-form" 
        onSubmit={handleRecoverySubmit} 
        className="space-y-6"
        variants={formVariants}
        initial="recoveryInitial" 
        animate="animate"
        exit="recoveryExit"
        transition={{ duration: 0.4 }}
    >
        <p className="text-sm text-gray-600">
            Insira o email associado à sua conta para receber um link de recuperação.
        </p>
        
        <div>
            <label htmlFor="recovery-email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" id="recovery-email" required className="appearance-none block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-accent focus:border-accent sm:text-sm transition duration-150" placeholder="seu.email@smh.com"/>
        </div>
        
        <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-lg font-semibold text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition duration-150">
            Enviar Link de Recuperação
        </button>
        
        <div className="mt-4 text-center">
            <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); setIsRecoveryMode(false); }}
                className="text-sm font-medium text-gray-500 hover:text-gray-700 transition duration-150"
            >
                Voltar para o Login
            </a>
        </div>
    </motion.form>
);


const LoginClientes = () => {
    const [isRecoveryMode, setIsRecoveryMode] = useState(false); 
    const [message, setMessage] = useState('');

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        setMessage('Tentativa de Login efetuada! (Lógica real deve ser implementada)');
    };

    const handleRecoverySubmit = (e) => {
        e.preventDefault();
        setMessage('Se um email for encontrado, as instruções de recuperação de senha serão enviadas.');
        
        setTimeout(() => {
            setIsRecoveryMode(false);
            setMessage(''); 
        }, 3000); 
    };

    return (
        <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center pt-24 pb-8"> 
            
            <motion.div 
                initial={{ opacity: 0, y: 50 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.6, ease: "easeOut" }} 
                className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl border border-gray-200"
            >
                
                
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-extrabold text-primary">
                        {isRecoveryMode ? 'Recuperar Senha' : 'Área do cliente'}
                    </h1>
                    <p className="text-sm text-gray-500 mt-2">
                        {isRecoveryMode ? 'Mantenha sua conta segura.' : 'Entre na sua conta para obter mais informações de valores.'}
                    </p>
                </div>

                {/* Mensagens de Feedback */}
                {message && (
                    <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }}
                        className="p-3 mb-4 text-sm text-green-700 bg-green-100 rounded-lg"
                    >
                        {message}
                    </motion.div>
                )}

                {/* Container da Animação de Troca */}
                <div className="relative overflow-hidden">
                    <AnimatePresence mode="wait"> 
                        {isRecoveryMode ? 
                            <RecoveryForm 
                                handleRecoverySubmit={handleRecoverySubmit} 
                                setIsRecoveryMode={setIsRecoveryMode} 
                            /> 
                            : 
                            <LoginForm 
                                handleLoginSubmit={handleLoginSubmit} 
                                setIsRecoveryMode={setIsRecoveryMode}
                            />
                        }
                    </AnimatePresence>
                </div>
                
            </motion.div>
        </main>
    );
};

export default LoginClientes;