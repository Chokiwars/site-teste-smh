import React, { useState, useEffect, useRef } from "react";

const produtosDisponiveis = [
  { id: "EQ001", descricao: "Sirene", preco: 120.0, estoque: true, img: "https://via.placeholder.com/100?text=Sirene" },
  { id: "EQ002", descricao: "Detector", preco: 85.5, estoque: true, img: "https://via.placeholder.com/100?text=Detector" },
  { id: "EQ003", descricao: "Central de Alarme", preco: 450.0, estoque: true, img: "https://via.placeholder.com/100?text=Central" },
  { id: "EQ004", descricao: "Cilindro", preco: 210.0, estoque: true, img: "https://via.placeholder.com/100?text=Cilindro" },
  { id: "EQ005", descricao: "Acionador Manual", preco: 130.0, estoque: true, img: "https://via.placeholder.com/100?text=Acionador" },
  { id: "2197", descricao: "Bateria Selada 12ah / 12v", preco: 500.0, estoque: true, img: "https://via.placeholder.com/100?text=Bateria" },
  { id: "MT002", descricao: "Fonte", preco: 220.0, estoque: true, img: "https://via.placeholder.com/100?text=Fonte" },
  { id: "MT003", descricao: "Filtro", preco: 75.0, estoque: true, img: "https://via.placeholder.com/100?text=Filtro" },
  { id: "MT004", descricao: "Módulo", preco: 145.0, estoque: true, img: "https://via.placeholder.com/100?text=Módulo" },
  { id: "MT005", descricao: "Válvula", preco: 90.0, estoque: true, img: "https://via.placeholder.com/100?text=Válvula" },
  { id: "MT006", descricao: "Chave", preco: 40.0, estoque: true, img: "https://via.placeholder.com/100?text=Chave" },
  { id: "MT007", descricao: "Placa de sinalização", preco: 60.0, estoque: true, img: "https://via.placeholder.com/100?text=Placa" },
  { id: "0001", descricao: "Mão de obra especializada para instalação dos equipamentos(*)", preco: 1500.0, estoque: true, img: "https://via.placeholder.com/100?text=Mão+de+obra" },
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

    const novosAbertos = [...abertos];
    novosAbertos[index] = false;
    setAbertos(novosAbertos);

    const novosFiltros = [...filtros];
    novosFiltros[index] = "";
    setFiltros(novosFiltros);
  };

  const atualizarFiltro = (index, valor) => {
    const novosFiltros = [...filtros];
    novosFiltros[index] = valor;
    setFiltros(novosFiltros);

    const novosAbertos = [...abertos];
    novosAbertos[index] = true;
    setAbertos(novosAbertos);
  };

  const atualizarQuantidade = (index, quantidade) => {
    const novosPedidos = [...pedidos];
    novosPedidos[index].quantidade = quantidade;
    setPedidos(novosPedidos);
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
  };

  useEffect(() => {
    if (fadeRef.current) fadeRef.current.classList.add("opacity-100", "translate-y-0");
  }, []);

  return (
    <div className="min-h-screen flex justify-center items-start pt-20 pb-10 bg-white">
      <div
        ref={fadeRef}
        className="fade-in p-8 bg-white rounded-2xl shadow-2xl max-w-4xl w-full mx-auto opacity-0 translate-y-5 transition-all duration-700 border-t-[6px] border-[#0b1e36]"
      >
        <h2 className="text-3xl font-bold mb-8 text-center text-[#0b1e36] tracking-wide">
          Faça seu Pedido
        </h2>

        {pedidos.map((pedido, index) => {
          const produtosFiltrados = produtosDisponiveis.filter((p) =>
            p.descricao.toLowerCase().includes(filtros[index]?.toLowerCase() || "")
          );

          return (
            <div
              key={index}
              className="relative grid grid-cols-1 md:grid-cols-4 gap-4 items-center mb-6 p-5 rounded-xl border border-gray-200 shadow-md transition-all duration-300"
            >
              <div className="flex justify-center items-center">
                {pedido.produto ? (
                  <img
                    src={pedido.produto.img}
                    alt={pedido.produto.descricao}
                    className="w-24 h-24 object-cover rounded-lg border border-gray-300 shadow-sm"
                  />
                ) : (
                  <div className="w-24 h-24 bg-gray-200 flex items-center justify-center rounded-lg text-gray-400 text-2xl">
                    ?
                  </div>
                )}
              </div>

              <div className="md:col-span-2 relative">
                <input
                  type="text"
                  placeholder="Pesquisar produto..."
                  value={filtros[index]}
                  onChange={(e) => atualizarFiltro(index, e.target.value)}
                  onFocus={() => {
                    const novos = [...abertos];
                    novos[index] = true;
                    setAbertos(novos);
                  }}
                  className="p-3 rounded-lg border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-[#0b1e36] mb-2"
                />

                {abertos[index] && (
                  <ul className="absolute z-50 w-full bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {(filtros[index] ? produtosFiltrados : produtosDisponiveis).map((produto) => (
                      <li
                        key={produto.id}
                        onClick={() => atualizarProduto(index, produto)}
                        className={`p-2 cursor-pointer hover:bg-[#0b1e36] hover:text-white transition ${
                          !produto.estoque ? "text-gray-400 cursor-not-allowed" : ""
                        }`}
                      >
                        {produto.descricao} — <span className="font-semibold">R${produto.preco.toFixed(2)}</span>{" "}
                        {!produto.estoque && "(Sem estoque)"}
                      </li>
                    ))}
                    {(filtros[index] ? produtosFiltrados : produtosDisponiveis).length === 0 && (
                      <li className="p-2 text-gray-500">Nenhum produto encontrado</li>
                    )}
                  </ul>
                )}
                {pedido.produto && (
                  <p className="text-gray-600 mt-1 text-sm">{pedido.produto.descricao}</p>
                )}
              </div>

              <div>
                <input
                  type="number"
                  value={pedido.quantidade}
                  min={1}
                  onChange={(e) => atualizarQuantidade(index, Number(e.target.value))}
                  className="p-3 rounded-lg border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-[#d62828]"
                />
              </div>

              <button
                onClick={() => removerPedido(index)}
                className="absolute top-3 right-3 bg-[#d62828] text-white rounded-full w-8 h-8 font-bold hover:bg-red-700 transition"
              >
                ×
              </button>
            </div>
          );
        })}

        <button
          onClick={adicionarPedido}
          className="bg-[#0b1e36] hover:bg-blue-600 text-white px-5 py-2 rounded-lg mt-4 font-semibold transition-all duration-300"
        >
          + Adicionar Produto
        </button>

        <div className="bg-gray-50 p-5 mt-8 rounded-xl shadow-inner border border-gray-200">
          <h3 className="font-semibold text-center text-[#0b1e36] text-lg mb-3">Resumo do Pedido</h3>
          <table className="w-full text-sm border-collapse border border-gray-300 rounded-lg overflow-hidden">
            <thead className="bg-[#0b1e36] text-white">
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
                  className={!p.produto || (p.produto && !p.produto.estoque) ? "opacity-50 text-gray-500" : ""}
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
          <p className="mt-3 font-bold text-right text-[#0b1e36] text-lg">
            Total: R${valorTotal.toFixed(2)}
          </p>
        </div>

        <button
          onClick={handleEnviar}
          disabled={botaoDesabilitado}
          className={`mt-6 w-full py-3 rounded-lg font-bold text-lg tracking-wide transition-all duration-300 ${
            botaoDesabilitado
              ? "bg-gray-400 cursor-not-allowed text-white"
              : "bg-[#0b1e36] hover:bg-[#d62828] text-white shadow-md hover:shadow-lg"
          }`}
        >
          Enviar Pedido
        </button>
      </div>
    </div>
  );
}

export default FormularioPedidosCliente;
