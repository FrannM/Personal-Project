import http from 'http';
import cors from 'cors';
import express, { Express, Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import routes from '@/routes';
import mongoose from 'mongoose';
import { movieSchema, IMovie } from '@/models/movie';

import { userSchema, IUser } from './models/user';

const router: Express = express();

/** Middleware */
router.use(cors());
router.use(morgan('dev'));
router.use(express.urlencoded({ extended: false, limit: '1mb' }));
router.use(express.json({ limit: '5mb' }));
router.use((req: Request, res: Response, next: NextFunction) => {
    // set the CORS policy
    res.header('Access-Control-Allow-Origin', '*');
    // set the CORS headers
    res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization');
    // set the CORS method headers
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST');
        return res.status(200).json({});
    }
    next();
});

/** Routes */
router.use('/', routes);

/** Error handling */
router.use((req: Request, res: Response, next: NextFunction) => {
    const error = new Error('not found');
    return res.status(404).json({
        message: error.message
    });
});

/** Init MongoDB */
// mongoose.connect('mongodb://localhost:27017/mydatabase')
//     .then(() => console.log('Connected to MongoDB'))
//     .catch((error: any) => console.error('Error connecting to MongoDB:', error));

/** Función para sincronizar modelos */
async function syncModels() {
    try {
        await mongoose.connect('mongodb+srv://backend:duLBpHAID28f99w8@cluster0.n2k81wh.mongodb.net/OMDb');

        const existingModels: string[] = Object.keys(mongoose.connection.models);
        const expectedModels: string[] = ['User', 'Movie']; // Lista de modelos esperados en la base de datos

        // Elimina modelos que no coincidan con los esperados
        for (const modelName of existingModels) {
            if (!expectedModels.includes(modelName)) {
                delete (mongoose.connection.models as { [key: string]: any })[modelName];
            }
        }

        // Crea modelos faltantes
        for (const modelName of expectedModels) {
            if (!existingModels.includes(modelName)) {
                switch (modelName) {
                    case 'User':
                        mongoose.model<IUser>(modelName, userSchema);
                        break;
                    case 'Movie':
                        mongoose.model<IMovie>(modelName, movieSchema);
                        break;
                    default:
                        break;
                }
            }
        }

        console.log('Modelos sincronizados con éxito');
    } catch (error) {
        console.error('Error al sincronizar modelos:', error);
    }
}


/** Inicializa la sincronización de modelos */
syncModels();




/** Server */
const httpServer: http.Server = http.createServer(router);
const PORT: number = parseInt(process.env.BE_PORT ?? '6060');
httpServer.listen(PORT, () => console.log(`The server is running on port ${PORT}`));
