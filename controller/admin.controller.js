export const dashboard = (req, res, next) => {
    return res.render("dashboard.ejs", {
        currentUser: req.session.user.currentUser
    });
}

export const signout = (req, res, next) => {
    req.session.user = null;
    req.session.destroy();
    return res.redirect("/");
}