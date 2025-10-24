import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/ui/Button";
import ExtintorImage from "@/assets/images/extintores-smh.png";


const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.25, // Pequeno atraso entre a imagem e o início do texto
    },
  },
};

const imageVariants = {
  hidden: { x: -200, opacity: 0, scale: 0.8, rotate: -5 },
  visible: {
    x: 0,
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 12,
      duration: 1.2,
    },
  },
};

const textContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15, // Atraso entre cada parágrafo
    },
  },
};


const paragraphVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};


const buttonVariants = {
  hidden: { opacity: 0, scale: 0.7 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 12,
    },
  },
};


const ServicesGrid = () => {
  const navigate = useNavigate(); // 2. INICIALIZADO AQUI

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
        {/* Cabeçalho */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={paragraphVariants} // Reutilizando a variante de parágrafo
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#29314A] mb-6 leading-snug">
            Mais de 30 anos de excelência em Engenharia Contra Incêndio
          </h2>
        </motion.div>

        {/* Container principal que orquestra as animações */}
        <motion.div
          className="flex flex-col lg:flex-row items-center gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          {/* Imagem com animação mais evidente */}
          <motion.img
            src={ExtintorImage}
            alt="Extintores SMH"
            variants={imageVariants}
            className="w-full max-w-md rounded-xl shadow-lg"
          />

          {/* Container do texto para efeito cascata */}
          <motion.div
            variants={textContainerVariants}
            className="space-y-6 text-gray-700 text-lg leading-relaxed"
          >

            <motion.p variants={paragraphVariants}>
              A <strong className="text-[#29314A]">SMH SISTEMAS</strong> atua em
              todo o Brasil com equipe própria e certificações internacionais,
              oferecendo soluções completas para prevenção e combate a incêndios.
            </motion.p>
            <motion.p variants={paragraphVariants}>
              <strong>Protegemos vidas, dados, patrimônio e conectividade</strong> —
              garantindo a continuidade das operações mesmo em situações críticas.
            </motion.p>
            <motion.p variants={paragraphVariants}>
              <strong>
                Especialistas em ambientes de missão crítica e riscos especiais
              </strong>
              , atendemos líderes dos setores de telecom, data centers,
              finanças, indústria e construção.
            </motion.p>
            <motion.p variants={paragraphVariants}>
              Oferecemos projeto, equipamentos certificados, instalação,
              manutenção, assistência técnica e recarga de gases.
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Botão final com animação de destaque */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={buttonVariants}
          viewport={{ once: true, amount: 0.8 }}
          className="text-center mt-16"
        >
          <Button
            variant="default"
            size="lg"
            iconName="ArrowRight"
            iconPosition="left"
            className="bg-[#29314A] hover:bg-[#29314A]/90 px-10 py-5 text-lg"
            onClick={() => navigate("/sobre-nos")}
          >
            Quer saber mais?
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesGrid;