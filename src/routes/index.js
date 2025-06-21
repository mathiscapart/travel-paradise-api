import express from 'express';
import bodyParser from "body-parser";
import bcrypt from 'bcrypt';
const app = express();
import jwt from 'jsonwebtoken';
import { sequelize } from '../models/index.js';
import {userRouter} from "./user.routes.js";
import {organisationRouter} from "./organisation.routes.js";
import {visiteRouter} from "./visite.routes.js";

app.use(bodyParser.json());

// app.use((req, res, next) => {
//      res.header('Access-Control-Allow-Origin', '*');
//      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
//      if (req.method === 'OPTIONS') {
//          return res.sendStatus(200);
//      }
//      next();
// });
//
// app.post('/login', async (req, res) => {
//      try {
//          const { email, password } = req.body;
//
//          console.log('Tentative de connexion pour:', email);
//
//          const user = await sequelize.models.User.findOne({ where: { email } });
//
//          if (!user) {
//              console.log('Utilisateur non trouvé:', email);
//              return res.status(404).json({ error: 'Utilisateur non trouvé' });
//          }
//
//          const isPasswordValid = await bcrypt.compare(password, user.password);
//          if (!isPasswordValid) {
//              console.log('Mot de passe invalide pour:', email);
//              return res.status(401).json({ error: 'Mot de passe invalide' });
//          }
//
//          const token = jwt.sign(
//              {
//                  id: user.id,
//                  email: user.email,
//                  lastName: user.lastName,
//                  firstName: user.firstName,
//                  avatar: user.avatar,
//                  role: user.role
//              },
//              process.env.JWT_SECRET || 'supersecret123',
//              { expiresIn: '1h' }
//          );
//
//          console.log('Connexion réussie pour:', email); // Debug
//          res.json({ token });
//
//      } catch (error) {
//          console.error('Erreur lors de la connexion:', error);
//          res.status(500).json({ error: 'Erreur serveur' });
//      }
// });
//
// const myToken = function (req, res, next) {
//      const authHeader = req.headers.authorization;
//      if (!authHeader) return res.status(401).json({ error: 'Token non fourni' });
//
//      const token = authHeader.split(' ')[1];
//      try {
//          req.user = jwt.verify(token, process.env.JWT_SECRET || 'supersecret123');
//          next();
//      } catch (err) {
//          console.log(err);
//          return res.status(401).json({ error: 'Token non valide' });
//      }
// };
//
// app.use('/users', myToken, userRouter);
app.use('/users', userRouter);
app.use('/organisations', organisationRouter);
app.use('/visites', visiteRouter);

app.get('/error', (req, res) => {
    throw new Error('This is a forced error!');
});

export { app };
