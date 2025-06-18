import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movies.entity';
import { CreateMovieDto } from './dto/create-movies.dto';

@Injectable()
export class MoviesService {
    private movies: Movie[] = [];

    create(movieData: CreateMovieDto){
        this.movies.push({
            id: this.movies.length + 1,
            ...movieData
        });
 
    }

    getAll(): Movie[]{
        return this.movies;
    }
 
    getOne(id:number) : Movie{
        const movie = this.movies.find(movie => movie.id === +id);
        if(!movie){
            throw new NotFoundException(`Movie with ID ${id} not found.`);
        }
        return movie;
    }

    delete(id: number) : boolean{
        this.movies.filter(movie => movie.id !== +id);
        return true;
    }

}
