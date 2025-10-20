import React from "react";
import { motion } from "framer-motion";
import Button from "../../../components/ui/Button";

const ServicesGrid = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 lg:px-12 max-w-5xl">
        {/* Cabeçalho */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#29314A] mb-6 leading-snug">
             Mais de 30 anos de excelência em Engenharia Contra Incêndio
          </h2>
        </motion.div>

        {/* Texto principal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="space-y-6 text-gray-700 text-lg leading-relaxed"
        >
          <p>
            A <strong className="text-[#29314A]">SMH SISTEMAS</strong> atua em
            todo o Brasil com equipe própria e certificações internacionais,
            oferecendo soluções completas para prevenção e combate a incêndios.
          </p>

          <p>
             <strong>Protegemos vidas, dados, patrimônio e conectividade</strong> —
            garantindo a continuidade das operações mesmo em situações críticas.
          </p>

          <p>
             <strong>Especialistas em ambientes de missão crítica e riscos especiais</strong>,
            atendemos líderes dos setores de telecom, data centers, finanças,
            indústria e construção.
          </p>

          <p>
             Oferecemos projeto, equipamentos certificados, instalação,
            manutenção, assistência técnica e recarga de gases.
          </p>
        </motion.div>

        {/* CTA no final */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Button
            variant="default"
            size="lg"
            iconName="ArrowRight"
            iconPosition="left"
            className="bg-[#29314A] hover:bg-[#29314A]/90 px-10 py-5 text-lg"
            onClick={() =>
              console.log("Ação: Leva para a página Sobre Nós")
            }
          >
            Quer saber mais?
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesGrid;
