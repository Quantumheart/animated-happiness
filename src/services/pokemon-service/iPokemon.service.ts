import {Pokemon} from "../../entity/pokemon.entity";

export interface IPokemonService {
    getAll(): Promise<Pokemon[]>
    getByName(name: string): Promise<Pokemon>
    getById(id: number): Promise<Pokemon>
}