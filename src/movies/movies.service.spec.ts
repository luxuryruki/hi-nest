import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { NotFoundException } from '@nestjs/common';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe("getAll", ()=>{

    it("should return an array", ()=>{
      const result = service.getAll();

      expect(result).toBeInstanceOf(Array);
    })

  })

  describe("getOne", ()=>{
    it("should return a movie", ()=>{
      service.create({
        title: 'test',
        year: 2000,
        genres:['test']
      });
      const movie = service.getOne (1);
      expect(movie).toBeDefined();
    })
    it("should throw 404 error", ()=>{
      try{
        const movie = service.getOne (999);
      }catch(e){
        expect(e).toBeInstanceOf(NotFoundException);
      }
    })
  })

  describe("delete",()=>{
    it("delete a movie", ()=>{
      service.create({
        title: 'test',
        year: 2000,
        genres:['test']
      });
      const allMovies = service.getAll().length;
      service.delete(1)
      const afterDelete = service.getAll.length;
      expect(afterDelete).toBeLessThan(allMovies);
    });
    it("should throw 404 error", ()=>{
      try{
        const movie = service.delete(999);
      }catch(e){
        expect(e).toBeInstanceOf(NotFoundException);
      }
    })
  })

  describe("create",()=>{
    it("shoul create a movie",()=>{
      const beforeCreate = service.getAll().length;
      service.create({
        title: 'test',
        year: 2000,
        genres:['test']
      });
      const afterCreate = service.getAll().length;
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });
});