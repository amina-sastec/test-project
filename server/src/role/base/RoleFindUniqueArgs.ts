import { ArgsType, Field } from "@nestjs/graphql";
import { RoleWhereUniqueInput } from "./RoleWhereUniqueInput";

@ArgsType()
class RoleFindUniqueArgs {
  @Field(() => RoleWhereUniqueInput, { nullable: false })
  where!: RoleWhereUniqueInput;
}

export { RoleFindUniqueArgs };
