const express = require('express')
const app = express()
const port = 3080
const pgp = require('pg-promise')(/* options */)
const db = pgp('postgres://postgres:postgres@localhost:5433/ProjetoFinal')

const IP_1 = `172.16.221.204`
const PORT_1 = 3000
const SERVER_1 = [IP_1,PORT_1].join(':');

var server1 = require('axios').create({
  baseURL: 'http://' + SERVER_1
})
const IP_2 = `172.16.221.33`
const PORT_2 = 3030
const SERVER_2 = [IP_2,PORT_2].join(':');

const IP_3 = `172.16.222.233`
const PORT_3 = 3001
const SERVER_3 = [IP_3,PORT_3].join(':');

const IP_4 = `172.16.221.55`
const PORT_4 = 3000
const SERVER_4 = [IP_4,PORT_4].join(':');

const IP_5 = `172.16.221.155`
const PORT_5 = 3090
const SERVER_5 = [IP_5,PORT_5].join(':');


// db.one('SELECT $1 AS value', 123)
//   .then((data) => {
//     console.log('DATA:', data.value)
//   })
//   .catch((error) => {
//     console.log('ERROR:', error)
//   })

app.get('/suspensoes', (req, res) => {
  db.any('SELECT * FROM suspensoes')
  .then(function (data) {
    res.json({
      status: "success",
      data: data,
      message: "Retornou todas as pessoas"
    });
  })
  .catch(function(error) {
    console.log('ERROR:', error)
  })
})

// Rota GET para obter todas as suspensões
app.get('/suspensoes', (req, res) => {
  db.any('SELECT * FROM suspensoes')
    .then(function (data) {
      res.json({
        status: "success",
        data: data,
        message: "Retornou todas as suspensões"
      });
    })
    .catch(function (error) {
      console.log('ERROR:', error)
      res.status(500).json({
        status: "error",
        message: "Erro ao obter suspensões"
      });
    })
})

// Rota GET para obter uma suspensão por ID
app.get('/suspensoes/:id', (req, res) => {
  const suspensoesId = req.params.id;
  db.one('SELECT * FROM suspensoes WHERE id = $1', suspensoesId)
    .then(function (data) {
      res.json({
        status: "success",
        data: data,
        message: "Retornou a suspensão com ID " + suspensoesId
      });
    })
    .catch(function (error) {
      console.log('ERROR:', error)
      res.status(404).json({
        status: "error",
        message: "Suspensão não encontrada"
      });
    })
})

// Rota POST para criar uma nova suspensão
app.post('/suspensoes', (req, res) => {
  const { descricao, motivo, dataInicio, dataFim } = req.body;
  db.none('INSERT INTO suspensoes(id_suspensao, motivo_suspensao, data_suspensao, turno_suspensao, reposicao) VALUES($1, $2, $3, $4)', [id_suspensao, motivo_suspensao, data_suspensao, turno_suspensao, reposicao])
    .then(function () {
      res.status(201).json({
        status: "success",
        message: "Suspensão criada com sucesso"
      });
    })
    .catch(function (error) {
      console.log('ERROR:', error)
      res.status(500).json({
        status: "error",
        message: "Erro ao criar suspensão"
      });
    })
})

// Rota PUT para atualizar uma suspensão existente
app.put('/suspensoes/:id', (req, res) => {
  const suspensoesId = req.params.id;
  const { descricao, motivo, dataInicio, dataFim } = req.body;
  db.none('UPDATE suspensoes SET   reposicao=$1, turno_suspensao=$2, data_suspensao=$3, motivo_suspensao=$4, id_suspensao=$5', [ reposicao, turno_suspensao, data_suspensao, motivo_suspensao, id_suspensao])
    .then(function () {
      res.json({
        status: "success",
        message: "Suspensão atualizada com sucesso"
      });
    })
    .catch(function (error) {
      console.log('ERROR:', error)
      res.status(500).json({
        status: "error",
        message: "Erro ao atualizar suspensão"
      });
    })
})

// Rota DELETE para excluir uma suspensão
app.delete('/suspensoes/:id', (req, res) => {
  const suspensoesId = req.params.id;
  db.result('DELETE FROM suspensoes WHERE id = $1', id_suspensao)
    .then(function (result) {
      if (result.rowCount > 0) {
        res.json({
          status: "success",
          message: "Suspensão excluída com sucesso"
        });
      } else {
        res.status(404).json({
          status: "error",
          message: "Suspensão não encontrada"
        });
      }
    })
    .catch(function (error) {
      console.log('ERROR:', error)
      res.status(500).json({
        status: "error",
        message: "Erro ao excluir suspensão"
      });
    })
})

// Iniciando o servidor
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})
