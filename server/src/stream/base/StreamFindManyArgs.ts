import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { StreamWhereInput } from "./StreamWhereInput";
import { Type } from "class-transformer";
import { StreamOrderByInput } from "./StreamOrderByInput";

@ArgsType()
class StreamFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => StreamWhereInput,
  })
  @Field(() => StreamWhereInput, { nullable: true })
  @Type(() => StreamWhereInput)
  where?: StreamWhereInput;

  @ApiProperty({
    required: false,
    type: StreamOrderByInput,
  })
  @Field(() => StreamOrderByInput, { nullable: true })
  @Type(() => StreamOrderByInput)
  orderBy?: StreamOrderByInput;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @Field(() => Number, { nullable: true })
  @Type(() => Number)
  skip?: number;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @Field(() => Number, { nullable: true })
  @Type(() => Number)
  take?: number;
}

export { StreamFindManyArgs };
