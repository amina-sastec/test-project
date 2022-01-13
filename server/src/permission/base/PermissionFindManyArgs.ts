import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { PermissionWhereInput } from "./PermissionWhereInput";
import { Type } from "class-transformer";
import { PermissionOrderByInput } from "./PermissionOrderByInput";

@ArgsType()
class PermissionFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => PermissionWhereInput,
  })
  @Field(() => PermissionWhereInput, { nullable: true })
  @Type(() => PermissionWhereInput)
  where?: PermissionWhereInput;

  @ApiProperty({
    required: false,
    type: PermissionOrderByInput,
  })
  @Field(() => PermissionOrderByInput, { nullable: true })
  @Type(() => PermissionOrderByInput)
  orderBy?: PermissionOrderByInput;

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

export { PermissionFindManyArgs };
