import { Router } from "express"
import {UserModel} from "../models/user.model.js";

export const userRouter = Router()

userRouter.post('/', async function (req, res){

    try {
        const user = await UserModel.create({
            lastName: req.body.lastName,
            firstName: req.body.firstName,
            country: req.body.country,
            phone: req.body.phone,
            organisationId: req.body.organisationId,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role,
            language: req.body.language
        });
        res.status(201).json(user)
    }catch (err) {
        res.status(500).json({ message: "Erreur lors de la création de l'utilisateur !", err});
    }
})