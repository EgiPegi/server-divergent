const express = require('express');
const cors = require('cors');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const multer = require('multer');
const path = require('path');

//var
const app = express();
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() +'-'+ file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    if(
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
        ){
        cb(null, true);
    } else {
        cb(null, false);
    }
}

app.use(express.json());
//multer
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(multer({
    storage: fileStorage,
    fileFilter: fileFilter
}).array('image', 20)
);
//izin browser
app.use(
    cors({
        origin: ["http://localhost:3000"],
        methods: ["POST, GET, DELETE, PUT"],
        credentials: true
    })
  );
//parser
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true}));

//session
app.use(session({
    key: "userId",
    secret: "rahasiadong",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60 * 60 *60 * 24,
    }
}));

//router
const authRouter = require("./routes/Auth");
app.use("/auth", authRouter);
const productsRouter = require("./routes/Product");
app.use("/product", productsRouter);
const supportRouter = require("./routes/Support")
app.use("/support", supportRouter);

//error
app.use((err, req, res, next) => {
    const status = err.errStatus || 500;
    const message = err.message;
    const data = err.data;

    res.status(status).json({
        message: message,
        data: data
    });
});

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server started`);
});


