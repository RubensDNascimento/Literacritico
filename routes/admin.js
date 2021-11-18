const express = require('express');
const router = express.Router();
const {eCritico} = require("../helpers/accessControl")

router.get('/', eCritico,  (req, res)=>{
    res.render("admin/index")
})
router.get('/nome', eCritico, (req, res)=>{
    res.render("admin/index")
})

router.get("/novaCritica",eCritico,(req, res)=>{
    res.render("critica/newReview")
})


module.exports = router; 