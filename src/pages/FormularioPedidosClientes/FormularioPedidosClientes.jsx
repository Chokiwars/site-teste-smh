import React, { useState, useEffect, useRef } from "react";
import "./FundoAnimado.css"; // Fundo animado

// Adicionei imagens fictícias para os produtos (substitua pelos links reais)
const produtosDisponiveis = [
  { id: "EQ001", descricao: "Sirene", preco: 120.0, estoque: true, img: "https://via.placeholder.com/80?text=Sirene" },
  { id: "EQ002", descricao: "Detector", preco: 85.5, estoque: true, img: "https://via.placeholder.com/80?text=Detector" },
  { id: "EQ003", descricao: "Central de Alarme", preco: 450.0, estoque: true, img: "https://via.placeholder.com/80?text=Central" },
  { id: "EQ004", descricao: "Cilindro", preco: 210.0, estoque: true, img: "https://via.placeholder.com/80?text=Cilindro" },
  { id: "EQ005", descricao: "Acionador Manual", preco: 130.0, estoque: true, img: "https://via.placeholder.com/80?text=Acionador" },
  { id: "2197", descricao: "Bateria Selada 12ah / 12v", preco: 500.0, estoque: true, img: "https://via.placeholder.com/80?text=Bateria" },
  { id: "MT002", descricao: "Fonte", preco: 220.0, estoque: true, img: "https://via.placeholder.com/80?text=Fonte" },
  { id: "MT003", descricao: "Filtro", preco: 75.0, estoque: true, img: "https://via.placeholder.com/80?text=Filtro" },
  { id: "MT004", descricao: "Módulo", preco: 145.0, estoque: true, img: "https://via.placeholder.com/80?text=Módulo" },
  { id: "MT005", descricao: "Válvula", preco: 90.0, estoque: true, img: "https://via.placeholder.com/80?text=Válvula" },
  { id: "MT006", descricao: "Chave", preco: 40.0, estoque: true, img: "https://via.placeholder.com/80?text=Chave" },
  { id: "MT007", descricao: "Placa de sinalização", preco: 60.0, estoque: true, img: "https://via.placeholder.com/80?text=Placa" },
  { id: "P0001", descricao: "Produto 33218938", preco: 48.708, estoque: true, img: "https://via.placeholder.com/80?text=P0001" },
  { id: "P0002", descricao: "Produto 28371922", preco: 39.99, estoque: false, img: "https://via.placeholder.com/80?text=P0002" },
  { id: "P0003", descricao: "Produto 29319320", preco: 90.315, estoque: true, img: "https://via.placeholder.com/80?text=P0003" },
  { id: "0001", descricao: "Mão de obra especializada para instalação dos equipamentos(*)", preco: 1500.0, estoque: true, img: "https://via.placeholder.com/80?text=Mão+de+obra" },
];

function FormularioPedidosCliente() {
  const [pedidos, setPedidos] = useState([{ produto: null, quantidade: 1 }]);
  const [filtros, setFiltros] = useState([""]);
  const [abertos, setAbertos] = useState([false]);
  const fadeRef = useRef(null);

  const adicionarPedido = () => {
    setPedidos([...pedidos, { produto: null, quantidade: 1 }]);
    setFiltros([...filtros, ""]);
    setAbertos([...abertos, false]);
  };

  const removerPedido = (index) => {
    setPedidos(pedidos.filter((_, i) => i !== index));
    setFiltros(filtros.filter((_, i) => i !== index));
    setAbertos(abertos.filter((_, i) => i !== index));
  };

  const atualizarProduto = (index, produto) => {
    const novosPedidos = [...pedidos];
    novosPedidos[index].produto = produto;
    setPedidos(novosPedidos);
    const novosFiltros = [...filtros];
    novosFiltros[index] = "";
    setFiltros(novosFiltros);
    const novosAbertos = [...abertos];
    novosAbertos[index] = false;
    setAbertos(novosAbertos);
  };

  const atualizarQuantidade = (index, quantidade) => {
    const novosPedidos = [...pedidos];
    novosPedidos[index].quantidade = quantidade;
    setPedidos(novosPedidos);
  };

  const atualizarFiltro = (index, valor) => {
    const novosFiltros = [...filtros];
    novosFiltros[index] = valor;
    setFiltros(novosFiltros);
    const novosAbertos = [...abertos];
    novosAbertos[index] = true;
    setAbertos(novosAbertos);
  };

  const abrirLista = (index) => {
    const novosAbertos = [...abertos];
    novosAbertos[index] = true;
    setAbertos(novosAbertos);
  };

  const valorTotal = pedidos.reduce(
    (total, p) => (p.produto && p.produto.estoque ? total + p.quantidade * p.produto.preco : total),
    0
  );

  const botaoDesabilitado = pedidos.some((p) => !p.produto || !p.produto.estoque);

  const handleEnviar = () => {
    if (botaoDesabilitado) {
      alert("Verifique os produtos antes de enviar!");
      return;
    }
    alert("Pedido enviado com sucesso!");
    console.log("Pedidos enviados:", pedidos);
  };

  useEffect(() => {
    if (fadeRef.current) {
      fadeRef.current.classList.add("opacity-100", "translate-y-0");
    }
  }, []);

  return (
    <div className="animated-bg flex justify-center items-start w-full min-h-screen pt-28 pb-10">
      <div
        ref={fadeRef}
        className="fade-in p-6 bg-white rounded-xl shadow-lg max-w-4xl w-full mx-auto opacity-0 translate-y-5 transition-all duration-700"
        style={{ borderTop: "6px solid #202e3fff" }}
      >
        <h2 className="text-2xl font-bold mb-5 text-center text-[#0b1e36]">
          Faça seu Pedido
        </h2>

        {pedidos.map((pedido, index) => {
          const produtosFiltrados = produtosDisponiveis.filter((p) =>
            p.descricao.toLowerCase().includes(filtros[index]?.toLowerCase() || "")
          );

          return (
            <div
              key={index}
              className="relative grid grid-cols-1 md:grid-cols-4 gap-4 items-center mb-5 p-4 rounded-lg border shadow hover:shadow-lg transition bg-gray-50"
            >
              <div>
                {pedido.produto ? (
                  <img
                    src={pedido.produto.img}
                    alt={pedido.produto.descricao}
                    className="w-20 h-20 object-cover rounded"
                  />
                ) : (
                  <div className="w-20 h-20 bg-gray-200 flex items-center justify-center rounded text-gray-400">
                    ?
                  </div>
                )}
              </div>

              <div className="md:col-span-2">
                <input
                  type="text"
                  placeholder="Pesquisar produto..."
                  value={filtros[index]}
                  onChange={(e) => atualizarFiltro(index, e.target.value)}
                  onFocus={() => abrirLista(index)}
                  className={`p-2 rounded border w-full focus:outline-none focus:ring-2 ${
                    !pedido.produto ? "border-red-500" : "border-gray-300"
                  } focus:ring-[#d62828] mb-2`}
                />
                {abertos[index] && (
                  <ul className="absolute z-50 w-full bg-white border max-h-60 overflow-y-auto rounded shadow-lg mt-1">
                    {(filtros[index] ? produtosFiltrados : produtosDisponiveis).map((produto) => (
                      <li
                        key={produto.id}
                        onClick={() => atualizarProduto(index, produto)}
                        className={`p-2 cursor-pointer hover:bg-[#0b1e36] hover:text-white transition ${
                          !produto.estoque ? "text-gray-400 cursor-not-allowed" : ""
                        }`}
                      >
                        {produto.descricao} - R${produto.preco.toFixed(2)}{" "}
                        {!produto.estoque && "(Sem estoque)"}
                      </li>
                    ))}
                    {(filtros[index] ? produtosFiltrados : produtosDisponiveis).length === 0 && (
                      <li className="p-2 text-gray-500">Nenhum produto encontrado</li>
                    )}
                  </ul>
                )}
                {pedido.produto && (
                  <p className="text-gray-700 mt-1">{pedido.produto.descricao}</p>
                )}
              </div>

              <div>
                <input
                  type="number"
                  value={pedido.quantidade}
                  min={1}
                  onChange={(e) => atualizarQuantidade(index, Number(e.target.value))}
                  className="p-2 rounded border w-full focus:outline-none focus:ring-2 focus:ring-[#d62828]"
                />
              </div>

              <button
                onClick={() => removerPedido(index)}
                className="absolute top-2 right-2 bg-[#d62828] text-white rounded-full w-8 h-8 font-bold hover:bg-red-700 transition"
              >
                X
              </button>
            </div>
          );
        })}

        <button
          onClick={adicionarPedido}
          className="bg-[#0b1e36] hover:bg-blue-700 text-white px-4 py-2 rounded-lg mt-2 transition-all"
        >
          + Adicionar Produto
        </button>

        <div className="bg-gray-50 p-4 mt-6 rounded-lg shadow-inner border border-[#0b1e36]/20">
          <h3 className="font-semibold text-center text-[#0b1e36] mb-3">Resumo do Pedido</h3>
          <table className="w-full text-sm border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border px-2 py-1">Produto</th>
                <th className="border px-2 py-1 text-center">Qtd</th>
                <th className="border px-2 py-1 text-right">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {pedidos.map((p, i) => (
                <tr
                  key={i}
                  className={
                    !p.produto || (p.produto && !p.produto.estoque)
                      ? "opacity-50 text-gray-500"
                      : ""
                  }
                >
                  <td className="border px-2 py-1">{p.produto ? p.produto.descricao : "-"}</td>
                  <td className="border px-2 py-1 text-center">{p.quantidade}</td>
                  <td className="border px-2 py-1 text-right">
                    {p.produto && p.produto.estoque
                      ? `R$${(p.quantidade * p.produto.preco).toFixed(2)}`
                      : "Indisponível"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-2 font-bold text-right text-[#0b1e36]">
            Valor Total: R${valorTotal.toFixed(2)}
          </p>
        </div>

        <button
          onClick={handleEnviar}
          disabled={botaoDesabilitado}
          className={`mt-4 w-full py-2 rounded-lg font-bold transition-all ${
            botaoDesabilitado
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#0b1e36] hover:bg-[#d62828] text-white"
          }`}
        >
          Enviar Pedido
        </button>
      </div>
    </div>
  );
}

export default FormularioPedidosCliente;
