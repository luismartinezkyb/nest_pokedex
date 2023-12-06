import { BadRequestException, Injectable } from '@nestjs/common';
import { PokemonResponse } from './interfaces/poke-response.interface';
import { PokemonService } from 'src/pokemon/pokemon.service';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FetchAdapter } from 'src/common/adapters/fetch.adapter';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name) private readonly pokemonModel: Model<Pokemon>,
    private readonly httpClient: FetchAdapter,
  ) {}
  // async executeSeed(): Promise<Pokemon[]> {
  //   const data = await http<PokemonResponse>(
  //     'https://pokeapi.co/api/v2/pokemon?limit=10&offset=0',
  //   );

  //   // BORRAR LOS REGISTROS DE LA TABLA
  //   await this.pokemonModel.deleteMany();

  //   // const data:PokemonResponse = await response.json<PokemonResponse>();
  //   const dataToInsert: Pokemon[] = [];
  //   data.results.forEach(({ name, url }) => {
  //     const segments = url.split('/');
  //     const no = +segments[segments.length - 2];

  //     dataToInsert.push({ name, no });
  //   });

  //   const dataInserted = await this.pokemonModel.insertMany(dataToInsert);
  //   return dataInserted;
  // }
  async executeSeed(): Promise<Pokemon[]> {
    const data = await this.httpClient.get<PokemonResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=10&offset=0',
    );
    // const data = await http<PokemonResponse>(
    //   'https://pokeapi.co/api/v2/pokemon?limit=10&offset=0',
    // );

    // BORRAR LOS REGISTROS DE LA TABLA
    await this.pokemonModel.deleteMany();

    // const data:PokemonResponse = await response.json<PokemonResponse>();
    const dataToInsert: Pokemon[] = [];
    data.results.forEach(({ name, url }) => {
      const segments = url.split('/');
      const no = +segments[segments.length - 2];

      dataToInsert.push({ name, no });
    });

    const dataInserted = await this.pokemonModel.insertMany(dataToInsert);
    return dataInserted;
  }
}

export async function http<T>(request: RequestInfo): Promise<T> {
  try {
    const response = await fetch(request);
    const body = await response.json();
    return body;
  } catch (error) {
    console.log(error);
    throw new BadRequestException('Something went wrong with the request');
  }
}
