import { PlatformWhereInput } from "./PlatformWhereInput";
import { PlatformOrderByInput } from "./PlatformOrderByInput";

export type PlatformFindManyArgs = {
  where?: PlatformWhereInput;
  orderBy?: PlatformOrderByInput;
  skip?: number;
  take?: number;
};
