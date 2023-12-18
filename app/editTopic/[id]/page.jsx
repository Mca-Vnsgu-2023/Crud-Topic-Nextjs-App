import { TopicForm } from "../../../components/TopicForm";
import React from "react";
import { BASE_API_URL } from "../../../utils/constants";

const getTopicById = async (id) => {
  try {
    const res = await fetch(`${BASE_API_URL}/api/topics/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch topic");
    }

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export default async function EditTopic({params}) {

  const { id } = params;
  const { topic } = await getTopicById(id);


  return (
    <div>
        <TopicForm id={id} data={topic} />
    </div>
  );
};
