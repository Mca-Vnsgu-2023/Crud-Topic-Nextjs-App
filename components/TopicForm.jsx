'use client'
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";


export const TopicForm = ({ id, data }) => {

  const { register, handleSubmit, setValue } = useForm()
  const router = useRouter()

  const AddTopic = async (inputData) => {
    if (inputData?.title || inputData?.description !== '') {
      try {
        const res = await fetch('http://localhost:3000/api/topics', {
          method: "POST",
          headers: {
            "content-type": "application/json"
          },
          body: JSON.stringify(inputData)
        })
        if (res.ok) {
          toast.success("Record added successfully !", {
            position: toast.POSITION.TOP_RIGHT
          });
          router.push('/')
          router.refresh();
        } else {
          throw new Error("Your data is not created.")
        }
      } catch (error) {
        console.log(error);
      }
    }
    else {
      alert("Title and description are required.")
    }
  }

  const EditTopic = async ({ id, inputData }) => {
    try {
      const res = await fetch(`http://localhost:3000/api/topics/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(inputData),
      });
      if (!res.ok) {
        throw new Error("Failed to update topic");
      }
      toast.success("Record updated successfully !", {
        position: toast.POSITION.TOP_RIGHT
      });
      router.push("/");
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id && data !== null) {
      setValue('title', data?.title);
      setValue('description', data?.description);
    }
  }, [])

  const onSubmit = async (inputData) => {

    if (id !== null) {
      await EditTopic({ id, inputData })
      console.log("edit:", inputData);

    }
    else {
      await AddTopic(inputData)
    }
  }

  return (
    <div>
      {id == null ?
        (
          <div>
            <h3>Add Topic</h3>
          </div>
        ) :
        (
          <div>
            <h3>Edit Topic</h3>
          </div>
        )
      }

      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text"
          className="form-control mb-3"
          placeholder="Topic Title"
          {...register('title')}
        />
        <textarea type="text"
          className="form-control mb-3"
          placeholder="Topic Description"
          {...register('description')}
        />

        {id == null ?
          (<button className="btn btn-primary">
            Save
          </button>
          ) :
          (<button className="btn btn-success">
            Save
          </button>)
        }
      </form>
    </div>
  );
};
