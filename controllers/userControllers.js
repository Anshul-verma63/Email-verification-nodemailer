import catchAsychError from "../middleware/catchAsyncError.js";
import userModel from "../models/userModel.js";
import ErrorHandler from "../middleware/error.js";
import nodemailer from "nodemailer";

const sendMail = (userid, email, res) => {
  const transport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const mailOption = {
    from: process.env.Email,
    to: email,
    subject: "Email VERIFICATION",
    html: `To verify your mail <a href="https://email-verification-nodemailer.onrender.com/api/v1/user/verify/${userid}">Verify_here</a>`,
  };

  transport.sendMail(mailOption, (error, info) => {
    if (error) {
      return res.status(404).send({
        success: false,
        message: "Error while send Email: Somthing went wrong",
      });
    }
    res.status(200).json({
      success: true,
      message: "Email send!",
    });
  });
};
export const userRegistration = catchAsychError(async (req, res, next) => {
  const isExist = await userModel.findOne({ email: req.body.email });
  if (isExist) {
    return next(new ErrorHandler("User already exist! please login", 404));
  }

  const newUser = await new userModel(req.body).save();

  await sendMail(newUser._id, newUser.email, res);
  return res.status(200).send({
    success: true,
    message: "user registered",
    newUser,
  });
});

//verify email
export const verifyEmail = catchAsychError(async (req, res, next) => {
  console.log(req.params.userid);

  const user = await userModel.findOne({ _id: req.params.userid });
  if (!user) {
    return next(new ErrorHandler("Email not valid!", 404));
  }

  user.isVerified = true;
  await user.save();
  return res.status(200).json({
    message: "Your email verified please login",
  });
});
