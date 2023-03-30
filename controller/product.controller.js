import Category from "../model/category.model.js";
import Product from "../model/product.model.js";

export const productAdd = (req, res, next) => {
    Category.fetch()
        .then(result => {
            return res.render("product_add.ejs", {
                currentUser: req.session.user.currentUser,
                categoryList: result,message: ""
            });
        })
        .catch(err => {
            console.log(err);
        })
}

export const save = (req, res, next) => {
    let image = req.file?.filename;
    let { productName, price, stock, description, size, color, discount, type, categoryId } = req.body;
    let product = new Product(null, productName, price, stock, description, size, color, discount, type, image, categoryId)
    product.save().then(result => {
        Category.fetch()
            .then(result => {
                return res.render("product_add.ejs", {
                    currentUser: req.session.user.currentUser,
                    productList: result,
                    message: "product added"
                });
            })
            .catch(err => {
                console.log(err);
            })
    })
        .catch(err => {
            console.log(err);
        })
}

export const saveProduct = async (req, res, next) => {
    let productList = req.body.products;
    for (let product of productList) {
        let { title, description, price, discountPercentage, rating, stock, brand, category, thumbnail } = product;
        let imageArray = "";
        for (let image of product.images) {
            imageArray = imageArray + image + " ";
        }
        let productObject = new Product(null, title, description, price, discountPercentage, rating, stock, brand, category, thumbnail, imageArray);
        await productObject.save();
    }
    console.log("data saved..");
}

export const productList = (req,res,next)=>{
    Product.fetchProduct()
    .then(result=>{
        return res.render("product_list.ejs",{
            currentUser: req.session.user.currentUser,
            productList: result,
            message: ""
        });
    })
    .catch(err=>{
        console.log(err);
    })
}
// pagination start
// export const productLists = (req, res, next) => {
//     let idofvalue = req.params.id;
//     // console.log("id of value is " + idofvalue);
//     Product.fetchProduct().then(result => {
//         switch (idofvalue) {
//             case "1" : return res.render("product_list.ejs", {indexId : 0, message: "", id: idofvalue, currentUser: request.session.user.currentUser, productList: result.slice(0, 24) });break;
//             case "2" : return res.render("product_list.ejs", {indexId : 24,message: "", id: idofvalue, currentUser: request.session.user.currentUser, productList: result.slice(25, 49) });break;
//             case "3" : return res.render("product_list.ejs", {indexId : 49, message: "", id: idofvalue, currentUser: request.session.user.currentUser, productList: result.slice(50, 74) });break;
//             case "4" : return res.render("product_list.ejs", {indexId : 74, message: "", id: idofvalue, currentUser: request.session.user.currentUser, productList: result.slice(75, 99) });
//         }
//     }).catch(err=>{
//         console.log(err);
//     });
// }
// pagination end

export const remove = (req,res,next)=>{
    Product.delete(req.params.id)
    .then(result=>{
        return res.redirect("/product/view");
    })
    .catch(err=>{
        console.log(err);
    })
}

export const viewProductDetail = (req,res,next)=>{
    Product.findDetail(req.params.id)
    .then(result=>{
       return res.render("view_product_detail.ejs",{
        currentUser: req.session.user.currentUser,
        product: result[0]
       })
    })
    .catch(err=>{
        console.log(err);
    })
}
