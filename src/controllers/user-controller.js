'use strict'

const repository = require('../repositories/user-repository');
const md5 = require('md5');
const authService = require('../services/auth-service');

exports.post = async(req,res,next) =>{
  try {
      await repository.create({
        name:req.body.name,
        email:req.body.email,
        password:md5(req.body.password + global.SALT_KEY),
        account:req.body.account
      });
      res.status(201).send({message: 'usuário cadastrado'});
  } catch (e) {
    res.status(404).send({
      message:'Falha na requisição'+e
    })
  }
};

exports.authenticate = async(req,res,next) =>{
  try {
      console.log('teste');
      const user = await repository.authenticate({
        email:req.body.email,
        password:md5(req.body.password + global.SALT_KEY)
      });
      if(!user){
        res.status(404).send({
          message:'Aaaah não, usuário ou senha inválidos'
        });
        return;
      }
      const token = await authService.generateToken({
        email:user.email,
        name:user.name,
        account:user.account
      });
      res.status(200).send({
        token: token,
        data:{
          id:user._id,
          email:user.email,
          name:user.name,
          account:user.account
        }
    });
  } catch (e) {
    res.status(400).send({
      message:'Falha no auth'+e
    });
  }
};
