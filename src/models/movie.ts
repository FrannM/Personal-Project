import mongoose, { Schema, Document } from 'mongoose';

export interface IMovie extends Document {
    title: string;
    year: number;
    genres: string[];
    director: string;
    actors: string[];
    plot: string;
    imdbRating: number;
    ratings: { source: string, value: string }[];
    imdbID: string;
}

export const movieSchema: Schema = new Schema({
    title: { type: String, required: true },
    year: { type: Number, required: true },
    genres: { type: [String], required: true },
    director: { type: String, required: true },
    actors: { type: [String], required: true },
    plot: { type: String, required: true },
    imdbRating: { type: Number, required: true },
    ratings: [{ source: String, value: String }],
    imdbID: { type: String, required: true },
});

export default mongoose.model<IMovie>('Movie', movieSchema);
