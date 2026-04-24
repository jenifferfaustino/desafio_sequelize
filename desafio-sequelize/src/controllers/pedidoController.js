const { Pedido, Produto, Usuario } = require('../models');

exports.criar = async (req, res) => {
  try {
    const { usuarioId, produtos } = req.body;

    const usuario = await Usuario.findByPk(usuarioId);
    if (!usuario) {
      return res.status(404).json({ erro: 'Usuário não encontrado' });
    }

  
    const pedido = await Pedido.create({ UsuarioId: usuarioId });

    let total = 0;

    for (let p of produtos) {
      const produto = await Produto.findByPk(p.id);

      
      if (!produto) {
        return res.status(404).json({ erro: `Produto ${p.id} não encontrado` });
      }

      const quantidade = p.quantidade || 1;

      if (produto.estoque < quantidade) {
        return res.status(400).json({
          erro: `Estoque insuficiente para ${produto.nome}`
        });
      }

     
      produto.estoque -= quantidade;
      await produto.save();

     
      total += produto.preco * quantidade;

 
      await pedido.addProduto(produto, {
        through: { quantidade }
      });
    }


    pedido.total = total;
    await pedido.save();

    res.json(pedido);

  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};