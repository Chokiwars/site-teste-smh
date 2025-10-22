import React, { useEffect, useRef } from "react";

// Ícones ilustrativos
const imagens = {
  historia: "https://img.icons8.com/fluency/96/history.png",
  missao: "https://img.icons8.com/fluency/96/mission.png",
  valores: "https://img.icons8.com/fluency/96/values.png",
  equipe: "https://img.icons8.com/fluency/96/team.png",
  contato: "https://img.icons8.com/fluency/96/contact-card.png",
};

function SobreNos() {
  const fadeRef = useRef(null);

  useEffect(() => {
    if (fadeRef.current) {
      fadeRef.current.classList.add("opacity-100", "translate-y-0");
    }
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-start min-h-screen w-full overflow-hidden pt-28 pb-10">
      {/* Fundo animado */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1e2a78] via-[#0b1e36] to-[#09162a] animate-gradientMove opacity-90"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1),_transparent_70%)] animate-pulseSlow"></div>

      {/* Conteúdo principal */}
      <div
        ref={fadeRef}
        className="relative z-10 w-11/12 max-w-6xl text-gray-100 opacity-0 translate-y-5 transition-all duration-700"
      >
        <h1 className="text-5xl font-extrabold text-center text-white drop-shadow-lg mb-10">
          Sobre Nós
        </h1>

        <p className="text-lg text-center text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed">
          Bem-vindo à <span className="font-semibold text-[#ff4747]">SMH</span> — inovação, segurança e
          qualidade em soluções tecnológicas que transformam o futuro.
        </p>

        <div className="space-y-16">
          {/* História */}
          <section className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-lg hover:scale-[1.02] transition-transform duration-300">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <img src={imagens.historia} alt="História" className="w-24 h-24" />
              <div>
                <h2 className="text-3xl font-bold text-white mb-3">Nossa História</h2>
                <p className="text-gray-200 leading-relaxed">
                  Fundada com o propósito de oferecer sistemas modernos e confiáveis, a SMH nasceu da
                  paixão por tecnologia e do compromisso com a segurança de nossos clientes.
                  Desenvolvemos projetos personalizados, unindo eficiência e simplicidade.
                </p>
              </div>
            </div>
          </section>

          {/* Missão */}
          <section className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-lg hover:scale-[1.02] transition-transform duration-300">
            <div className="flex flex-col md:flex-row-reverse items-center gap-8">
              <img src={imagens.missao} alt="Missão" className="w-24 h-24" />
              <div>
                <h2 className="text-3xl font-bold text-white mb-3">Nossa Missão</h2>
                <p className="text-gray-200 leading-relaxed">
                  Garantir a tranquilidade e satisfação dos nossos clientes através de soluções seguras,
                  acessíveis e tecnológicas, promovendo desenvolvimento sustentável e confiança em cada
                  parceria.
                </p>
              </div>
            </div>
          </section>

          {/* Valores */}
          <section className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-lg hover:scale-[1.02] transition-transform duration-300">
            <div className="flex flex-col md:flex-row items-start gap-8">
              <img src={imagens.valores} alt="Valores" className="w-24 h-24 mt-1" />
              <div>
                <h2 className="text-3xl font-bold text-white mb-3">Nossos Valores</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-200">
                  <li>💡 Inovação constante e busca por excelência</li>
                  <li>🤝 Comprometimento e transparência</li>
                  <li>🔒 Segurança e confiança em cada serviço</li>
                  <li>🌱 Sustentabilidade e responsabilidade social</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Equipe */}
          <section className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-lg hover:scale-[1.02] transition-transform duration-300">
            <div className="flex flex-col md:flex-row-reverse items-center gap-8">
              <img src={imagens.equipe} alt="Equipe" className="w-24 h-24" />
              <div>
                <h2 className="text-3xl font-bold text-white mb-3">Nossa Equipe</h2>
                <p className="text-gray-200 leading-relaxed">
                  Contamos com uma equipe multidisciplinar apaixonada por tecnologia e inovação. Cada
                  membro contribui com suas habilidades únicas para tornar nossos produtos e serviços
                  ainda melhores.
                </p>
              </div>
            </div>
          </section>

          {/* Contato */}
          <section className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-lg hover:scale-[1.02] transition-transform duration-300">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <img src={imagens.contato} alt="Contato" className="w-24 h-24" />
              <div>
                <h2 className="text-3xl font-bold text-white mb-3">Entre em Contato</h2>
                <p className="text-gray-200 leading-relaxed">
                  Quer saber mais sobre nós ou tirar suas dúvidas? Ficaremos felizes em conversar com
                  você!
                  <br />
                  📧 <span className="font-semibold text-[#ff4747]">contato@smh.com.br</span>
                </p>
              </div>
            </div>
          </section>
        </div>

        <footer className="mt-16 text-center text-sm text-gray-400 border-t border-white/20 pt-6">
          © {new Date().getFullYear()} SMH — Todos os direitos reservados.
        </footer>
      </div>
    </div>
  );
}

export default SobreNos;
