import * as React from "react";
import { Create, SimpleForm, CreateProps, TextInput } from "react-admin";

export const VideoCreate = (props: CreateProps): React.ReactElement => {
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput label="title" source="title" />
        <TextInput label="file_name" source="fileName" />
      </SimpleForm>
    </Create>
  );
};
