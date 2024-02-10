import axios from 'axios';
import { Request, Response, NextFunction } from 'express'

require('dotenv').config()

async function getByTitle(req: Request, res: Response, next: NextFunction) {
    try {
        const title = req.params.title;

        if (!title) {
            res.status(400).send('Title is required');
            return;
        }

        const movie = await axios.get(`https://www.omdbapi.com/?t=${title}&apikey=${process.env.API_KEY}`);
        console.log(movie.data)
        return res.status(200).send(movie.data);
    } catch (error) {
        res.status(401).send('An error occurred while fetching the movie. Please try again later.');
    }
}

async function getByImdbId(req: Request, res: Response, next: NextFunction) {
    try {
        const imdbId = req.params.imdbId;

        if (!imdbId) {
            res.status(400).send('IMDB ID is required');
            return;
        }

        const movie = await axios.get(`https://www.omdbapi.com/?i=${imdbId}&apikey=${process.env.API_KEY}`);
        return res.status(200).send(movie.data);

    } catch (error) {
        res.status(401).send('An error occurred while fetching the movie. Please try again later.');
    }
}

async function getBySearch(req: Request, res: Response, next: NextFunction) {
    try {
        const search = req.params.search;

        if (!search) {
            res.status(400).send('Search is required');
            return;
        }

        const movie = await axios.get(`https://www.omdbapi.com/?s=${search}&apikey=${process.env.API_KEY}`);
        return res.status(200).send(movie.data);
    } catch (error) {
        res.status(401).send('An error occurred while fetching the movie. Please try again later.');
    }
}

export default { getByTitle, getByImdbId, getBySearch }