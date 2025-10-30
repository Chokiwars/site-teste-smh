import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  FileText,
  ShieldAlert,
  ExternalLink,
  Award,
  ShieldCheck,
  CheckCircle,
} from "lucide-react";

// --- Animações (Sem Alterações) ---
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};
const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, ease: "easeOut" },
  },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};
const slideLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1] },
  },
};
const slideRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1] },
  },
};

// --- DADOS ESTÁTICOS (NÃO TRADUZÍVEIS) ---
// 2. SEPARAR DADOS-BASE (links e nomes de ícones)
const policiesBaseData = [
  { href: "/docs/codigo-etica-e-conduta.pdf" },
  { href: "/docs/politica-de-qualidade.pdf" },
  { href: "/docs/politica-antissuborno.pdf" },
  { href: "/docs/politica-de-compliance.pdf" },
];

const certificationsBaseData = [
  {
    icon: "Award", // Nome do ícone como string
    href: "/certificados/iso-37001.pdf",
  },
  {
    icon: "ShieldCheck", // Nome do ícone como string
    href: "/certificados/iso-37301.pdf",
  },
  {
    icon: "CheckCircle", // Nome do ícone como string
    href: "/certificados/iso-9001.pdf",
  },
];

// 3. MAPA DE ÍCONES (para renderização dinâmica)
const iconMap = {
  Award,
  ShieldCheck,
  CheckCircle,
};

// --- Página ---
const ComplianceQualidade = () => {
  // 4. INICIALIZAR O TRADUTOR (Corrigido)
  const { t } = useTranslation();

  // 5. BUSCAR TEXTOS DO JSON E COMBINAR COM DADOS-BASE
  const policiesText = t("compliance.policies", { returnObjects: true }) || [];
  const policies = policiesBaseData.map((base, index) => ({
    ...base,
    ...(policiesText[index] || {}),
  }));

  const certificationsText =
    t("compliance.certifications", { returnObjects: true }) || [];
  const certifications = certificationsBaseData.map((base, index) => ({
    ...base,
    ...(certificationsText[index] || {}),
  }));

  // Pega todo o conteúdo estático da página
  const content = t("compliance.pageContent", { returnObjects: true });

  // Fallback caso o JSON ainda não tenha carregado
  if (!content) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        {/* Você pode colocar um spinner/loading aqui */}
        <p className="text-white">A carregar...</p>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col items-center justify-start min-h-screen w-full overflow-hidden pt-28 pb-20 font-sans">
      {/* Fundo animado */}
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
            {/* 6. SUBSTITUIR TEXTO */}
            {content.hero.title}
          </motion.h1>
          <motion.p
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            variants={item}
          >
            {/* 6. SUBSTITUIR TEXTO */}
            {content.hero.subtitle}
          </motion.p>
        </motion.section>

        {/* Introdução */}
        <motion.section
          className="py-16 md:py-24"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2
            className="text-3xl font-bold text-white mb-6 text-center"
            variants={item}
          >
            {/* 6. SUBSTITUIR TEXTO */}
            {content.introduction.title}
          </motion.h2>
          <div className="max-w-4xl mx-auto text-gray-200 text-lg space-y-4 leading-relaxed">
            {/* 6. SUBSTITUIR TEXTO (usando o padrão de HTML do seu JSON 'sobreNos') */}
            <motion.p
              variants={item}
              dangerouslySetInnerHTML={{ __html: content.introduction.p1 }}
            />
            <motion.p variants={item}>{content.introduction.p2}</motion.p>
          </div>
        </motion.section>

        {/* Códigos e Políticas */}
        <motion.section
          className="py-16 md:py-24"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2
            className="text-3xl font-bold text-center text-white mb-12"
            variants={item}
          >
            {/* 6. SUBSTITUIR TEXTO */}
            {content.policiesSection.title}
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10"
            variants={stagger}
          >
            {/* 7. USAR O ARRAY COMBINADO */}
            {policies.map((policy) => (
              <motion.div
                key={policy.title} // Título vem do JSON
                variants={item}
                className="relative group rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 shadow-lg transition-all duration-300 hover:shadow-2xl hover:border-[#ff4747]/40"
              >
                <motion.a
                  href={policy.href} // Link vem do DADO-BASE
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-start p-6 h-full transition-transform duration-300 group-hover:scale-[1.03]"
                >
                  <div className="w-14 h-14 flex items-center justify-center bg-[#ff4747]/20 rounded-full mb-4">
                    <FileText className="h-6 w-6 text-[#ff4747]" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#ff4747]">
                    {policy.title} {/* Título vem do JSON */}
                  </h3>
                  <span className="flex items-center text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                    {/* 6. SUBSTITUIR TEXTO */}
                    {content.policiesSection.viewButtonText}
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </span>
                </motion.a>
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-[#ff4747]/10 to-transparent pointer-events-none"></div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Canal de Denúncia */}
        <motion.section
          className="py-16 md:py-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={slideLeft}>
              <h2 className="text-3xl font-bold text-white mb-6">
                {/* 6. SUBSTITUIR TEXTO */}
                {content.whistleblowerChannel.title}
              </h2>
              <p className="text-gray-300 mb-4 text-lg leading-relaxed">
                {/* 6. SUBSTITUIR TEXTO */}
                {content.whistleblowerChannel.description}
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                {/* 6. SUBSTITUIR TEXTO */}
                {content.whistleblowerChannel.followUp}
              </p>
            </motion.div>

            <motion.div
              className="flex justify-center lg:justify-end"
              variants={slideRight}
            >
              <div className="w-full max-w-md rounded-2xl bg-white/10 backdrop-blur-lg p-8 text-center shadow-xl border border-white/20 transition-transform duration-300 hover:scale-[1.03]">
                <ShieldAlert className="h-16 w-16 text-[#ff4747] mx-auto" />
                <h3 className="text-2xl font-semibold text-white mt-6 mb-4">
                  {/* 6. SUBSTITUIR TEXTO */}
                  {content.whistleblowerChannel.card.title}
                </h3>
                <p className="text-gray-300 mb-6">
                  {/* 6. SUBSTITUIR TEXTO */}
                  {content.whistleblowerChannel.card.description}
                </p>
                <a
                  href={content.whistleblowerChannel.card.href} // Link do JSON
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-md bg-[#ff4747] px-8 py-3 text-base font-medium text-white shadow-md transition-all hover:bg-[#ff5f5f] hover:scale-105"
                >
                  {/* 6. SUBSTITUIR TEXTO */}
                  {content.whistleblowerChannel.card.buttonText}
                </a>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Certificações ISO */}
        <motion.section
          className="py-16 md:py-24"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div
            className="text-center max-w-3xl mx-auto mb-12"
            variants={item}
          >
            <h3 className="text-base font-semibold text-[#ff4747] uppercase tracking-wider">
              {/* 6. SUBSTITUIR TEXTO */}
              {content.certificationsSection.preTitle}
            </h3>
            <h2 className="mt-2 text-3xl font-bold text-white md:text-4xl">
              {/* 6. SUBSTITUIR TEXTO */}
              {content.certificationsSection.title}
            </h2>
            <p className="text-lg text-gray-300 mt-4">
              {/* 6. SUBSTITUIR TEXTO */}
              {content.certificationsSection.description}
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-10"
            variants={stagger}
          >
            {/* 7. USAR O ARRAY COMBINADO */}
            {certifications.map((cert) => {
              // 8. RENDERIZAR ÍCONE DINAMICAMENTE
              const Icon = iconMap[cert.icon] || Award; // 'Award' como fallback
              return (
                <motion.div
                  key={cert.title} // Título do JSON
                  variants={item}
                  className="relative group rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 shadow-lg transition-all duration-300 hover:shadow-2xl hover:border-[#ff4747]/40"
                >
                  <motion.div className="p-8 flex-grow transition-transform duration-300 group-hover:scale-[1.03]">
                    <div className="w-14 h-14 flex items-center justify-center bg-[#ff4747]/20 rounded-full mb-5">
                      <Icon className="h-6 w-6 text-[#ff4747]" />
                    </div>
                    <h4 className="text-xl font-bold text-white mb-1">
                      {cert.title} {/* Texto do JSON */}
                    </h4>
                    <p className="text-sm font-medium text-gray-400 mb-4">
                      {cert.subtitle} {/* Texto do JSON */}
                    </p>
                    <p className="text-base text-gray-200">
                      {cert.description} {/* Texto do JSON */}
                    </p>
                  </motion.div>
                  <div className="bg-white/5 p-6 border-t border-white/10 text-center">
                    <a
                      href={cert.href} // Link do DADO-BASE
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center font-medium text-[#ff4747] hover:text-[#ff5f5f] transition-colors"
                    >
                      {/* 6. SUBSTITUIR TEXTO */}
                      {content.certificationsSection.viewButtonText}
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </div>

                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-[#ff4747]/10 to-transparent pointer-events-none"></div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.section>

        {/* Rodapé */}
        <motion.footer
          className="mt-20 text-center text-sm text-gray-400 border-t border-white/10 pt-8"
          variants={fadeUp}
        >
          {/* 6. SUBSTITUIR TEXTO (com lógica do ano) */}
          {content.footer.copyrightText.replace(
            "{YEAR}",
            new Date().getFullYear()
          )}
        </motion.footer>
      </motion.main>

      {/* Animações CSS (Sem Alterações) */}
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

export default ComplianceQualidade;

