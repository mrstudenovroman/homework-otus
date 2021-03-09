import express from 'express';
import jwt from 'jsonwebtoken';
import passportJWT from 'passport-jwt';

import { UserModel } from '../models/user';

const publicRoute = express.Router();
const { ExtractJwt } = passportJWT;
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY as string,
};

publicRoute.post('/signup', (req, res) => {
  UserModel.findOne({ email: req.body.email }, null, null, (error, user) => {
    if (error) throw error;
    if (user) {
      return res.status(401).send({
        status: 'ERROR_EMAIL',
      });
    }

    const userModel = new UserModel({
      email: req.body.email,
      password: req.body.password,
    });

    userModel.save((err) => {
      if (err) throw err;
    });

    const payload = { email: req.body.email };
    const token = jwt.sign(payload, jwtOptions.secretOrKey);

    return res.status(200).send({ token, status: 'SUCCESS' });
  });
});

publicRoute.post('/signin', (req, res) => {
  UserModel.findOne({ email: req.body.email }, null, null, (error, user) => {
    if (error) throw error;
    if (user === null) {
      return res.status(401).send({ status: 'ERROR_EMAIL_OR_PASSWORD' });
    }

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (err) throw err;
      if (!isMatch) {
        return res.status(401).send({ status: 'ERROR_EMAIL_OR_PASSWORD' });
      }
      const payload = { email: req.body.email };
      const token = jwt.sign(payload, jwtOptions.secretOrKey);
      return res.status(200).send({ token, status: 'SUCCESS' });
    });
  });
});

export default publicRoute;
