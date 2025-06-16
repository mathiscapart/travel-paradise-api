import {response, Router} from "express"
import { Organisation } from "../models/organisation.model.js";
import { User } from "../models/user.model.js";
import {userRouter} from "./user.routes.js";

export const organisationRouter = Router()

organisationRouter.post('/', async function (req, res){
    try {
        const organisation = await Organisation.create(req.body);
        const userId = req.body.users;
        const usersFound = await User.findAll({where: {id: userId}});
        const nameIsExist = await User.findOne({ where: { name }});

        if (nameIsExist) {
            return res.status(409).json({message: "Une association porte déja ce nom !"})
        }

        if (usersFound.length !== userId.length) {
            res.status(400).json({ message: "Certains utilisateurs n'éxistent pas."});
            return
        }

        res.status(201).json(organisation)
    }catch (err) {
        res.status(500).json({ message: "Erreur lors de la création de l'organisation !", err});
    }
})

organisationRouter.get('/', async function(req, res){
    const organisations = await Organisation.findAll();
    res.status(200).json(organisations)
})

organisationRouter.get('/:id', async function(req, res){
    const organisation = await Organisation.findByPk(req.params.id);
    if (organisation == null){
        return res.status(404).json({message: "l'organisation n'éxiste pas !"})
    }
    res.status(200).json(organisation)
})

organisationRouter.delete('/:id', async function (req, res){
    const organisation = await Organisation.findByPk(req.params.id);
    if (organisation == null){
        return res.status(404).json({message: "L'organisation n'éxiste pas !"})
    }
    await organisation.destroy()
    res.status(200).json({message: "L'organisation a été supprimer !"})
})