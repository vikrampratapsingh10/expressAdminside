import Admin from '../model/admin.model.js';

export const indexPage = (req, res, next) => {
    return res.render("index.ejs", { message: "" });
}

export const signIn = (req, res, next) => {
    // let email = req.body.email;
    // let password = req.body.password;
    const {email,password} = req.body;

    let admin = new Admin(null, email, password);
    admin.signIn()
        .then(result => {
            // if (result.length)
            //     return res.render("dashboard.ejs");
            if (result.length) {
                req.session.user = { isLoggedIn: true, currentUser: email };
                return res.redirect("/admin/dashboard");
            }
            else
                // return res.redirect("/");
            // http://localhost:3000/  
            return res.render("index.ejs", {
                message: "Invalid email id or password"
            });
        })
        .catch();
}