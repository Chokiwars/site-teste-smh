import React from "react";
import { motion } from "framer-motion";

// Fundo animado no estilo SMH
const FundoAnimado = () => (
  <>
    <div className="absolute inset-0 bg-gradient-to-br from-[#1e2a78] via-[#0b1e36] to-[#09162a] animate-gradientMove opacity-90"></div>
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.08),_transparent_70%)] animate-pulseSlow"></div>
  </>
);

// Variantes de animação
const cardVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, type: "spring", stiffness: 60 },
  }),
};

// Produtos do marketplace
const produtos = [
  {
    nome: "Pacote Dev Starter",
    descricao: "Kit inicial para desenvolvedores — inclui templates e ícones.",
    preco: "R$ 49,90",
    imagem: "https://img.icons8.com/fluency/96/source-code.png",
  },
  {
    nome: "Design Premium",
    descricao: "Layout moderno e responsivo para seu site ou portfólio.",
    preco: "R$ 129,90",
    imagem: "https://img.icons8.com/fluency/96/paint-palette.png",
  },
  {
    nome: "Consultoria SMH",
    descricao: "Sessão personalizada de aprimoramento técnico e visual.",
    preco: "R$ 89,90",
    imagem: "https://img.icons8.com/fluency/96/handshake.png",
  },
  {
    nome: "Animações Framer Motion",
    descricao: "Pacote com exemplos e códigos prontos de animações.",
    preco: "R$ 59,90",
    imagem: "https://img.icons8.com/fluency/96/dancing.png",
  },
];

const Marketplace = () => {
  return (
    <div className="relative min-h-screen overflow-hidden text-white">
      <FundoAnimado />

      {/* Conteúdo principal */}
      <div className="relative z-10 flex flex-col items-center justify-center py-20 px-6 pt-[140px]">
        <motion.h1
          className="text-5xl font-extrabold mb-4 text-center text-white drop-shadow-lg"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Marketplace SMH
        </motion.h1>

        <motion.p
          className="text-lg mb-12 max-w-2xl text-center text-gray-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Descubra soluções, pacotes e recursos criados especialmente para você —
          com o estilo e a qualidade{" "}
          <span className="text-[#ff4747] font-semibold">SMH</span> que você já conhece.
        </motion.p>

        {/* Cards de produtos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl w-full">
          {produtos.map((item, i) => (
            <motion.div
              key={i}
              className="bg-white/10 backdrop-blur-md p-6 rounded-3xl shadow-lg hover:shadow-black/30 transition-all duration-300 flex flex-col items-center"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              whileHover={{ scale: 1.05, rotate: 1 }}
            >
              <img
                src={item.imagem}
                alt={item.nome}
                className="w-24 h-24 mb-4"
              />
              <h2 className="text-2xl font-semibold mb-2 text-center">
                {item.nome}
              </h2>
              <p className="text-gray-300 text-center mb-4">
                {item.descricao}
              </p>
              <p className="text-[#ff4747] font-bold mb-4">{item.preco}</p>
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="bg-[#ff4747] hover:bg-[#d93a3a] text-white px-5 py-2 rounded-xl shadow-md transition"
              >
                Ver mais
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Rodapé */}
        <motion.footer
          className="mt-20 text-center text-sm text-gray-400 border-t border-white/20 pt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          © {new Date().getFullYear()} SMH — Todos os direitos reservados.
        </motion.footer>
      </div>

      {/* Animações CSS do fundo */}
      <style>{`
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradientMove {
          background-size: 300% 300%;
          animation: gradientMove 20s ease infinite;
        }
        @keyframes pulseSlow {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
        .animate-pulseSlow {
          animation: pulseSlow 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Marketplace;
