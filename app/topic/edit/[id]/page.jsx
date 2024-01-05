import { TopicForm } from "../../../../components/Topics/TopicForm";
import React from "react";
import { BASE_API_URL } from "../../../../utils/constants";



export default async function EditTopic() {

  return (
    <div>
        <TopicForm  forEdit={true} />
    </div>
  );
};
