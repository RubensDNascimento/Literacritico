const express = require('express');
const router = express.Router();
const {eCritico, estaLogado} = require("../helpers/accessControl")
const mongoose = require('mongoose');
require("../models/Book")
const Book = mongoose.model("book");
var fs = require('fs');
var path = require('path');


var multer = require('multer');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + file.originalname)
    }
});
  
var upload = multer({ storage: storage });


router.get('/', eCritico,  (req, res)=>{
    res.render("admin/index")
})
router.get('/livros', estaLogado,  (req, res)=>{
    Book.find().then((books)=>{
        
    res.render("admin/bookListing", {books: books})
    })
})
router.get('/novoLivro', eCritico, (req, res)=>{
    res.render("admin/newBook")
})

router.post('/novoLivro', upload.single('capa'), (req, res, next) => {
    var erros =[]
    if(!req.body.titulo || typeof req.body.titulo == undefined || req.body.titulo == null){
        erros.push({texto: "Titulo inválido"})
    }
    if(!req.body.autor || typeof req.body.autor == undefined || req.body.autor == null){
        erros.push({texto: "Autor inválido"})
    }
    if(!req.body.ano || typeof req.body.ano == undefined || req.body.ano == null){
        erros.push({texto: "Ano inválido"})
    }
    if(req.body.senha > 2021){
        erros.push({texto: "Não pode cadastrar um livro ainda não lançado"})
    }
    if(!req.body.sinopse || typeof req.body.sinopse == undefined || req.body.sinopse == null){
        erros.push({texto: "sinopse inválida"})
    }
    console.log(erros)

    if(erros.length > 0){
        res.render("/novoLivro", {erros: erros})
    }else{
        Book.findOne({titulo: req.body.titulo}).then((book) => {
            if(book){
                req.flash("error_msg", "Já existe um livro com o mesmo título");
                console.log("Já existe um livro com o mesmo título")
                res.redirect("/novoLivro")
            }else{

                req.file.path = req.file.path.replace(/\\/g, "/").substring("public".length);
                
                const newBook = new Book({
                    titulo: req.body.titulo,
                    autor: req.body.autor,
                    ano: req.body.ano,
                    sinopse: req.body.sinopse,
                    capa: req.file.path
                })
                
                newBook.save().then(()=>{
                    req.flash("success_msg", "Livro criado com sucesso!");
                    res.redirect("/");
                    console.log("Livro criado com sucesso!")
                    console.log(newBook)
                }).catch((err)=>{
                    req.flash("error_msg", "Não foi possivel criar o Livro");
                    console.log("Não foi possivel criar o Livro" + err)
                    res.redirect("/");
                })
            }
        }).catch((err)=>{
            req.flash("error_msg", "Houve um erro interno");
            console.log("error_msg", "Houve um erro interno")
            console.log(err)
            res.redirect("/");
        })
    }})

router.get("/novaCritica",eCritico,(req, res)=>{
    res.render("critica/newReview")
})


module.exports = router; 