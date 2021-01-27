const { validationResult } = require("express-validator");
const db = require("../config/db");

//COntact Controller
exports.contact = (req, res, next) => {
  //cek error terlebih dahulu
  const err = validationResult(req);

  if (!err.isEmpty()) {
    res.send({ message: "Form tidak boleh kosong" });
  } else {

    const name = req.body.name;
    const number = req.body.number;
    console.log({ name: name, number: number })

    db.query(
      "INSERT INTO contact (name, number) VALUES (?,?)",
      [name, number],
      (err) => {
        res.send({ err: err });
      }
    )
  }
}
exports.getContact = (req, res, next) => {

  db.query("SELECT * FROM contact ORDER BY id DESC", (err, results) => {
    if (err) {
      console.log(err);
    }
    res.send(results);
  });
}
exports.delContact = (req, res, next) => {
  const id = req.params.id;
  db.query("DELETE FROM contact WHERE id = ?;", id, (err, results) => {
    if (err) {
      console.log(err);
    }
    res.send(results);
  });
}
exports.putContact = (req, res, next) => {
  //cek error terlebih dahulu
  const err = validationResult(req);

  if (!err.isEmpty()) {
    res.send({ message: "Form tidak boleh kosong" });
  } else {
    const id = req.body.id;
    const name = req.body.name;
    const number = req.body.number;
    console.log({ name: name, number: number })

    db.query(
      "UPDATE contact SET name = ?, number = ? WHERE id = ?;",
      [name, number, id],
      (err) => {
        res.send({ err: err });
      }
    )
  }
}

//FAQ controller
exports.faq = (req, res, next) => {
  //cek error terlebih dahulu
  const err = validationResult(req);

  if (!err.isEmpty()) {
    res.send({ message: "Form tidak boleh kosong" });
  } else {

    const question = req.body.question;
    const answer = req.body.answer;
    console.log({ question: question, answer: answer })

    db.query(
      "INSERT INTO faq (question, answer) VALUES (?,?)",
      [question, answer],
      (err) => {
        res.send({ err: err });
      }
    )
  }
}
exports.getFaq = (req, res, next) => {
  db.query("SELECT * FROM faq ORDER BY id DESC", (err, results) => {
    if (err) {
      console.log(err);
    }
    res.send(results);
  });
}
exports.delFaq = (req, res, next) => {
  const id = req.params.id;
  db.query("DELETE FROM faq WHERE id = ?;", id, (err, results) => {
    if (err) {
      console.log(err);
    }
    res.send(results);
  });
}
exports.putFaq = (req, res, next) => {
  //cek error terlebih dahulu
  const err = validationResult(req);

  if (!err.isEmpty()) {
    res.send({ message: "Form tidak boleh kosong" });
  } else {
    const id = req.body.id;
    const question = req.body.question;
    const answer = req.body.answer;
    console.log({ question: question, answer: answer })

    db.query(
      "UPDATE faq SET question = ?, answer = ? WHERE id = ?;",
      [question, answer, id],
      (err) => {
        res.send({ err: err });
      }
    )
  }
}

//MainSlide controller
exports.slide = (req, res, next) => {
  const err = validationResult(req);

  if (!err.isEmpty()) {
    const error = new Error('Kesalahan pada input');
    error.errStatus = 400;
    error.data = err.array();
    throw error;
  }

  if (!req.files) {
    const error = new Error('Anda belum mengupload image.');
    error.errStatus = 422;
    throw error;
  }

  const alt = req.body.alt;
  const image = req.files.map(file => file.path);

  image.forEach(file => {
    db.query(
      "INSERT INTO main_slide (path, alt) VALUE (?,?);",
      [file, alt],
      (err, result) => {
        console.log('err:', err);
        res.status(201).json({
          message: "Create Blog Success",
          data: result
        });
      }
    )
  });
}
exports.getSlide = (req, res, next) => {

  db.query("SELECT * FROM main_slide ORDER BY id DESC", (err, results) => {
    if (err) {
      console.log(err);
    }
    res.send(results);
  });
}
exports.delSlide = (req, res, next) => {
  const id = req.params.id;
  db.query("DELETE FROM main_slide WHERE id = ?;", id, (err, results) => {
    if (err) {
      console.log(err);
    }
    res.send(results);
  });
}