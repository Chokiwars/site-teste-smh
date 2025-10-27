import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Icon from "../../../components/AppIcon";

const MetricsCounter = () => {
  const { t } = useTranslation();

  const [counters, setCounters] = useState({
    clients: 0,
    projects: 0,
    satisfaction: 0,
    experience: 0,
  });

  const finalValues = {
    clients: 1000,
    projects: 1200,
    satisfaction: 100,
    experience: 30,
  };

  const metrics = [
    {
      key: "clients",
      label: t("metrics.items.clients"),
      value: counters.clients,
      suffix: "+",
      icon: "Users",
    },
    {
      key: "projects",
      label: t("metrics.items.projects"),
      value: counters.projects,
      suffix: "+",
      icon: "CheckCircle",
    },
    {
      key: "satisfaction",
      label: t("metrics.items.satisfaction"),
      value: counters.satisfaction,
      suffix: "%",
      icon: "Heart",
    },
    {
      key: "experience",
      label: t("metrics.items.experience"),
      value: counters.experience,
      suffix: "+",
      icon: "Award",
    },
  ];

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    const intervals = Object.keys(finalValues).map((key) => {
      const increment = finalValues[key] / steps;
      let step = 0;

      const interval = setInterval(() => {
        step++;
        const currentValue = Math.min(
          Math.ceil(increment * step),
          finalValues[key]
        );
        setCounters((prev) => ({ ...prev, [key]: currentValue }));
        if (step >= steps) clearInterval(interval);
      }, stepDuration);

      return interval;
    });

    return () => intervals.forEach(clearInterval);
  }, []);

  return (
    <section className="py-20 bg-primary">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Título e Introdução */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {t("metrics.title")}
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            {t("metrics.subtitle")}
          </p>
        </motion.div>

        {/* Contadores */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.key}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 transition-colors duration-300">
                  <Icon name={metric.icon} size={32} className="text-white" />
                </div>

                <div className="mb-2">
                  <span className="text-4xl md:text-5xl font-bold text-white">
                    {metric.value}
                  </span>
                  <span className="text-2xl font-bold text-accent">
                    {metric.suffix}
                  </span>
                </div>

                <p className="text-white/80 font-medium text-lg">
                  {metric.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certificações */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20 pt-16 border-t border-white/20 text-center"
        >
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t("metrics.certification.title")}
          </h3>
          <p
            className="text-lg text-white/80 max-w-3xl mx-auto mb-8 leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: t("metrics.certification.text"),
            }}
          />
          <a
            href="/compliance-qualidade"
            className="inline-block px-8 py-3 rounded-full border border-accent text-accent font-semibold hover:bg-accent hover:text-white transition-all duration-300"
          >
            {t("metrics.certification.button")}
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default MetricsCounter;
