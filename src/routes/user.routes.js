import {response, Router} from "express"
import { User } from "../models/user.model.js";
import {body, validationResult} from "express-validator";
import {Op} from "sequelize";

export const userRouter = Router()

userRouter.post('/', body('email').isEmail().trim(), async function (req, res){
    try {
        const result = validationResult(req)
        if (!result.isEmpty()){
            res.status(422).json({message: "L'émail est invalide !"})
            return
        }

        if (await User.findOne({where: {email: req.body.email}})) {
            res.status(409).json({ message: "L'émail est déja utilisé"})
            return
        }

        if (await User.findOne({where: {phone: req.body.phone}})) {
            res.status(409).json({ message: "Le numéro de téléphone est déja utilisé"})
            return
        }
        const user = await User.create(req.body);
        res.status(201).json(user)
    }catch (err) {
        res.status(500).json({ message: "Erreur lors de la création de l'utilisateur !", err});
    }
})

userRouter.get('/', async function(req, res){
    const users = await User.findAll();
    res.status(200).json(users)
})

userRouter.get('/:id', async function(req, res){
    const user = await User.findByPk(req.params.id);
    if (user == null){
        return res.status(404).json({message: "l'utilisateur n'éxiste pas !"})
    }
    res.status(200).json(user)
})

userRouter.patch('/:id', body('email').optional().isEmail().trim().normalizeEmail(), async function (req, res){
    const user = await User.findByPk(req.params.id);
    if (user == null){
        return res.status(404).json({message: "L'utilisateur n'éxiste pas !"})
    }

    try {
        const result = validationResult(req)
        if (!result.isEmpty()){
            res.status(422).json({message: "L'émail est invalide !"})
            return
        }

        const newEmail = req.body.email?.trim().toLowerCase();
        const currentEmail = user.email?.trim().toLowerCase();

        if (newEmail && newEmail !== currentEmail) {
            const existingtEmailUser = await User.findOne({
                where: { email: newEmail, id: { [Op.ne]: user.id } }
            });
            if (existingtEmailUser) {
                res.status(409).json({ message: "L'email est déja utilisé" })
                return
            }
            user.email = newEmail;
        }

        if (req.body.phone && req.body.phone !== user.phone) {
            const existingPhoneUser = await User.findOne({
                where: { phone: req.body.phone, id: { [Op.ne]: user.id } }
            });
            if (existingPhoneUser) {
                res.status(409).json( { message: "Le numéro de téléphone est déja utilisé" });
                return
            }
            user.phone = req.body.phone;
        }

        user.lastName = req.body.lastName ?? user.lastName;
        user.firstName = req.body.firstName ?? user.firstName;
        user.country = req.body.country ?? user.country;
        user.password = req.body.password ?? user.password;
        user.role = req.body.role ?? user.role;
        user.language = req.body.language ?? user.language;
        user.avatar = req.body.avatar ?? user.avatar;

        await user.save()
        await user.reload()
        res.status(200).json({ message: "L'user a bien était modifié !"} )
    }catch (err) {
        res.status(500).json({ message: "Erreur lors de la modification de l'utilisateur !", err});
    }
})

userRouter.delete('/:id', async function (req, res){
    const user = await User.findByPk(req.params.id);
    if (user == null){
        return res.status(404).json({message: "L'utilisateur n'éxiste pas !"})
    }
    await user.destroy()
    res.status(200).json({message: "L'utilisateur a été supprimer !"})
})
