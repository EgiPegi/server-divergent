const { validationResult } = require("express-validator");
const bcrypt = require('bcrypt');
const saltRounds = 10;

const db = require("../config/db");

exports.register = (req, res, next) => {
    //cek error terlebih dahulu
    const err = validationResult(req);

    if(!err.isEmpty()){
        res.send({message: "Form tidak boleh kosong"});
    }
    const username = req.body.username;
    const password = req.body.password;

    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            console.log({err: err});
        }
        // res.send({user: username, pw: hash});
        db.query(
        "INSERT INTO users (username, password) VALUES (?,?)",
        [username, hash],
        (err) => {
             res.send({err: err});
        }
    )

    })
}

exports.getLogin = (req, res, next) => {
    if (req.session.user) {
        res.send({loggedIn: true, user: req.session.user});
    } else {
        res.send({loggedIn: false});
    }
}

exports.login = (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    db.query(
        "SELECT * FROM users WHERE username = ?",
        username,
        (err, result) => {
            //menampilkan error
            if (err) {
                res.send({err: err});
            }
            //menampilkan data
            if (result.length > 0) {
                // res.send(result);
                bcrypt.compare(password, result[0].password, (err, rst) => {
                    if (rst) {
                        req.session.user = result;
                        console.log(req.session.user)
                        res.send(result);
                    } else {
                        res.send({message: "password salah"});
                    }
                })
            } else {
                res.send({message: "username belum terdaftar"});
            }
        }
    )
}

exports.logout = (req, res, next) => {
    req.session.destroy();
    res.send({loggedIn: false});
}

