//jshint esversion:6
// Martin Halomoan Lumbangaol
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB", { useNewUrlParser: true });

const articleSchema = {
    title: String,
    content: String,
    author: String
};

const Article = mongoose.model("Article", articleSchema);

// Martin Halomoan Lumbangaol
// fungsi mengeksekusi program secara menyeluruh
app.route("/articles")

.get(function(req, res) {
    Article.find(function(err, foundArticles) {
        if (!err) {
            res.send(foundArticles);
        } else {
            res.send(err);
        }
    });
})

.post(function(req, res) {
    console.log();
    console.log();
    console.log();

    const newArticle = new Article({
        title: req.body.title,
        content: req.body.content,
        author: req.body.author
    });

    newArticle.save(function(err) {
        if (!err) {
            res.send("Sukses menambahkan sebuah artikel.");
        } else {
            res.send(err);
        }
    });
})

.delete(function(req, res) {
    Article.deleteMany(function(err) {
        if (!err) {
            res.send("Sukses menghapus semua artikel");
        } else {
            res.send(err);
        }
    });
});

// Martin Halomoan Lumbangaol
// fungsi mengeksekusi program secara spesifik
app.route("/articles/:articleTitle")

.get(function(req, res) {

    Article.findOne({
            title: req.params.articleTitle
        },
        function(err, foundArticle) {
            if (foundArticle) {
                res.send(foundArticle);
            } else {
                res.send("Tidak ada artikel yang cocok dengan judul.")
            }
        });
})

.put(function(req, res) {
    Article.update({ title: req.params.articleTitle }, { title: req.body.title, content: req.body.content, author: req.body.author }, { overwrite: true },
        function(err) {
            if (!err) {
                res.send("Sukses memperbaharui artikel yang dipilih.");
            }
        });
})

.patch(function(req, res) {
    Article.update({ title: req.params.articleTitle }, { $set: req.body },
        function(err) {
            if (!err) {
                res.send("Sukses memperbaharui artikel.");
            } else {
                res.send(err);
            }
        }
    );
})

.delete(function(req, res) {
    Article.deleteOne({
            title: req.params.articleTitle
        },
        function(err) {
            if (!err) {
                res.send("Sukses menghapus artikel.");
            } else {
                res.send(err);
            }
        }
    );
});


app.listen(3000, function() {
    console.log("Server berjalan di port 3000");
});