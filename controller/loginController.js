const RegisterModel = require("../model/RegisterData");
const nodemailer = require("nodemailer");
const fs = require("fs");
const { use } = require("passport");
const jwt = require('jsonwebtoken')

const loginPage = async (req, res) => {
  try {
    if (res.locals.users) {
      return res.redirect("/admin");
    }
    return res.render("pages/login");
  } catch (err) {
    console.log(err);
    return false;
  }
};

const signupPage = async (req, res) => {
  try {
    return res.render("pages/signup");
  } catch (err) {
    console.log(err);
    return false;
  }
};

// api create user
const registerUser = async (req, res) => {
  try {
    const { name, email, password, cpassword, address, contact, role } =
      req.body;

    if (password == cpassword) {
      let user = await RegisterModel.create({
        name,
        email,
        address,
        contact,
        role,
        password,
        image: req.file.path,
      });
      return res.status(200).send({
        success: true,
        message: "User Create Successfully",
        user: user,
      });
    } else {
      console.log(`password not match`);
    }
  } catch (err) {
    return res.status(503).send({
      success: false,
      message: err,
    });
  }
};

// api for loginuser
const loginUser = async (req, res) => {
  try {
  let {email,password}=req.body;
  let user = await RegisterModel.findOne({email});
  
  let token = jwt.sign({paylod : user},"nd",{expiresIn : "1hr"});
  return res.status(200).send({
    success : true,
    message : `log in successful token create`,
    token : token,
  })

  } catch (err) {
    console.log(err);
    return res.status(503).send({
      success: false,
      message: err,
    });
  }
};

const logout = async (req, res) => {
  try {
    req.logout((err) => {
      if (err) {
        console.log(err);
        return res.status(503).send({
          success: false,
          message: "user not authorize",
        });
      }
      return res.status(200).send({
        success : true,
        message : 'succefull logout',
      });
    });
  } catch (err) {
    console.log(err);
    return false;
  }
};

const forgotpassword = async (req, res) => {
  try {
    return res.render("pages/forgotpassword");
  } catch (err) {
    console.log(err);
    return false;
  }
};

// otp send  
const UserEmailCheck = async (req, res) => {
  try {
    let email = req.body.email;
    let user = await RegisterModel.findOne({ email: email });
    console.log(user);
    if (user) {
      let otp = Math.floor(Math.random() * 10000);

      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "nd001second@gmail.com",
          pass: "bpiy aitu lauo oyyb",
        },
      });

      let mailOption = {
        from: "nd001second@gmail.com",
        to: email,
        subject: "otp",
        html: `dear ${email} your Otp is ${otp}`,
      };

      transporter.sendMail(mailOption, async (err, info) => {
        if (err) {
          console.log(err);
          return false;
        } else {
          console.log(`email sent on ${email}`);
          res.cookie("otp", {
            otp: otp,
            email: email,
          });
          // return res.redirect("/otp");
          // let mailotp = req.cookies.otp.otp;
         return res.status(200).send({
            success : true,
            message : "email match otp send",
            otp,
          })
        }
      });
    } else {
      console.log(`wrong email try again `);
      return res.redirect("back");
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

const otp = async (req, res) => {
  try {
    return res.render("pages/otp");
  } catch (err) {
    console.log(err);
    return false;
  }
};

// otp match api 
const userOtp = async (req, res) => {
  try {
    let userotp = req.body.otp;
    let mailotp = req.cookies.otp.otp;
    if (userotp == mailotp) {
      console.log(`match`);
      return res.status(200).send({
        success : true,
        message : 'otp match go ahed',
        mailotp 
      })
    } else {
      console.log(`wrong otp`);
      return res.status(503).send({
        success : false,
        message : 'Wrong otp',
        mailotp,
      })
    }
  } catch (err) {
    return res.status(503).send({
      success : false,
      message : 'otp not match'
    })
  }
};

const newpassword = async (req, res) => {
  try {
    return res.render("pages/newpassword");
  } catch (err) {
    console.log(err);
    return false;
  }
};

// new password api
const createnewpassword = async (req, res) => {
  try {
    const { newpassword, cnewpassword } = req.body;
    if (newpassword == cnewpassword) {
      let user = await RegisterModel.findOneAndUpdate(
        {email : req.cookies.otp.email},
        {password : newpassword,}
        );
      res.clearCookie("otp");
      return res.status(200).send({
        success : true,
        message : 'Password Create',
        user
      })
    } else {
      console.log(`password not match`);
      return res.status(503).send({
          success : false,
          message : 'Password not match'
        })
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

// profile page
const profile = (req, res) => {
  try {
    return res.render("pages/profile/profile");
  } catch (err) {
    console.log(err);
    return false;
  }
};

const edit = async (req, res) => {
  try {
    const userId = req.query.id;
    const user = await RegisterModel.findOne(userId);
    return res.render("pages/profile/edit", { user });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};

const updateprofile = async (req, res) => {
  try {
    const { id, name, email, address, contact, qualification, role } = req.body;
    let update = await RegisterModel.findOneAndUpdate(
      { _id: id },
      { name, email, address, contact, qualification, role }
    );

    return res.redirect("/profile");
  } catch (err) {
    console.log(err);
    return false;
  }
};

const updateprofileimg = async (req, res) => {
  try {
    const id = req.body.id;
    const old = await RegisterModel.findOne({ _id: id });

    if (!old) {
      console.log("User not found");
      return res.redirect("back");
    }

    if (!req.file) {
      console.log("No file uploaded");
      return res.redirect("back");
    }

    console.log(`if block run`);
    if (old.image) {
      fs.unlinkSync(old.image);
    }

    const update = await RegisterModel.findOneAndUpdate(
      { _id: id },
      { image: req.file.path }
    );
    console.log("Image updated:", update);

    return res.redirect("back");
  } catch (err) {
    console.error("Error updating profile image:", err);
    return res.redirect("back");
  }
};

const changepassword = async (req, res) => {
  try {
    return res.render("pages/profile/chagepassword");
  } catch (err) {
    console.log(err);
    return false;
  }
};

const changeloginPassword = async (req, res) => {
  try {
    let user = await RegisterModel.findOne({ email: req.body.email });
  
    if (user.password == currentpassword) {
      await RegisterModel.findOneAndUpdate(
        { email: req.body.email },
        { password: npassword }
      );
    }
    console.log(`password change`);
    return res.redirect("/profile");
  } catch (err) {
    console.log(err);
    return false;
  }
};
module.exports = {
  signupPage,
  registerUser,
  loginPage,
  loginUser,
  logout,
  forgotpassword,
  UserEmailCheck,
  otp,
  userOtp,
  newpassword,
  createnewpassword,
  profile,
  edit,
  updateprofile,
  updateprofileimg,
  changepassword,
  changeloginPassword,
};
