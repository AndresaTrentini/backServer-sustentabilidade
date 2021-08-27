import express from "express"
import Loja from "../models/loja"
import lojasRepository from "../repositories/lojas-repository"
import produtosRepository from "../repositories/produtos-repository"

const lojasRouter = express.Router()

lojasRouter.get('/lojas', (req, res) => {
	lojasRepository.lerTodas((lojas) => res.json(lojas))
})


lojasRouter.get('/lojas/:id', (req, res) => {
	const id: number = +req.params.id
	lojasRepository.ler(id, (lojas) => {
		if (lojas) {
			res.json(lojas)
		} else {
			res.status(404).send()
		}
	})
})

lojasRouter.get('/lojas/:id/produtos', (req, res) => {
	const id: number = +req.params.id
	produtosRepository.lerTodosDaLoja(id, (produtos) =>{
		res.json(produtos)
	})
})

lojasRouter.put('/lojas/:id', (req, res) => {
	const id: number = +req.params.id
	lojasRepository.atualizar(id, req.body, (notFound) => {
		if (notFound) {
			res.status(404).send()
		} else {
			res.status(204).send()
		}
	})
})

lojasRouter.post('/lojas', (req, res) => {
	const lojas: Loja = req.body
	lojasRepository.criar(lojas, (id) => {
        if (id) {
            res.status(201).location(`/lojas/${id}`).send()
        } else {
            res.status(400).send()
        }
    })
})

lojasRouter.delete('/lojas/:id', (req, res) => {
	const id: number = +req.params.id
	lojasRepository.apagar(id, (notFound) => {
        if (notFound) {
            res.status(404).send()
        } else {
            res.status(204).send()
        }
    })
})


export default lojasRouter