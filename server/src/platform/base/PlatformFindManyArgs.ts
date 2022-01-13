import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { PlatformWhereInput } from "./PlatformWhereInput";
import { Type } from "class-transformer";
import { PlatformOrderByInput } from "./PlatformOrderByInput";

@ArgsType()
class PlatformFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => PlatformWhereInput,
  })
  @Field(() => PlatformWhereInput, { nullable: true })
  @Type(() => PlatformWhereInput)
  where?: PlatformWhereInput;

  @ApiProperty({
    required: false,
    type: PlatformOrderByInput,
  })
  @Field(() => PlatformOrderByInput, { nullable: true })
  @Type(() => PlatformOrderByInput)
  orderBy?: PlatformOrderByInput;

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

export { PlatformFindManyArgs };
