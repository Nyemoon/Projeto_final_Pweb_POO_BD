const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const { Protagonista } = require('./protagonista');
const { Habilidades, CaixaItens } = require('./arsenal');

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'principal.html'));
});

app.post('/login', (req, res) => {
  const { user, campo } = req.body;

  const pistola = new Habilidades("pistola", 20, 2);
  const espingarda = new Habilidades("espingarda", 30, 6);
  const soco = new Habilidades("soco", 15, 2);
  const peixera = new Habilidades("peixeira", 30, 4);
  const padinCico = new Habilidades("em nome de padin ciço", 60, 10);
  const penitencia = new Habilidades("penitencia", 40, 4);

  const caixa = new CaixaItens();
  caixa.adicionarItem("cantil de água");
  caixa.adicionarItem("pistola velha");
  caixa.adicionarItem("faca enferrujada");

  let prota;

  switch (campo) {
    case "Atirador":
      prota = new Protagonista(user, campo, 120, 5, 10, 50, pistola, espingarda, 10, caixa);
      break;
    case "Cabra da pexte":
      prota = new Protagonista(user, campo, 160, 10, 4, 50, soco, peixera, 10, caixa);
      break;
    case "Espiritualista":
      prota = new Protagonista(user, campo, 120, 7, 2, 50, padinCico, penitencia, 10, caixa);
      break;
    default:
      return res.send("Ocupação inválida.");
  }

  res.render('infoprota', {
    prota: {
      nome: prota.nome,
      ocupacao: prota.ocupacao,
      vida: prota.vida,
      armadura: prota.armadura,
      dinheiro: prota.dinheiro,
      habilidade1: {
        nome: prota.habilidade1.nome,
        dano: prota.habilidade1.dano,
        falha: prota.habilidade1.falha
      },
      habilidade2: {
        nome: prota.habilidade2.nome,
        dano: prota.habilidade2.dano,
        falha: prota.habilidade2.falha
      }
    }
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
