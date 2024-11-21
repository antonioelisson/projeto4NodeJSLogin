import express from "express";
import session from "express-session";


const host = "0.0.0.0";
const porta = 3000;
const app = express();

app.use(session({
    secret: 'M1nh4Chav3S3cr3t4',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 1000 * 60 * 30 //minutos para excluir os dados de login
    }
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.static('./pages/public'));//deixar visível para o usuário o conteúdo da pasta apontada

var listaAlunos = [];

function apresentaFormulario(requisicao, resposta) {
    resposta.send(` <html>
                    <head>
                        <meta charset="UTF-8"/>
                        <title>Cadastro de contato</title>
                        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
                        <style>
                            body{
                                width: 700px;
                                margin: auto;
                            }
                        </style>
                    </head>
                    <body>
                        <h2>Contato</h2></br>
                        <hr>
                        <form method="POST" action="/formulario" class="row g-3" novalidate>

                            <div class="col-md-4">
                                <label for="nome" class="form-label">Nome completo</label>
                                <input type="text" class="form-control" id="nome" name="nome">
                            </div>

                            <div class="col-md-4">
                                <label for="telefone" class="form-label">Celular</label>
                                <input type="text" class="form-control" id="telefone" name="telefone" placeholder="(xx)xxxxx-xxxx">
                            </div>

                            <div class="col-md-4">
                                <label for="email" class="form-label">Email</label>
                                <div class="input-group has-validation">
                                    <span class="input-group-text" id="inputGroupPrepend">@</span>
                                    <input type="text" class="form-control" id="email" name="email" aria-describedby="inputGroupPrepend">
                                </div>
                            </div>

                            <div class="mb-3">
                                <label for="mensagem" class="form-label">Mensagem</label>
                                <textarea class="form-control" id="mensagem" name="mensagem" placeholder="Deixe sua mensagem" ></textarea>   
                            </div>

                            <div class="col-12">
                                <button class="btn btn-primary" type="submit">Enviar</button>
                            </div>
                        </form>
                    </body>
                    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
                </html> `);
}

function cadastrarAluno(req, resp) {
    const nome = req.body.nome;
    const telefone = req.body.telefone;
    const email = req.body.email;
    const mensagem = req.body.mensagem;

    //validação dos campo preenchidos
    if (nome && telefone && email && mensagem) {
        const aluno = { nome, telefone, email, mensagem };

        listaAlunos.push(aluno);

        resp.write(` <html>
                    <head>
                        <meta charset="UTF-8"/>
                        <title>Cadastro de contato</title>
                        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
                    </head>
                    <body>
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Celular</th>
                                    <th>Email</th>
                                    <th>Mensagem</th>
                                </tr>
                            </thead>
                            <tbody> `);

        for (var i = 0; i < listaAlunos.length; i++) {
                    resp.write(` <tr>
                                    <td>${listaAlunos[i].nome}</td>
                                    <td>${listaAlunos[i].telefone}</td>
                                    <td>${listaAlunos[i].email}</td>
                                    <td>${listaAlunos[i].mensagem}</td>
                                </tr> `);
        }
        resp.write(`        </tbody>  
                        </table>

                        <p><a class="btn btn-primary" href="/formulario">Cadastrar outro aluno</a></p>
                    
                        </body>
                    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
                </html> `);

        resp.end();
    }
    else {
        resp.write(` <html>
                    <head>
                        <meta charset="UTF-8"/>
                        <title>Cadastro de contato</title>
                        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
                        <style>
                            body{
                                width: 700px;
                                margin: auto;
                            }
                        </style>
                    </head>
                    <body>
                        <h2>Contato</h2></br>
                        <hr>
                        <form method="POST" action="/formulario" class="row g-3" novalidate>

                            <div class="col-md-4">
                                <label for="nome" class="form-label">Nome completo</label>
                                <input type="text" class="form-control" id="nome" name="nome" value="${nome}">
                            </div>
                            
                             <div class="col-md-4">
                                <label for="telefone" class="form-label">Celular</label>
                                <input type="text" class="form-control" id="telefone" name="telefone" placeholder="(xx)xxxxx-xxxx" value="${telefone}">
                            </div>

                            <div class="col-md-4">
                                <label for="email" class="form-label">Email</label>
                                <div class="input-group has-validation">
                                    <span class="input-group-text" id="inputGroupPrepend">@</span>
                                    <input type="text" class="form-control" id="email" name="email" aria-describedby="inputGroupPrepend" value="${email}>
                                </div>
                            </div>

                            <div class="mb-3">
                                <label for="mensagem" class="form-label">Mensagem</label>
                                <textarea class="form-control" id="mensagem" name="mensagem" placeholder="Deixe sua mensagem" ></textarea value="${mensagem}}>   
                            </div> `);
         
        if (!nome) {
            resp.write(` 
                <div>
                    <span><p class="bg-danger">Por favor, preencha o nome</p></span>    
                </div> `);
        }

        if (!telefone) {
            resp.write(` 
                 <div>
                    <span><p class="bg-danger">Por favor, preencha o email</p></span>    
                </div> `);
        }
        if (!email) {
            resp.write(` 
                <div>
                    <span><p class="bg-danger">Por favor, preencha a cidade</p></span>    
                </div> `);
        }
        if (!mensagem) {
            resp.write(`
                <div>
                    <span><p class="bg-danger">Por favor, escreva uma mensagem</p></span>    
                </div> `);    
        }                      
    }
    resp.end();
}

function autenticarUsuario(req, resp){
    const usuario = req.body.usuario;
    const senha = req.body.senha;

    if(usuario === 'adimn' && senha === '123'){
        resp.redirect('/formulario')
    }
    else
    {
        resp.write(`<html>
                        <head>
                            <meta charset="utf-8">
                            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet">
                        </head>
                        <body>
                            <div class="alert alert-danger role="alert">
                                Usuário ou senha inválidos!
                            </div>
                            <div>
                                <a href="/login.html" class="btn btn-primary">Tentar novamente</a> 
                            </div>
                        </body>
                        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"></script>
                    </html>
                `);
    }
}
app.get('/login', (req, resp) => {
    resp.redirect('/login.html');
});

app.post('/login', autenticarUsuario);

app.get('/formulario', apresentaFormulario);

app.post('/formulario', cadastrarAluno);

app.listen(porta, host, () => {
    console.log("Servidor iniciado http://" + host + ":" + porta);
});

//instalar o pacote express-session para criar sessões para o login