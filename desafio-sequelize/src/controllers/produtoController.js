const Produto = require('../models/Produto');

exports.criar = async (req, res) => {
    console.log(req.body);
  try {
    const produto = await Produto.create(req.body);
    res.json(produto);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

exports.listar = async (req, res) => {
  try {
    const produtos = await Produto.findAll();
    res.json(produtos);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};
