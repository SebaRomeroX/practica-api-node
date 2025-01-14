
const express = require('express')
const app = express()
app.use(express.json())

const cors = require('cors')
app.use(cors())

let usuarios = [
    {
        name: 'Pamfleto Marin',
        id: 1
    },
    {
        name: 'Onimusha Sengoku',
        id: 2
    },
    {
        name: 'Tamis Osiris',
        id: 3
    }
    ,
    {
        name: 'Menek Otamendum',
        id: 4
    }
]


app.get('/', (request, response)=>{
    response.send('<h1>Qionda Salamin</h1>')
})

app.get('/api/usuarios', (request, response)=>{
    response.json(usuarios)
})

app.get('/api/usuarios/:id', (request, response)=>{
    const id = request.params.id
    const usuario = usuarios.find(usuario => usuario.id == id)
    
    if (usuario) {
        response.json(usuario)
    } else{
        response.status(404).end()
    }
})



app.delete('/api/usuarios/:id', (request, response)=>{
    const id = request.params.id
    usuarios = usuarios.filter(usuario => usuario.id != id)
    response.status(204).end()
})



app.post('/api/usuarios', (request, response) => {
    const usuario = request.body

    const ids = usuarios.map( usuario => usuario.id )
    const maxId = Math.max( ...ids)

    console.log(request.body);
    

    const newUsuario = {
        id: maxId +1,
        name: usuario.name
    }

    usuarios = [ ...usuarios, newUsuario]

    response.status(201).json(newUsuario)
})


app.use((request, response) => {
    response.status(404).json({
        error: 'Not found'
    })
})



const PORT = 3001
app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en ${PORT}`);
})

