import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const CTASection = ({ onGetProposal, onContactUs }) => {
  const { t } = useTranslation();

  const benefits = [
    {
      icon: "Zap",
      title: t('ctaSection.benefits.fastResponse.title'),
      description: t('ctaSection.benefits.fastResponse.description'),
    },
    {
      icon: "Shield",
      title: t('ctaSection.benefits.noCommitment.title'),
      description: t('ctaSection.benefits.noCommitment.description'),
    },
    {
      icon: "Users",
      title: t('ctaSection.benefits.specializedConsulting.title'),
      description: t('ctaSection.benefits.specializedConsulting.description'),
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-primary via-secondary to-primary relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight">
            {t('ctaSection.heading')}
          </h2>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4 backdrop-blur-sm">
                <Icon name={benefit.icon} size={28} className="text-white sm:text-2xl" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-1 sm:mb-2">
                {benefit.title}
              </h3>
              <p className="text-sm sm:text-base text-white/80">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16 sm:mt-20"
        >
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center items-center mb-8">
            <Button
              variant="outline"
              size="lg"
              onClick={() =>
                  window.open(
                    'https://wa.me/5511945443842?text=Ol%C3%A1!%20Gostaria%20de%20mais%20informa%C3%A7%C3%B5es.',
                    '_blank'
                  )
                }
              iconName="MessageCircle"
              iconPosition="left"
              className="border-white text-white hover:bg-white hover:text-primary px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold btn-magnetic w-full sm:w-auto"
            >
              {t('ctaSection.button')}
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
