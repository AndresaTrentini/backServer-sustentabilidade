import Produto from "../models/produto"
import database from "./database"

const produtosRepository = {
    lerTodas: (callback: (produtos: Produto[]) => void) => {
        const sql = 'SELECT * FROM produtos'
		const params: any[] = []
		database.all(sql, params, (_err, rows) => callback(rows))
    },

    ler: (id: number, callback: (produtos?: Produto) => void) => {
		const sql = 'SELECT * FROM produtos WHERE id = ?'
		const params = [id]
		database.get(sql, params, (_err, row) => callback(row))
	},

    atualizar: (id: number, produtos: Produto, callback: (notFound: boolean) => void) => {
		const sql = 'UPDATE produtos SET nome = ?, preco = ?, lojaId = ?, WHERE id = ?'
		const params = [produtos.nome, produtos.preco, produtos.lojaId, id]
		database.run(sql, params, function(_err) {
			callback(this.changes === 0)
		})
    },

    apagar: (id: number, callback: (notFound: boolean) => void) => {
		const sql = 'DELETE FROM produtos WHERE id = ?'
		const params = [id]
		database.run(sql, params, function(_err) {
			callback(this.changes === 0)
		})
	},

    criar: (produtos: Produto, callback: (id?: number) => void) => {
		const sql = 'INSERT INTO produtos (nome) VALUES (?)'
		const params = [produtos.nome]
		database.run(sql, params, function(_err) {
			callback(this?.lastID)
		})
	},

}

export default produtosRepository