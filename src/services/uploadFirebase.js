
var admin = require("firebase-admin");

var serviceAccount = require("../config/firebase-key.json");

const bucketAdress = "senaioverflowstorage.appspot.com";

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: bucketAdress,
});

const bucket = admin.storage().bucket();


const uploadImagem = (req, res, next) => {

    if (!req.file) {
        return next();
    }

    const imagem = req.file;

    const nomeArquivo = Date.now() + "." + imagem.originalname.split(".").pop();



    const file = bucket.file(nomeArquivo);

    const stream = file.createWriteStream({

        metadata: {
            contentType: imagem.mimetype,
        },

    });

    stream.on("error", (e) => {
        console.error(e)
    });

    stream.on("finish", async () => {

        await file.makePublic();

        req.file.firebaseUrl = `https://storage.googleapis.com/${bucketAdress}/${nomeArquivo}`;

        console.log("aqui-----",req.file)

        next();

    });

    stream.end(imagem.buffer)

}

module.exports = uploadImagem;