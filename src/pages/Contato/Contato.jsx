import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Mail, Phone, MapPin } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

// --- Animações ---
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};
const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2, ease: "easeOut" } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};
const slideLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1] } },
};
const slideRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1] } },
};

const Contato = () => {
  const { t } = useTranslation();

  return (
    <div className="relative flex flex-col items-center justify-start min-h-screen w-full overflow-hidden pt-28 pb-20 font-sans">
      {/* Fundo */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1e2a78] via-[#0b1e36] to-[#09162a] animate-gradientMove opacity-95"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1),_transparent_70%)] animate-pulseSlow"></div>

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full px-8 md:px-16 text-gray-100"
      >
        {/* Hero */}
        <motion.section
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="text-center py-20"
        >
          <motion.h1
            className="text-6xl font-extrabold text-white mb-6 drop-shadow-lg"
            variants={item}
          >
            {t("contato.hero.title", "Fale Conosco")}
          </motion.h1>
          <motion.p
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            variants={item}
          >
            {t(
              "contato.hero.subtitle",
              "Entre em contato conosco para dúvidas, sugestões ou suporte."
            )}
          </motion.p>
        </motion.section>

        {/* Informações de Contato */}
        <motion.section
          className="py-16 md:py-24"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div
            className="grid grid-cols-1 md:grid-cols-4 gap-10 max-w-5xl mx-auto"
            variants={stagger}
          >
            {/* Email */}
            <motion.div
              variants={item}
              className="flex flex-col justify-center items-center text-center p-6 bg-white/20 backdrop-blur-lg rounded-2xl border border-white/30 shadow-md"
            >
              <Mail className="h-10 w-10 text-[#ff4747] mb-3" />
              <h3 className="text-xl font-bold text-white mb-1">Email</h3>
              <p className="text-gray-300 break-words">smh@smh.com.br</p>
            </motion.div>

            {/* Telefone */}
            <motion.div
              variants={item}
              className="flex flex-col justify-center items-center text-center p-6 bg-white/20 backdrop-blur-lg rounded-2xl border border-white/30 shadow-md"
            >
              <Phone className="h-10 w-10 text-[#ff4747] mb-3" />
              <h3 className="text-xl font-bold text-white mb-1">Telefone</h3>
              <p className="text-gray-300 whitespace-nowrap">+55 (11) 5060-5777</p>
            </motion.div>

            {/* WhatsApp */}
            <motion.a
              href="https://wa.me/5511945443842?text=Ol%C3%A1!%20Gostaria%20de%20mais%20informa%C3%A7%C3%B5es."
              target="_blank"
              rel="noopener noreferrer"
              variants={item}
              className="flex flex-col justify-center items-center text-center p-6 bg-[#25D366]/20 backdrop-blur-lg rounded-2xl border border-[#25D366]/40 shadow-md hover:bg-[#25D366]/30 transition-all"
            >
              <FaWhatsapp className="h-10 w-10 text-[#25D366] mb-3" />
              <h3 className="text-xl font-bold text-white mb-1">WhatsApp</h3>
              <p className="text-gray-300 whitespace-nowrap">+55 (11) 94544-3842</p>
            </motion.a>

            {/* Endereço */}
            <motion.div
              variants={item}
              className="flex flex-col justify-center items-center text-center p-6 bg-white/20 backdrop-blur-lg rounded-2xl border border-white/30 shadow-md"
            >
              <MapPin className="h-10 w-10 text-[#ff4747] mb-3" />
              <h3 className="text-xl font-bold text-white mb-1">Endereço</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Av. Camilo Castelo Branco, 90<br />
                Vila Gumercindo, São Paulo - SP<br />
                04130-020
              </p>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Mapa */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full h-[400px] md:h-[500px] relative mb-16"
        >
          <iframe
            title="Localização"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.223493024814!2d-46.64809778450155!3d-23.619252967180398!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce5f1adf7f3c7b%3A0x1c97e1f1f5e9b6b!2sAv.%20Camilo%20Castelo%20Branco%2C%2090%20-%20Vila%20Gumercindo%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2004130-020!5e0!3m2!1spt-BR!2sbr!4v1700012345678!5m2!1spt-BR!2sbr"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            className="rounded-2xl shadow-lg"
          ></iframe>
        </motion.section>

        {/* Formulário */}
        <motion.section
          className="py-16 md:py-24"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div
            className="max-w-2xl mx-auto bg-white/20 backdrop-blur-lg rounded-2xl p-10 shadow-xl border border-white/30"
            variants={item}
          >
            <h2 className="text-3xl font-bold text-white mb-6 text-center">
              {t("contato.form.title", "Envie sua mensagem")}
            </h2>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <motion.div variants={item}>
                <label className="block text-gray-200 mb-1">Nome</label>
                <input
                  type="text"
                  placeholder="Seu nome"
                  className="w-full border border-white/40 rounded px-3 py-2 bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ff4747]"
                />
              </motion.div>

              <motion.div variants={item}>
                <label className="block text-gray-200 mb-1">Email</label>
                <input
                  type="email"
                  placeholder="seu@email.com"
                  className="w-full border border-white/40 rounded px-3 py-2 bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ff4747]"
                />
              </motion.div>

              <motion.div variants={item}>
                <label className="block text-gray-200 mb-1">Mensagem</label>
                <textarea
                  rows={5}
                  placeholder="Sua mensagem"
                  className="w-full border border-white/40 rounded px-3 py-2 bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ff4747]"
                ></textarea>
              </motion.div>

              <motion.button
                type="submit"
                variants={item}
                className="w-full bg-[#ff4747] text-white px-5 py-3 rounded-md font-semibold hover:bg-[#ff5f5f] transition-all"
              >
                {t("contato.form.buttonText", "Enviar")}
              </motion.button>
            </form>
          </motion.div>
        </motion.section>
      </motion.main>
    </div>
  );
};

export default Contato;
