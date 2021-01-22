const Multer = require("multer");

const uploadQuestion = Multer({

    storage: Multer.memoryStorage(),
    fileFilter: (req, file, callback) => {
        let allowedTypes = ["image/png", "image/jpeg"];

        if(allowedTypes.includes(file.mimetype)){
            callback(null, true);
        }
        else{
            callback(new Error("Tipo de arquivo inválido!"))
        }
    },
    limits: {fileSize: 1024 * 1024 * 2} // Máximo de 2MB

});




module.exports = uploadQuestion.single("photo");
