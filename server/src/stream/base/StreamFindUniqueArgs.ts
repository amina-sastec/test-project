import { ArgsType, Field } from "@nestjs/graphql";
import { StreamWhereUniqueInput } from "./StreamWhereUniqueInput";

@ArgsType()
class StreamFindUniqueArgs {
  @Field(() => StreamWhereUniqueInput, { nullable: false })
  where!: StreamWhereUniqueInput;
}

export { StreamFindUniqueArgs };
