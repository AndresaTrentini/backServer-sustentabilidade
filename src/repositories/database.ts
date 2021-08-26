import sqlite3 from 'sqlite3'
const DBSOURCE = 'db.sqlite'
const SQL_ITENS_CREATE = `
    CREATE TABLE itens (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT,
        descricao TEXT
    )`
    const SQL_LOJAS_CREATE = `
    CREATE TABLE lojas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL
        
    )`
    const SQL_PRODUTOS_CREATE = `
    CREATE TABLE produtos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        preco REAL NOT NULL,
        lojaId INTEGER NOT NULL,
        FOREING KEY(lojaId) REFERENCES loja(id)
        
    )`

const database = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        console.error(err.message)
        throw err
    } else {
        console.log('Base de dados conectada com sucesso.')
        database.run(SQL_ITENS_CREATE, (err) => {
            if (err) {
                // Possivelmente a tabela já foi criada
            } else {
                console.log('Tabela itens criada com sucesso.')
            }
        })

        database.run(SQL_LOJAS_CREATE, (err) => {
            if (err) {
                // Possivelmente a tabela já foi criada
            } else {
                console.log('Tabela lojas criada com sucesso.')
            }
        })

        database.run(SQL_PRODUTOS_CREATE, (err) => {
            if (err) {
                // Possivelmente a tabela já foi criada
            } else {
                console.log('Tabela produtos criada com sucesso.')
            }
        })
    }

})
export default database