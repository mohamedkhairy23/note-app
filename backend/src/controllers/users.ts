import { RequestHandler } from "express";
import createHttpError from "http-errors";
import UserModel from "../models/user";
import bcrypt from "bcrypt";

export const getAuthUser: RequestHandler = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.session.userId)
      .select("+email")
      .exec();

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

interface SignUpBody {
  username?: string;
  email?: string;
  password?: string;
}

export const signUp: RequestHandler<
  unknown,
  unknown,
  SignUpBody,
  unknown
> = async (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const passwordRaw = req.body.password;

  try {
    if (!username || !email || !passwordRaw) {
      throw createHttpError(400, "All fields required");
    }

    const existingUsername = await UserModel.findOne({
      username: username,
    }).exec();
    if (existingUsername) {
      throw createHttpError(
        409,
        "User with that username already exist. try another one"
      );
    }

    const existingEmail = await UserModel.findOne({
      email: email,
    }).exec();
    if (existingEmail) {
      throw createHttpError(409, "User with that email already exist");
    }

    const hashedPassword = await bcrypt.hash(passwordRaw, 10);

    const newUser = await UserModel.create({
      username: username,
      email: email,
      password: hashedPassword,
    });

    req.session.userId = newUser._id;

    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
};

interface LoginBody {
  username?: string;
  password?: string;
}

export const login: RequestHandler<
  unknown,
  unknown,
  LoginBody,
  unknown
> = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    if (!username || !password) {
      throw createHttpError(400, "All fields required");
    }

    const user = await UserModel.findOne({ username: username })
      .select("+password +email")
      .exec();
    if (!user) {
      throw createHttpError(401, "User doesn't exists");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw createHttpError(401, "Wrong password");
    }

    req.session.userId = user._id;

    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

export const logout: RequestHandler = (req, res, next) => {
  req.session.destroy((error) => {
    if (error) {
      next(error);
    } else {
      res.sendStatus(200);
    }
  });
};
