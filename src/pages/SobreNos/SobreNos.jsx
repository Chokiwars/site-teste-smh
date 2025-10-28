import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } };
const fadeIn = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 1 } } };
const float = { hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } }, hover: { scale: 1.03 } };

function SobreNos() {
  const { t, i18n } = useTranslation();
  const sobreNos = t('sobreNos', { returnObjects: true });

  return (
    <div className="relative flex flex-col items-center justify-start min-h-screen w-full overflow-hidden pt-20 sm:pt-28 pb-16 sm:pb-20">
      {/* Botão toggle */}
      <div className="absolute top-4 sm:top-8 right-4 sm:right-10 z-20">
        <button
          onClick={() => i18n.changeLanguage(i18n.language === 'pt' ? 'en' : 'pt')}
          className="px-3 py-1 sm:px-4 sm:py-2 bg-white text-black rounded shadow text-sm sm:text-base"
        >
          {i18n.language === 'pt' ? 'EN' : 'PT'}
        </button>
      </div>

      {/* Fundo animado */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1e2a78] via-[#0b1e36] to-[#09162a] animate-gradientMove opacity-90"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1),_transparent_70%)] animate-pulseSlow"></div>

      <motion.div initial="hidden" animate="visible" variants={fadeIn} className="relative z-10 w-full px-4 sm:px-10 md:px-20 lg:px-40 text-gray-100 opacity-0 translate-y-5 transition-all duration-700">
        <motion.h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-center text-white drop-shadow-lg mb-8 sm:mb-12" variants={fadeUp}>
          {sobreNos.title}
        </motion.h1>

        <motion.p className="text-lg sm:text-xl text-center text-gray-200 mb-12 sm:mb-16 max-w-3xl sm:max-w-4xl mx-auto leading-relaxed" variants={fadeUp} dangerouslySetInnerHTML={{ __html: sobreNos.intro }} />

        <div className="space-y-12 sm:space-y-20">
          {sobreNos.sections.map((secao) => (
            <motion.section key={secao.id} variants={float} initial="hidden" whileInView="visible" whileHover="hover" viewport={{ once: true, amount: 0.2 }} className="bg-white/10 backdrop-blur-lg p-0 rounded-3xl shadow-xl overflow-hidden transition-transform duration-300">
              <div className={`flex flex-col md:flex-row ${secao.reverso ? "md:flex-row-reverse" : ""} items-stretch h-auto md:h-[400px]`}>
                <motion.img
                  src={secao.imagem}
                  alt={secao.titulo}
                  className="w-full md:w-1/2 h-64 sm:h-80 md:h-full object-cover"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                />
                <div className="flex flex-col justify-center p-6 sm:p-10 md:w-1/2">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">{secao.titulo}</h2>
                  {secao.textoLista ? (
                    <ul className="list-disc list-inside space-y-1 sm:space-y-2 text-gray-200 text-sm sm:text-lg">
                      {secao.textoLista.map((item, i) => (<li key={i}>{item}</li>))}
                    </ul>
                  ) : (
                    <p className="text-gray-200 text-sm sm:text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: secao.texto }} />
                  )}
                </div>
              </div>
            </motion.section>
          ))}
        </div>

        <motion.footer className="mt-12 sm:mt-20 text-center text-xs sm:text-sm text-gray-400 border-t border-white/20 pt-6 sm:pt-8" variants={fadeUp}>
          © {new Date().getFullYear()} SMH — {t('footer.rights')}
        </motion.footer>
      </motion.div>

      <style>{`
        @keyframes gradientMove {0% { background-position: 0% 50%; }50% { background-position: 100% 50%; }100% { background-position: 0% 50%; }}
        .animate-gradientMove {background-size: 300% 300%; animation: gradientMove 20s ease infinite;}
        @keyframes pulseSlow {0%,100% { opacity: 0.7; }50% { opacity: 1; }}
        .animate-pulseSlow {animation: pulseSlow 8s ease-in-out infinite;}
      `}</style>
    </div>
  );
}

export default SobreNos;