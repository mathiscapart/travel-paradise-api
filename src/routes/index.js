const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const app = express();
const jwt = require('jsonwebtoken');
const { models } = require('../models');
const errorMiddleware = require('../middlewares/errorHandler.js');



app.use(bodyParser.json());

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await models.User.findOne({ where: { email } });

    if (!user) return res.status(404).send('Utilisateur non trouvé');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).send('Mot de passe invalide');

    const token = jwt.sign(
        { id: user.id, email: user.email, lastName: user.lastName, firstName: user.firstName, avatar: user.avatar , role: user.role },
        process.env.JWT_SECRET || 'supersecret123',
        { expiresIn: '1h' }
    );

    res.json({ token });
});

const myToken = function (req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).send('Token non fourni');

    const token = authHeader.split(' ')[1];

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET || 'supersecret123');
        next();
    } catch (err) {
        console.log(err);
        return res.status(401).send('Token non valide');
    }
};

app.use('/users', userRouter);
app.use(myToken)

app.get('/error', () => {
    throw new Error('This is a forced error!');
});

app.use(errorMiddleware)

module.exports = app;