import {response, Router} from "express"
import { Organisation } from "../models/organisation.model.js";
import { User } from "../models/user.model.js";
import {userRouter} from "./user.routes.js";
import {body, validationResult} from "express-validator";
import {DataTypes, Op, or} from "sequelize";

export const organisationRouter = Router()

organisationRouter.post('/', async function (req, res){
    const name = req.body.name;

    try {

        const nameIsExist = await Organisation.findOne({ where: { name }});

        if (nameIsExist) {
            return res.status(409).json({message: "Une association porte déja ce nom !"})
        }
        const organisation = await Organisation.create(req.body);
        res.status(201).json(organisation)
    }catch (err) {
        console.error(err)
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

organisationRouter.patch('/:id', async function (req, res){
    const organisation = await Organisation.findByPk(req.params.id);
    if (organisation == null){
        return res.status(404).json({message: "L'organisation n'éxiste pas !"})
    }

    try {

        if (await Organisation.findOne({where: {name: req.body.name, id: {[Op.ne]: req.params.id}}})) {
            res.status(409).json({ message: "Le nom est déja utilisé"})
            return
        }

        organisation.name = req.body.name
        organisation.description = req.body.description
        organisation.country = req.body.country
        organisation.address = req.body.address
        organisation.isAuthorized = req.body.isAuthorized
        organisation.logo = req.body.logo

        await organisation.save()
        await organisation.reload()

        res.status(200).json({ message: "L'organisation a bien était modifier !" } )
    }catch (err) {
        res.status(500).json({ message: "Erreur lors de la modification de l'organisation !", err});
    }
})

organisationRouter.delete('/:id', async function (req, res){
    const organisation = await Organisation.findByPk(req.params.id);
    if (organisation == null){
        return res.status(404).json({message: "L'organisation n'éxiste pas !"})
    }
    await organisation.destroy()
    res.status(200).json({message: "L'organisation a été supprimer !"})
})