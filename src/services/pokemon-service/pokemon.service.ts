import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Pokemon} from "../../entity/pokemon.entity";
import {Repository} from "typeorm";
import {IPokemonService} from "./iPokemon.service";

@Injectable()
export class PokemonService implements IPokemonService {
    constructor(@InjectRepository(Pokemon) private readonly pokemonRepository: Repository<Pokemon>) {
    }
    
    searchPokemon(): Promise<Pokemon[]> {
        return this.pokemonRepository.find();
    }

    getAll(): Promise<Pokemon[]> {
        return this.pokemonRepository.find();
    }

    getByName(name: string): Promise<Pokemon> {
        return this.pokemonRepository.findOne({name})
    }

    getById(id: number): Promise<Pokemon> {
        return this.pokemonRepository.findOne({id});
    }
}
