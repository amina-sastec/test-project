import * as React from "react";
import { Edit, SimpleForm, EditProps, TextInput } from "react-admin";

export const VideoEdit = (props: EditProps): React.ReactElement => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput label="title" source="title" />
        <TextInput label="file_name" source="fileName" />
      </SimpleForm>
    </Edit>
  );
};
