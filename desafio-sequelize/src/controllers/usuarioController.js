const Usuario = require('../models/Usuario');

exports.criar = async (req, res) => {
     console.log(req.body); 
  try {
    const usuario = await Usuario.create(req.body);
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

exports.listar = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

exports.buscarPorId = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

exports.atualizar = async (req, res) => {
  try {
    await Usuario.update(req.body, {
      where: { id: req.params.id }
    });
    res.json({ mensagem: 'Atualizado com sucesso' });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};


exports.deletar = async (req, res) => {
  try {
    await Usuario.destroy({
      where: { id: req.params.id }
    });
    res.json({ mensagem: 'Deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};