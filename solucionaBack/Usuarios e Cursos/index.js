const fs = require('fs');
const express = require('express');
const server = express();
const dados = require('./src/data/dados.json');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
server.use(express.json());

server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

server.listen(3000, () =>{
    console.log("Servidor está funcionando!");
});

server.get('/', (req, res) => {
    return res.json({mensagem: 'Nossa API está funcionando'});
});

//USUÁRIOS:

server.get('/usuarios', (req, res) => {
    return res.json(dados.Usuarios);
});

server.post('/usuarios', (req, res) => {
    const novoUsuario = req.body;

    if(!novoUsuario.nome || !novoUsuario.idade || !novoUsuario.curso){
        return res.status(400).json({mensagem: "Dados incompletos, tente novamente."});
    }

    dados.Usuarios.push(novoUsuario);
    salvarDados(dados);

    return res.status(201).json({mensagem: "Novo usuário cadastrado com sucesso"});
    
})

//put === inserir dados atualizados
server.put('/usuarios/:id', (req, res) => {
    const usuarioId = parseInt(req.params.id);
    const atualizarUser = req.body;

    const indiceUsuario = dados.Usuarios.findIndex(usuario => usuario.id === usuarioId);

    if (indiceUsuario === -1){
        return res.status(404).json({mensagem: "Usuário não encontrado"});
    }

    //atualiza ou não modifica o nome:
    dados.Usuarios[indiceUsuario].nome = atualizarUser.nome || dados.Usuarios[indiceUsuario].nome;

    //atualiza ou não modifica a idade:
    dados.Usuarios[indiceUsuario].idade = atualizarUser.idade || dados.Usuarios[indiceUsuario].idade;

    //atualiza ou não modifica o curso:
    dados.Usuarios[indiceUsuario].curso = atualizarUser.curso || dados.Usuarios[indiceUsuario].curso;

    salvarDados(dados);

    return res.json({mensagem: "Usuário atualizado com sucesso", usuario: dados.Usuarios[indiceUsuario]});
});
   

server.delete('/usuarios/:id', (req, res) => {
    const id = parseInt(req.params.id);

    //filtrar os usuarios, removendo pelo id correspondente.
    //u se refere ao usuario.
    dados.Usuarios = dados.Usuarios.filter(u => u.id !== id);

    salvarDados(dados);
    return res.status(200).json({ mensagem: "Usuário excluido com sucesso."});
});

//CURSOS:

server.get('/cursos', (req, res) => {
    return res.json(dados.Cursos);
});


//FUNÇÕES:

function salvarDados(){
    fs.writeFileSync(__dirname + '/src/data/dados.json', JSON.stringify(dados, null, 2));
} 