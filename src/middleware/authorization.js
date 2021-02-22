const jwt = require("jsonwebtoken");
const auth = require("../config/auth")

module.exports = (req, res, next) => {

    //pegando o campo Authorization do Headers (cabeçalho da requisição)
    const{authorization} = req.headers;

    //verifica se o campo foi informado
    if(!authorization)
        return res.status(401).send({Error: "Token não informado."})

    //divide o prefixo Bearer do Token
    const [Bearer, token] = authorization.split(" ");

    //verifica se o token existe ou foi bem dividido
    if(!token)
        res.status(401).send({Error: "Token mal formatado"});

    try {

        //usa a chave do servidor para verificar se o token foi realmente criado na aplicação
        const payload = jwt.verify(token, auth.secret);

        //coloca o ID do aluno na requisição
        req.studentId = payload.studentId;

        //passa a requisição pra frente (controller)
        return next();
        
    } catch (error) {
        console.log(error);
        res.status(500).send({Erro: "Token inválido"});
    }
    
}