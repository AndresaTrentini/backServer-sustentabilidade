import express from 'express'
import itensRouter from './routers/itens-router'
import lojasRouter from './routers/lojas-router'
import produtosRouter from './routers/produtos-router'
// Porta do servidor
const PORT = process.env.PORT || 4000
// Host do servidor
const HOSTNAME = process.env.HOSTNAME || 'http://localhost'
// App Express
const app = express()
// JSON
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// Endpoint raiz
app.get('/', (req, res) => {
    res.send('Bem-vindo!')
})
// Rotas
app.use('/api', itensRouter)
app.use('/api', lojasRouter)
app.use('/api', produtosRouter)


// Resposta padrão para quaisquer outras requisições:
app.use((req, res) => {
    res.status(404)
})
// Inicia o sevidor
app.listen(PORT, () => {
    console.log(`Servidor rodando com sucesso ${HOSTNAME}:${PORT}`)
})