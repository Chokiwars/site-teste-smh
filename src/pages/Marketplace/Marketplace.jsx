import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const produtosSeed = [
  { id: "p1", nome: "Sirene", descricaoCurta: "Sirene de alarme com alto volume.", descricaoLonga: "Sirene de alarme com alto volume para segurança residencial ou comercial.", preco: 199.9, imagem: "src/assets/imagens/sirene.png" },
  { id: "p2", nome: "Detector", descricaoCurta: "Detector de fumaça ou movimento.", descricaoLonga: "Detector de fumaça ou movimento para monitoramento eficiente.", preco: 149.9, imagem: "src/assets/images/0detector.jpg" },
  { id: "p3", nome: "Central de Alarme", descricaoCurta: "Gerencie seu sistema completo.", descricaoLonga: "Central inteligente para gerenciar seu sistema de alarme completo.", preco: 499.9, imagem: "src/assets/imagens/central.png" },
  { id: "p4", nome: "Cilindro", descricaoCurta: "Cilindro de segurança para portas.", descricaoLonga: "Cilindro de segurança para portas e portões de alta proteção.", preco: 79.9, imagem: "src/assets/imagens/0cilindro.jpg" },
  { id: "p5", nome: "Acionador Manual", descricaoCurta: "Acionamento imediato de alarme.", descricaoLonga: "Acionador manual de alarme para emergência imediata.", preco: 59.9, imagem: "src/assets/imagens/0acionadorManual.jpg" },
  { id: "p6", nome: "Bateria", descricaoCurta: "Backup para sistemas de alarme.", descricaoLonga: "Bateria de backup para sistemas de alarme e automação.", preco: 129.9, imagem: "src/assets/imagens/bateria.png" },
  { id: "p7", nome: "Fonte", descricaoCurta: "Alimentação confiável para dispositivos.", descricaoLonga: "Fonte de alimentação confiável para todos os seus dispositivos de segurança.", preco: 89.9, imagem: "src/assets/imagens/fonte.png" },
  { id: "p8", nome: "Filtro", descricaoCurta: "Proteção para sensores sensíveis.", descricaoLonga: "Filtro de proteção para sensores e equipamentos sensíveis.", preco: 49.9, imagem: "src/assets/imagens/filtro.png" },
  { id: "p9", nome: "Módulo", descricaoCurta: "Integração e ampliação do sistema.", descricaoLonga: "Módulo de integração para ampliar funcionalidades do sistema.", preco: 179.9, imagem: "src/assets/imagens/modulo.png" },
  { id: "p10", nome: "Válvula", descricaoCurta: "Controle e prevenção de sistemas.", descricaoLonga: "Válvula de segurança para sistemas de prevenção e controle.", preco: 119.9, imagem: "src/assets/imagens/valvula.png" },
  { id: "p11", nome: "Chave", descricaoCurta: "Acesso seguro a armários/portas.", descricaoLonga: "Chave de acesso e segurança para armários ou portas especiais.", preco: 39.9, imagem: "src/assets/imagens/chave.png" },
  { id: "p12", nome: "Placa de sinalização", descricaoCurta: "Placa indicativa de segurança.", descricaoLonga: "Placa indicativa de segurança ou alerta para ambientes.", preco: 29.9, imagem: "src/assets/imagens/placa.png" },
];

// Variants para animação
const pageVariant = {
  initial: { opacity: 0, y: 12 },
  in: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
  out: { opacity: 0, y: -12, transition: { duration: 0.25, ease: "easeIn" } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 18 },
  show: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, type: "spring", stiffness: 80, damping: 16 },
  }),
};

// CSS para remover setinhas em todos os navegadores
const noSpinInput = {
  MozAppearance: "textfield",
};

const noSpinInputClass = `
  input[type=number]::-webkit-outer-spin-button,
  input[type=number]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const Header = React.memo(({ search, setSearch, filterMaxPrice, setFilterMaxPrice, cart, setTela }) => (
  <div className="w-full flex items-center justify-between py-4 px-6 border-b border-gray-200 bg-white sticky top-[64px] z-30">
    <div className="flex items-center gap-4">
      <h3 className="text-lg font-semibold text-slate-800">Marketplace SMH</h3>
      <span className="text-sm text-gray-500">Mini-shop (demo)</span>
    </div>
    <div className="flex items-center gap-3">
      <input
        placeholder="Buscar produto..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border border-gray-200 rounded-md px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
      />
      <input
        type="number"
        placeholder="Preço max R$"
        value={filterMaxPrice}
        onChange={(e) => setFilterMaxPrice(e.target.value)}
        className="w-32 border border-gray-200 rounded-md px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
        style={noSpinInput}
      />
      <button
        className="bg-slate-800 text-white px-3 py-2 rounded-md text-sm"
        onClick={() => setTela("cart")}
        aria-label="Ver carrinho"
      >
        🛒 {cart.length > 0 ? <span className="ml-2 font-medium">{cart.length}</span> : null}
      </button>
      <button
        onClick={() => {
          setSearch("");
          setFilterMaxPrice("");
          setTela("catalog");
        }}
        className="text-sm text-slate-600 px-3 py-2 rounded-md hover:bg-slate-50"
      >
        Limpar
      </button>
    </div>
  </div>
));

const CartItem = React.memo(({ item, alterarQuantidade, remover }) => {
  const [qty, setQty] = useState(item.qty);

  useEffect(() => {
    setQty(item.qty);
  }, [item.qty]);

  return (
    <div className="flex items-center gap-4 border rounded-lg p-3 border-gray-100">
      <img src={item.produto.imagem} alt={item.produto.nome} className="w-16 h-16" />
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-slate-800">{item.produto.nome}</h3>
          <span className="text-slate-900 font-bold">
            R$ {(item.produto.preco * qty).toFixed(2)}
          </span>
        </div>
        <p className="text-sm text-gray-500">{item.produto.descricaoCurta}</p>
        <div className="mt-2 flex items-center gap-2">
          <input
            type="number"
            min={1}
            value={qty}
            onChange={(e) => setQty(Math.max(1, Number(e.target.value)))}
            onBlur={() => alterarQuantidade(item.id, qty)}
            className="w-20 border px-2 py-1 rounded-md"
            style={noSpinInput}
          />
          <button
            onClick={() => remover(item.id)}
            className="text-sm text-red-600 px-2 py-1 rounded-md"
          >
            Remover
          </button>
        </div>
      </div>
    </div>
  );
});

export default function MarketplaceMiniSMH() {
  const [tela, setTela] = useState("catalog");
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [filterMaxPrice, setFilterMaxPrice] = useState("");

  const adicionarAoCarrinho = (produto, quantidade = 1) => {
    setCart((prev) => {
      const exists = prev.find((p) => p.id === produto.id);
      if (exists) {
        return prev.map((p) =>
          p.id === produto.id ? { ...p, qty: p.qty + quantidade } : p
        );
      }
      return [...prev, { id: produto.id, qty: quantidade, produto }];
    });
  };

  const removerDoCarrinho = (id) => setCart((prev) => prev.filter((p) => p.id !== id));
  const alterarQuantidade = (id, qtd) => {
    if (qtd <= 0) return removerDoCarrinho(id);
    setCart((prev) => prev.map((p) => (p.id === id ? { ...p, qty: qtd } : p)));
  };

  const total = useMemo(
    () => cart.reduce((acc, item) => acc + item.produto.preco * item.qty, 0),
    [cart]
  );

  const produtosFiltrados = produtosSeed.filter((p) => {
    const q = search.trim().toLowerCase();
    const matchText =
      p.nome.toLowerCase().includes(q) ||
      p.descricaoCurta.toLowerCase().includes(q) ||
      p.descricaoLonga.toLowerCase().includes(q);
    const matchPrice =
      !filterMaxPrice || p.preco <= Number(filterMaxPrice || 0) || filterMaxPrice === "";
    return matchText && matchPrice;
  });

  const Catalog = () => (
    <motion.div key="catalog" variants={pageVariant} initial="initial" animate="in" exit="out" className="w-full">
      <style>{noSpinInputClass}</style>
      <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mb-6">
          <h2 className="text-3xl font-extrabold text-slate-900">
            Explore nossos produtos 🛒
          </h2>
          <p className="text-sm text-gray-600">
            Clique em um produto para ver mais detalhes ou adicionar ao carrinho.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {produtosFiltrados.map((p, i) => (
              <motion.article
                key={p.id}
                custom={i}
                variants={cardVariant}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, scale: 0.98 }}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col items-center text-center min-h-[320px] transition-transform duration-300 hover:scale-105 hover:shadow-xl"
              >
                <img src={p.imagem} alt={p.nome} className="w-20 h-20 mb-4" />
                <h3 className="font-semibold text-slate-800 text-lg">{p.nome}</h3>
                <p className="text-sm text-gray-500 mb-3">{p.descricaoCurta}</p>
                <div className="mt-auto w-full">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-slate-900 font-bold">R$ {p.preco.toFixed(2)}</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setProdutoSelecionado(p);
                          setTela("detail");
                        }}
                        className="text-sm px-3 py-1 rounded-md border border-gray-200 hover:bg-gray-50"
                      >
                        Ver mais
                      </button>
                      <button
                        onClick={() => adicionarAoCarrinho(p, 1)}
                        className="bg-slate-800 text-white px-3 py-1 rounded-md text-sm"
                      >
                        Adicionar
                      </button>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
            {produtosFiltrados.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center text-gray-500 py-12"
              >
                Nenhum produto encontrado.
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );

  const Detail = ({ produto }) => {
    if (!produto) return null;
    return (
      <motion.div key={`detail-${produto.id}`} variants={pageVariant} initial="initial" animate="in" exit="out" className="w-full">
        <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-8 items-start bg-white border border-gray-100 p-6 rounded-2xl shadow-sm">
            <img src={produto.imagem} alt={produto.nome} className="w-40 h-40 object-contain" />
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">{produto.nome}</h2>
              <p className="text-sm text-gray-600 mb-4">{produto.descricaoLonga}</p>
              <p className="text-xl font-bold text-slate-900 mb-4">R$ {produto.preco.toFixed(2)}</p>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => adicionarAoCarrinho(produto, 1)}
                  className="bg-slate-800 text-white px-4 py-2 rounded-md"
                >
                  Adicionar ao carrinho
                </button>
                <button
                  onClick={() => {
                    setTela("catalog");
                    setProdutoSelecionado(null);
                  }}
                  className="px-4 py-2 rounded-md border border-gray-200"
                >
                  Voltar
                </button>
                <button
                  onClick={() => setTela("cart")}
                  className="px-4 py-2 rounded-md border border-gray-200 text-sm"
                >
                  Ir para carrinho
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  const Cart = () => (
    <motion.div key="cart" variants={pageVariant} initial="initial" animate="in" exit="out" className="w-full">
      <style>{noSpinInputClass}</style>
      <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Carrinho</h2>

          {cart.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              Seu carrinho está vazio.
              <div className="mt-4">
                <button
                  onClick={() => setTela("catalog")}
                  className="bg-slate-800 text-white px-4 py-2 rounded-md"
                >
                  Voltar ao catálogo
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {cart.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    alterarQuantidade={alterarQuantidade}
                    remover={removerDoCarrinho}
                  />
                ))}
              </div>

              <div className="mt-6 flex justify-between items-center">
                <div>
                  <div className="text-sm text-gray-500">Total</div>
                  <div className="text-2xl font-bold text-slate-900">R$ {total.toFixed(2)}</div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      alert(`Checkout simulado — total R$ ${total.toFixed(2)}\nObrigado!`);
                      setCart([]);
                      setTela("catalog");
                    }}
                    className="bg-emerald-600 text-white px-4 py-2 rounded-md"
                  >
                    Finalizar (simulado)
                  </button>
                  <button onClick={() => setTela("catalog")} className="px-4 py-2 rounded-md border">
                    Continuar comprando
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-[calc(100vh-64px)] bg-white text-slate-900">
      <div className="pt-[120px]" />
      <div className="max-w-7xl mx-auto">
        <Header
          search={search}
          setSearch={setSearch}
          filterMaxPrice={filterMaxPrice}
          setFilterMaxPrice={setFilterMaxPrice}
          cart={cart}
          setTela={setTela}
        />
        <div className="relative z-10">
          <AnimatePresence mode="wait" initial={false}>
            {tela === "catalog" && <Catalog />}
            {tela === "detail" && produtoSelecionado && <Detail produto={produtoSelecionado} />}
            {tela === "cart" && <Cart />}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
