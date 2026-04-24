const express = require('express');
const app = express();


const sequelize = require('./config/database');
const { Usuario, Produto, Pedido } = require('./models');
const usuarioRoutes = require('./routes/usuarioRoutes');
const produtoRoutes = require('./routes/produtoRoutes');
const pedidoRoutes = require('./routes/pedidoRoutes');

app.use(express.json());

app.use('/pedidos', pedidoRoutes);
app.use('/produtos', produtoRoutes);
app.use('/usuarios', usuarioRoutes);

sequelize.authenticate()
  .then(() => {
    console.log('Conectado com sucesso ao banco!');

    return sequelize.sync({ force: false });
  })
  .then(() => {
    console.log('Tabelas sincronizadas!');

    app.listen(3000, () => {
      console.log('Servidor rodando...');
    });
  })
  .catch((err) => {
    console.error('ERRO DETALHADO:', err.message);
  });
