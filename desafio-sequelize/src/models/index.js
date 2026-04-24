const Usuario = require('./Usuario');
const Produto = require('./Produto');
const Pedido = require('./Pedido');

Pedido.belongsTo(Usuario);

Pedido.belongsToMany(Produto, { through: 'PedidoProdutos' });
Produto.belongsToMany(Pedido, { through: 'PedidoProdutos' });

module.exports = { Usuario, Produto, Pedido };