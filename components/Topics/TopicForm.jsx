'use client'
import { getCookie } from 'cookies-next';
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Navbar from "./Navbar";
import { addTopics, editTopic, getTopicById } from "./Utils/topicAction";


export const TopicForm = (props) => {

  const { forEdit } = props
  const { register, handleSubmit, setValue } = useForm()
  const router = useRouter()
  const userId = getCookie('userId')
  const params = useParams()
  const id = params.id

  useEffect(() => {
    if (forEdit) {
      getTopicById(id).then((res) => {
        const data = res?.data?.topic
        setValue('title', data?.title);
        setValue('description', data?.description);
      })
    }
  }, [forEdit])

  const onCancel = () => {
    router.push('/')
  }

  const onSubmit = (inputData) => {
    if (inputData?.title || inputData?.description !== '') {
      const finalData = {
        title: inputData.title,
        description: inputData.description,
        userId: userId
      }
      if (forEdit) {
        editTopic({ id: id, inputData: finalData }).then((res) => {
          if (res.status == 200) {
            toast.success("Record edited successfully !", {
              position: toast.POSITION.TOP_RIGHT, autoClose: 2000
            });
            router.push('/')
            router.refresh();
          }
        })
      } else {
        addTopics(finalData).then((res) => {
          if (res.status == 200) {
            toast.success("Record added successfully !", {
              position: toast.POSITION.TOP_RIGHT, autoClose: 2000
            });
            router.push('/')
            router.refresh();
          }
        })
      }
    }
  }

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <h3>
        {forEdit ? `Edit Topic` : `Add Topic`}
      </h3>
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

        <div className='d-flex justify-content-between group mt-4'>
          {forEdit && id ?
            <button className="btn btn-primary" >Update</button>
            :
            <button className="btn btn-success" >Save</button>
          }
          <button className="btn btn-danger" type='button' onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};
