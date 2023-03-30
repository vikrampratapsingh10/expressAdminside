import Category from "../model/category.model.js";

export const addCategoryPage = (req, res, next) => {
  return res.render("category_add.ejs", {
    currentUser: req.session.user.currentUser, message: "", alertClass: ""
  });
}


export const save = (req, res, next) => {
  Category.exist(req.body.categoryName)
    .then(result => {
      if (result.length)
        return res.render("category_add.ejs", {
          currentUser: req.session.user.currentUser,
          message: "category already exists",
          alertClass: "Info"
        });
      else {
        let category = new Category(null, req.body.categoryName);
        category.save()
          .then(result => {
            if (result.affectedRows)
              return res.render("category_add.ejs", {
                currentUser: req.session.user.currentUser
              });

          })

          .catch(err => {
            console.log(err);

          })
      }
    })

    .catch(err => {
      console.log(err);
    })

}

export const list = (req, res, next) => {
  Category.fetch()
    .then(result => {
      return res.render("category_list.ejs", {
        currentUser: req.session.user.currentUser, 
        message: "", 
        categoryList: result

      })
    })
}

export const remove = (req, res, next) => {
  Category.delete(req.params.id)
    .then(result => {
      return res.redirect("/category/view")
    })
    .catch(err => {
      console.log(err);
    })
}

export const edit = (req, res, next) => {
  let categoryId = req.params.id;
  Category.findId(categoryId)
    .then(result => {
      if (result.length) {
        return res.render("category_edit.ejs", {
          currentUser: req.session.user.currentUser,
          category: result[0]
        });
      }
    })
    .catch(err => {
      console.log(err);
    })
}

export const update = (req,res,next)=>{
  let {id,categoryName} = req.body;
  let category = new Category(id,categoryName)
  category.update()
  .then(result=>{
    return res.redirect("/category/view");
  })
  .catch(err=>{
    console.log(err);
  })
}

export const saveCategory = async (req,res,next)=>{
  let categoryList = req.body;
  console.log(categoryList);  
  for(let categoryName of categoryList){
    let category = new Category(null,categoryName);
    await category.save();
  }
  console.log("Data saved...");
}

