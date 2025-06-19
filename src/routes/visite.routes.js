import {Router} from "express"
import { Visite } from "../models/visite.model.js";
import {User} from "../models/user.model.js";
import {userRouter} from "./user.routes.js";

export const visiteRouter = Router()

visiteRouter.post('/', async function (req, res){

    try {
        const visite = await Visite.create(req.body);
        res.status(201).json(visite)
    }catch (err) {
        console.error(err)
        res.status(500).json({ message: "Erreur lors de la création de la visite !", err});
    }
})

visiteRouter.get('/', async function(req, res){
    const visites = await Visite.findAll();
    res.status(200).json(visites)
})

visiteRouter.get('/:id', async function(req, res){
    const visite = await User.findByPk(req.params.id);
    if (visite == null){
        return res.status(404).json({message: "l'utilisateur n'éxiste pas !"})
    }
    res.status(200).json(user)
})
