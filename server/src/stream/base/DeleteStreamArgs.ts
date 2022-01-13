import { ArgsType, Field } from "@nestjs/graphql";
import { StreamWhereUniqueInput } from "./StreamWhereUniqueInput";

@ArgsType()
class DeleteStreamArgs {
  @Field(() => StreamWhereUniqueInput, { nullable: false })
  where!: StreamWhereUniqueInput;
}

export { DeleteStreamArgs };
