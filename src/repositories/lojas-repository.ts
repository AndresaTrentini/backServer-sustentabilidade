import Loja from "../models/loja"
import database from "./database"

const lojasRepository = {
    lerTodas: (callback: (lojas: Loja[]) => void) => {
        const sql = 'SELECT * FROM lojas'
		const params: any[] = []
		database.all(sql, params, (_err, rows) => callback(rows))
    },

    ler: (id: number, callback: (lojas?: Loja) => void) => {
		const sql = 'SELECT * FROM lojas WHERE id = ?'
		const params = [id]
		database.get(sql, params, (_err, row) => callback(row))
	},

    atualizar: (id: number, lojas: Loja, callback: (notFound: boolean) => void) => {
		const sql = 'UPDATE lojas SET nome = ? WHERE id = ?'
		const params = [lojas.nome, id]
		database.run(sql, params, function(_err) {
			callback(this.changes === 0)
		})
    },

    apagar: (id: number, callback: (notFound: boolean) => void) => {
		const sql = 'DELETE FROM lojas WHERE id = ?'
		const params = [id]
		database.run(sql, params, function(_err) {
			callback(this.changes === 0)
		})
	},

    criar: (lojas: Loja, callback: (id?: number) => void) => {
		const sql = 'INSERT INTO lojas (nome) VALUES (?)'
		const params = [lojas.nome]
		database.run(sql, params, function(_err) {
			callback(this?.lastID)
		})
	},

}

export default lojasRepository