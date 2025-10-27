import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next"; // 👈 importado aqui
import Button from "../../../components/ui/Button";
import ExtintorImage from "@/assets/images/extintores-smh.png";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.25 },
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
    transition: { staggerChildren: 0.15 },
  },
};

const paragraphVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const buttonVariants = {
  hidden: { opacity: 0, scale: 0.7 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 120, damping: 12 },
  },
};

const ServicesGrid = () => {
  const navigate = useNavigate();
  const { t } = useTranslation(); // 👈 inicialização do hook

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
        {/* Cabeçalho */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={paragraphVariants}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#29314A] mb-6 leading-snug">
            {t("servicesGrid.title")}
          </h2>
        </motion.div>

        {/* Container principal */}
        <motion.div
          className="flex flex-col lg:flex-row items-center gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          {/* Imagem */}
          <motion.img
            src={ExtintorImage}
            alt={t("servicesGrid.imageAlt")}
            variants={imageVariants}
            className="w-full max-w-md rounded-xl shadow-lg"
          />

          {/* Texto */}
          <motion.div
            variants={textContainerVariants}
            className="space-y-6 text-gray-700 text-lg leading-relaxed"
          >
            {t("servicesGrid.paragraphs", { returnObjects: true }).map((p, i) => (
              <motion.p key={i} variants={paragraphVariants} dangerouslySetInnerHTML={{ __html: p }} />
            ))}
          </motion.div>
        </motion.div>

        {/* Botão */}
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
            {t("servicesGrid.button")}
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesGrid;
