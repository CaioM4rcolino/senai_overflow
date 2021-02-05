
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

    const image = req.file;

    const fileName = Date.now() + "." + image.originalname.split(".").pop();

    const file = bucket.file(fileName);

    const stream = file.createWriteStream({

        metadata: {
            contentType: image.mimetype,
        },

    });

    stream.on("error", (e) => {
        console.error(e)
    });

    stream.on("finish", async () => {

        await file.makePublic();

        req.file.fileName = fileName;

        req.file.firebaseUrl = `https://storage.googleapis.com/${bucketAdress}/${fileName}`;

        console.log("aqui-----",req.file)

        next();

    });

    stream.end(image.buffer)

}

module.exports = uploadImagem;