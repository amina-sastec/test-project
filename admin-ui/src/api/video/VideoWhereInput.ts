import { StringFilter } from "../../util/StringFilter";
import { StringNullableFilter } from "../../util/StringNullableFilter";

export type VideoWhereInput = {
  id?: StringFilter;
  title?: StringNullableFilter;
  fileName?: StringNullableFilter;
};
