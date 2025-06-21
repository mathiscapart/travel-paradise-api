import {Router} from "express"
import { Visite } from "../models/visite.model.js";
import {listeEquipement} from "../models/listeEquipement.model.js";

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

visiteRouter.patch('/:id', async function (req, res){
    const visite = await Visite.findByPk(req.params.id);
    const Equipement = await listeEquipement.findByPk(req.params.id);
    if (Equipement == null){
        return res.status(404).json({message: "L'équipement n'éxiste pas !"})
    }

    try {
        visite.name = req.body.name
        visite.image = req.body.image
        visite.country = req.body.country
        visite.address = req.body.address
        visite.town = req.body.town
        visite.price = req.body.price
        visite.ListeEquipements = req.body.ListeEquipement
        visite.duration = req.body.duration
        await visite.save()
        await visite.reload()
        res.status(200).json({ message: "La visite a bien était modifié !"} )
    }catch (err) {
        res.status(500).json({ message: "Erreur lors de la modification de la visite !", err});
    }
})

visiteRouter.get('/', async function(req, res){
    const visites = await Visite.findAll();
    res.status(200).json(visites)
})

visiteRouter.get('/:id', async function(req, res){
    const visite = await Visite.findByPk(req.params.id);
    if (visite == null){
        return res.status(404).json({message: "la visite n'éxiste pas !"})
    }
    res.status(200).json(visite)
})

visiteRouter.delete('/:id', async function (req, res){
    const visite = await Visite.findByPk(req.params.id);
    if (visite == null){
        return res.status(404).json({message: "La visite n'éxiste pas !"})
    }
    await visite.destroy()
    res.status(200).json({message: "La visite a été supprimer !"})
})