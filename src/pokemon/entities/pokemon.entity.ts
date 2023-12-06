import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Pokemon {
  @Prop({
    unique: true,
    index: true,
  })
  name: string;
  @Prop()
  no: number;
}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);
