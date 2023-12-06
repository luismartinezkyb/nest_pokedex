import { BadGatewayException, Inject, Injectable } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name) private readonly pokemonModel: Model<Pokemon>,
  ) {}
  async create(createPokemonDto: CreatePokemonDto) {
    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    } catch (error) {
      throw new BadGatewayException('Something went wrong');
    }
  }

  // TODO: Implementar todo el crud de operaciones dentro de pokemon
  findAll() {
    return `This action returns all pokemon`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pokemon`;
  }

  update(id: number, updatePokemonDto: UpdatePokemonDto) {
    return `This action updates a #${id} pokemon`;
  }
  //Validar el deleteOne coun el count, si el count es 0 significa que no aplico a nada
  // de lo contrario signfica que si aplico el delete a los elementos que contó
  remove(id: number) {
    return `This action removes a #${id} pokemon`;
  }
}
