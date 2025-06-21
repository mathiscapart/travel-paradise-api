import {Router} from "express"
import {Reservation} from "../models/reservation.model.js";
import {Organisation} from "../models/organisation.model.js";
import {organisationRouter} from "./organisation.routes.js";
import {Op} from "sequelize";

export const reservationRouter = Router()

reservationRouter.post('/', async function (req, res){

    try {
        const reservation = await Reservation.create(req.body);
        res.status(201).json(reservation)
    }catch (err) {
        console.error(err)
        res.status(500).json({ message: "Erreur lors de la création de la reservation !", err});
    }
})

reservationRouter.get('/', async function(req, res){
    const reservations = await Reservation.findAll();
    res.status(200).json(reservations)
})

reservationRouter.get('/:id', async function(req, res){
    const reservation = await Reservation.findByPk(req.params.id);
    if (reservation == null){
        return res.status(404).json({message: "la reservation n'éxiste pas !"})
    }
    res.status(200).json(reservation)
})

reservationRouter.patch('/:id', async function (req, res){
    const reservation = await Reservation.findByPk(req.params.id);
    if (reservation == null){
        return res.status(404).json({message: "L'organisation n'éxiste pas !"})
    }

    try {

        reservation.name = req.body.name
        reservation.description = req.body.description
        reservation.country = req.body.country
        reservation.address = req.body.address
        reservation.isAuthorized = req.body.isAuthorized
        reservation.logo = req.body.logo

        await reservation.save()
        await reservation.reload()

        res.status(200).json({ message: "La reservation a bien était modifier !" } )
    }catch (err) {
        res.status(500).json({ message: "Erreur lors de la modification de la reservation !", err});
    }
})

reservationRouter.delete('/:id', async function (req, res){
    const reservation = await Reservation.findByPk(req.params.id);
    if (reservation == null){
        return res.status(404).json({message: "La reservation n'éxiste pas !"})
    }
    await reservation.destroy()
    res.status(200).json({message: "La reservation a été supprimer !"})
})
