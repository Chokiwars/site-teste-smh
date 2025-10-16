import React, { useState, useEffect } from "react";

const produtosDisponiveis = [
  // EQUIPAMENTOS
  { id: "EQ001", descricao: "Sirene", preco: 120.0, estoque: true },
  { id: "EQ002", descricao: "Detector", preco: 85.5, estoque: true },
  { id: "EQ003", descricao: "Central de Alarme", preco: 450.0, estoque: true },
  { id: "EQ004", descricao: "Cilindro", preco: 210.0, estoque: true },
  { id: "EQ005", descricao: "Acionador Manual", preco: 130.0, estoque: true },

  // MATERIAIS
  { id: "2197", descricao: "Bateria Selada 12ah / 12v", preco: 500.0, estoque: true },
  { id: "MT002", descricao: "Fonte", preco: 220.0, estoque: true },
  { id: "MT003", descricao: "Filtro", preco: 75.0, estoque: true },
  { id: "MT004", descricao: "Módulo", preco: 145.0, estoque: true },
  { id: "MT005", descricao: "Válvula", preco: 90.0, estoque: true },
  { id: "MT006", descricao: "Chave", preco: 40.0, estoque: true },
  { id: "MT007", descricao: "Placa de sinalização", preco: 60.0, estoque: true },

  // EXTRAS DO SEU CÓDIGO
  { id: "P0001", descricao: "Produto 33218938", preco: 48.708, estoque: true },
  { id: "P0002", descricao: "Produto 28371922", preco: 39.99, estoque: false },
  { id: "P0003", descricao: "Produto 29319320", preco: 90.315, estoque: true },
  { id: "0001",
    descricao: "Mão de obra especializada para instalação dos equipamentos(*)",
    preco: 1500.0,
    estoque: true },
];

function FormularioPedidos() {
  const [pedidos, setPedidos] = useState(() => {
    const pedidosSalvos = localStorage.getItem("pedidos");
    return pedidosSalvos
      ? JSON.parse(pedidosSalvos)
      : [{ produto: produtosDisponiveis[0], quantidade: 1 }];
  });

  useEffect(() => {
    localStorage.setItem("pedidos", JSON.stringify(pedidos));
  }, [pedidos]);

  const adicionarPedido = () => {
    setPedidos([...pedidos, { produto: produtosDisponiveis[0], quantidade: 1 }]);
  };

  const removerPedido = (index) => {
    const novosPedidos = [...pedidos];
    novosPedidos.splice(index, 1);
    setPedidos(novosPedidos);
  };

  const atualizarProduto = (index, idProduto) => {
    const produtoSelecionado = produtosDisponiveis.find((p) => p.id === idProduto);
    if (!produtoSelecionado) return;
    const novosPedidos = [...pedidos];
    novosPedidos[index].produto = produtoSelecionado;
    setPedidos(novosPedidos);
  };

  const atualizarQuantidade = (index, quantidade) => {
    const novosPedidos = [...pedidos];
    novosPedidos[index].quantidade = quantidade;
    setPedidos(novosPedidos);
  };

  const valorTotal = pedidos.reduce(
    (total, p) =>
      p.produto.estoque ? total + p.quantidade * p.produto.preco : total,
    0
  );

  const temProdutoSemEstoque = pedidos.some((p) => !p.produto.estoque);

  const handleEnviar = () => {
    if (temProdutoSemEstoque) {
      alert("Remova os produtos sem estoque antes de enviar o pedido!");
      return;
    }
    localStorage.setItem("pedidos", JSON.stringify(pedidos));
    alert("Pedido enviado com sucesso!");
    console.log("Pedidos salvos:", pedidos);
  };

  return (
    <div className="p-6 bg-gray-200 rounded-xl shadow-lg max-w-2xl mx-auto">
      <h2 className="text-lg font-bold mb-3 text-center">
        Formulário de Pedidos (Orçamento)
      </h2>

      {pedidos.map((pedido, index) => (
        <div
          key={index}
          className="relative grid grid-cols-3 gap-3 items-center mb-3 bg-gray-100 p-3 rounded-lg"
        >
          <div>
            <select
              value={pedido.produto.id}
              onChange={(e) => atualizarProduto(index, e.target.value)}
              className="p-2 rounded border w-full"
            >
              <optgroup label="Equipamentos">
                {produtosDisponiveis
                  .filter((p) => p.id.startsWith("EQ"))
                  .map((produto) => (
                    <option key={produto.id} value={produto.id}>
                      {produto.descricao}
                    </option>
                  ))}
              </optgroup>

              <optgroup label="Materiais">
                {produtosDisponiveis
                  .filter((p) => p.id.startsWith("MT"))
                  .map((produto) => (
                    <option key={produto.id} value={produto.id}>
                      {produto.descricao}
                    </option>
                  ))}
              </optgroup>

              <optgroup label="Outros">
                {produtosDisponiveis
                  .filter((p) => !p.id.startsWith("MT") && !p.id.startsWith("EQ"))
                  .map((produto) => (
                    <option key={produto.id} value={produto.id}>
                      {produto.descricao || "Produto não especificado"}
                    </option>
                  ))}
              </optgroup>
            </select>
          </div>

          <div>
            <input
              type="number"
              value={pedido.quantidade}
              min={1}
              onChange={(e) => atualizarQuantidade(index, Number(e.target.value))}
              className="p-2 rounded border w-full"
            />
          </div>

          <div className="text-sm">
            <p>{pedido.produto.descricao}</p>
            <p className="text-gray-600 text-xs">
              LPU: R${pedido.produto.preco.toFixed(2)}{" "}
              {pedido.produto.estoque ? (
                <span className="text-green-600 font-semibold">(Em estoque)</span>
              ) : (
                <span className="text-red-600 font-semibold">(Sem estoque)</span>
              )}
            </p>
          </div>

          <button
            onClick={() => removerPedido(index)}
            className="absolute right-2 top-2 bg-red-500 text-white rounded-full w-8 h-8 font-bold"
          >
            X
          </button>
        </div>
      ))}

      <button
        onClick={adicionarPedido}
        className="bg-blue-800 hover:bg-blue-900 text-white px-3 py-1 rounded-lg mt-2"
      >
        + Adicionar Produto
      </button>

      <div className="bg-white p-3 mt-4 rounded-lg shadow-inner">
        <h3 className="font-semibold text-center">Total</h3>
        <table className="w-full text-sm mt-2">
          <tbody>
            {pedidos.map((p, i) => (
              <tr
                key={i}
                className={p.produto.estoque ? "" : "opacity-50 text-gray-500"}
              >
                <td>{p.produto.id}</td>
                <td className="text-center">{p.quantidade}</td>
                <td>{p.produto.descricao}</td>
                <td className="text-right">
                  {p.produto.estoque
                    ? `R$${(p.quantidade * p.produto.preco).toFixed(2)}`
                    : "Indisponível"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-2 font-bold text-right">
          Valor Total: R${valorTotal.toFixed(2)}
        </p>
      </div>

      <button
        onClick={handleEnviar}
        disabled={temProdutoSemEstoque}
        className={`mt-4 w-full py-2 rounded-lg font-bold ${
          temProdutoSemEstoque
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-500 hover:bg-green-600 text-white"
        }`}
      >
        Enviar
      </button>
    </div>
  );
}

export default FormularioPedidos;
