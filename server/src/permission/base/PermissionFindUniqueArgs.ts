import { ArgsType, Field } from "@nestjs/graphql";
import { PermissionWhereUniqueInput } from "./PermissionWhereUniqueInput";

@ArgsType()
class PermissionFindUniqueArgs {
  @Field(() => PermissionWhereUniqueInput, { nullable: false })
  where!: PermissionWhereUniqueInput;
}

export { PermissionFindUniqueArgs };
