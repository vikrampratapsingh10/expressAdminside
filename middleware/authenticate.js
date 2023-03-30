export const verify = (req, res, next) => {
    if (req.session.user)
        next();
    else
        return res.redirect("/");
}