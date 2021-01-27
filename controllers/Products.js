const { validationResult } = require("express-validator");
const db = require("../config/db");

exports.upload = (req, res, next) => {
  //cek error
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
  const title = req.body.title;
  const description = req.body.description;
  const price = req.body.price;
  const image = req.files.map(file => file.path);
  const color = req.body.color;
  const category = req.body.category;

  db.query(
    "INSERT INTO products (title, description, price, color, category) VALUES (?, ?, ?, ?, ?);",
    [title, description, price, color, category],
    (err, results) => {
      console.log('err:', err);
      const isId = results.insertId;
      image.forEach(file => {
        if (results) {
          db.query(
            "INSERT INTO images (id_product, name, link) VALUE (?,?,?);",
            [isId, title, file],
            (err, result) => {
              console.log('err:', err);
            }
          )
        }
      });
      res.status(201).json({
        message: "Create Blog Success",
        data: results
      });
    }
  );

}

exports.allProducts = (req, res, next) => {
  db.query("SELECT * FROM products ORDER BY id DESC LIMIT 9", (err, results) => {
    if (err) {
      console.log(err);
    }
    res.send(results);
  });
}

exports.thumb = (req, res, next) => {
  const pId = req.params.pId;
  db.query("SELECT * FROM images where id_product = ? LIMIT 1",
    pId,
    (err, results) => {
      if (err) {
        console.log(err);
      }
      res.send(results);
    });
}

exports.byIdProduct = (req, res, next) => {
  const id = req.params.id;
  db.query(
    "SELECT * FROM products WHERE id = ?;",
    id,
    (err, results) => {
      if (err) {
        console.log(err);
      }
      res.send(results);
    }
  );
}

exports.byCategory = (req, res, next) => {
  const ctg = req.params.ctg;
  db.query(
    "SELECT * FROM products WHERE category = ?;",
    ctg,
    (err, results) => {
      if (err) {
        console.log(err);
      }
      res.send(results);
    }
  );
}

exports.byCategoryCari = (req, res, next) => {
  const ctg = req.params.ctg;
  const cari = `%${req.query.cari}%`;
  db.query(
    "SELECT * FROM products WHERE category = ? AND title LIKE ?;",
    [ctg, cari],
    (err, results) => {
      if (err) {
        console.log(err);
      }
      res.send(results);
    }
  );
}

exports.preview = (req, res, next) => {
  const pId = req.params.pId;
  db.query("SELECT * FROM images where id_product = ?",
    pId,
    (err, results) => {
      if (err) {
        console.log(err);
      }
      res.send(results);
    });
}

exports.dellProduct = (req, res, next) => {
  const Did = req.params.Did;
  db.query(
    "DELETE FROM products WHERE id = ?;",
    Did,
    (err, results) => {
      if (err) {
        console.log(err);
      }
      if (results) {
        // db.query("SELECT link FROM images where id_product = ?",
        //   id,
        //   (err, resu) => {
        //     if (err) {
        //       console.log(err);
        //     }
        //     resu.forEach(e => {
        //       // console.log('hasil :', e.link)
        //       delImg(e.link)
        //     });
        //   });
        db.query(
          "DELETE FROM images WHERE id_product = ?;",
          Did,
          (err, result) => {
            if (err) {
              console.log(err);
            }
          })
      }
      res.send(results);
    }
  );
}

exports.putProduct = (req, res, next) => {
  //cek error
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
  const id = req.body.id;
  const title = req.body.title;
  const description = req.body.description;
  const price = req.body.price;
  const color = req.body.color;
  const category = req.body.category;

  db.query(
    "UPDATE products SET title = ?, description = ?, price = ?, color = ?, category = ? WHERE id = ?;",
    [title, description, price, color, category, id],
    (err, results) => {
      console.log('err:', err);
      res.status(201).json({
        message: "Update Blog Success",
        data: results
      });
    }
  );
}
// const delImg = (filePath) => {
//   filePath = path.join(__dirname, '..', filePath)


//   console.log("filepath: ", filePath);
//   console.log("dir :", __dirname);

//   fs.unlink(filePath, err => console.log(err));

// }






























exports.addCart = (req, res, next) => {
  const userLiking = req.body.userLiking;
  const postId = req.body.postId;

  db.query(
    "INSERT INTO Likes (userLiking, postId) VALUES (?,?)",
    [userLiking, postId],
    (err, results) => {
      if (err) {
        console.log(err);
      }
      db.query(
        "UPDATE Uploads SET likes = likes + 1 WHERE id = ?",
        postId,
        (err2, results2) => {
          res.send(results);
        }
      );
    }
  );
}