module.exports ={
    eCritico: function (req, res, next) {
        if (req.isAuthenticated() && req.user.eCritico == 1) {
            return next();
        }
        req.flash("error_msg", "Precisa ser um Crítico registrado para ver esta página");
        res.redirect("/")
    },

    estaLogado: function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }

        req.flash("error_msg", "Você deve fazer o login para ver esta pagina");

        res.redirect("/")
    }
}