import React, { useEffect, useRef } from "react";

// Imagens/ícones ilustrativos
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
    <div className="relative w-full min-h-screen flex justify-center items-start pt-28 pb-10 overflow-hidden">
      <div
        ref={fadeRef}
        className="fade-in p-8 bg-white rounded-2xl shadow-xl max-w-4xl w-full mx-auto opacity-0 translate-y-5 transition-all duration-700 border-t-8 border-[#202e3f]"
      >
        <h1 className="text-4xl font-extrabold text-center text-[#0b1e36] mb-6">
          Sobre Nós
        </h1>
        <p className="text-gray-700 text-center mb-8">
          Bem-vindo à <span className="font-semibold text-[#d62828]">SMH</span> — inovação, segurança e
          qualidade em soluções tecnológicas.
        </p>

        <div className="space-y-12 text-gray-700 leading-relaxed">
          {/* Nossa História */}
          <section className="flex flex-col md:flex-row items-center gap-6">
            <img src={imagens.historia} alt="História" className="w-20 h-20" />
            <div>
              <h2 className="text-2xl font-bold text-[#0b1e36] mb-2">Nossa História</h2>
              <p>
                Fundada com o propósito de oferecer sistemas modernos e confiáveis, a SMH nasceu da
                paixão por tecnologia e do compromisso com a segurança de nossos clientes.
                Desenvolvemos projetos personalizados, unindo eficiência e simplicidade.
              </p>
            </div>
          </section>

          {/* Nossa Missão */}
          <section className="flex flex-col md:flex-row-reverse items-center gap-6">
            <img src={imagens.missao} alt="Missão" className="w-20 h-20" />
            <div>
              <h2 className="text-2xl font-bold text-[#0b1e36] mb-2">Nossa Missão</h2>
              <p>
                Garantir a tranquilidade e satisfação dos nossos clientes através de soluções seguras,
                acessíveis e tecnológicas, promovendo desenvolvimento sustentável e confiança em cada
                parceria.
              </p>
            </div>
          </section>

          {/* Nossos Valores */}
          <section className="flex flex-col md:flex-row items-start gap-6">
            <img src={imagens.valores} alt="Valores" className="w-20 h-20 mt-1" />
            <div>
              <h2 className="text-2xl font-bold text-[#0b1e36] mb-2">Nossos Valores</h2>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>💡 Inovação constante e busca por excelência</li>
                <li>🤝 Comprometimento e transparência</li>
                <li>🔒 Segurança e confiança em cada serviço</li>
                <li>🌱 Sustentabilidade e responsabilidade social</li>
              </ul>
            </div>
          </section>

          {/* Nossa Equipe */}
          <section className="flex flex-col md:flex-row-reverse items-center gap-6">
            <img src={imagens.equipe} alt="Equipe" className="w-20 h-20" />
            <div>
              <h2 className="text-2xl font-bold text-[#0b1e36] mb-2">Nossa Equipe</h2>
              <p>
                Contamos com uma equipe multidisciplinar apaixonada por tecnologia e inovação. Cada
                membro contribui com suas habilidades únicas para tornar nossos produtos e serviços
                ainda melhores.
              </p>
            </div>
          </section>

          {/* Contato */}
          <section className="flex flex-col md:flex-row items-center gap-6">
            <img src={imagens.contato} alt="Contato" className="w-20 h-20" />
            <div>
              <h2 className="text-2xl font-bold text-[#0b1e36] mb-2">Entre em Contato</h2>
              <p>
                Quer saber mais sobre nós ou tirar suas dúvidas? Ficaremos felizes em conversar com
                você!  
                <br />
                📧 <span className="font-semibold text-[#d62828]">contato@smh.com.br</span>
              </p>
            </div>
          </section>
        </div>

        <footer className="mt-12 text-center text-sm text-gray-500 border-t pt-4">
          © {new Date().getFullYear()} SMH — Todos os direitos reservados.
        </footer>
      </div>

      {/* Animação do gradiente */}
      <style>
        {`
          @keyframes gradient-x {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animate-gradient-x {
            background-size: 300% 300%;
            animation: gradient-x 15s ease infinite;
          }
        `}
      </style>
    </div>
  );
}

export default SobreNos;
