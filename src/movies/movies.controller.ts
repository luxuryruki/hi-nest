import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movies.dto';

@Controller('movies')
export class MoviesController {

    constructor(private readonly movieService: MoviesService){}

    @Get()
    getAll() {
        return this.movieService.getAll();
    }

    @Get('/read/:id')
    getOne(@Param('id') id: number){
        return this.movieService.getOne(id);
    }

    @Post('/create')
    create(@Body() movieData : CreateMovieDto){
        
        return this.movieService.create(movieData);
    }

    @Get("search")
    search(@Query('name') name:string){
        return `Searching : ${name}`;
    }

    @Delete('/delete/:id')
    delete(@Param('id') id: number){
        return this.movieService.delete(id);
    }
}
