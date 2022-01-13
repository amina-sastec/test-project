import { ArgsType, Field } from "@nestjs/graphql";
import { PlatformWhereUniqueInput } from "./PlatformWhereUniqueInput";

@ArgsType()
class PlatformFindUniqueArgs {
  @Field(() => PlatformWhereUniqueInput, { nullable: false })
  where!: PlatformWhereUniqueInput;
}

export { PlatformFindUniqueArgs };
