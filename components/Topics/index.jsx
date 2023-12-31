'use client'
import Navbar from "./Navbar";
import EmptyList from './EmptyList'
import { getCookie } from 'cookies-next';
import { useEffect, useState } from "react";
import { getAllTopics,deleteTopic } from './Utils/topicAction'
import Topics from './List'
import { toast } from "react-toastify";

function TopicsList() {
    const userId = getCookie('userId')
    const [topics, setTopics] = useState([])
    const [loading, setLoading] = useState(true)
    const [hasTopics, setHasTopics] = useState(false)

    const getTopicList = async () => {
        const res = await getAllTopics(userId)
        if (res.status == 200 && res.data.topic.length > 0 && Array.isArray(res.data.topic)) {
            const resData = res.data.topic
            setTopics(resData)
            setHasTopics(true)
        } else {
            setTopics([])
            setHasTopics(false)
        }
        setLoading(false)
    }

    const handleDelete=(id)=>{
        deleteTopic(id).then((res) => {
            if (res.status == 201) {
                toast.error("Record deleted ssuccessfully!", {
                    position: toast.POSITION.TOP_RIGHT, autoClose: 2000
                });
                getTopicList()
            }
        })
    }

    useEffect(() => {
        if (userId) {
            getTopicList()
        }
    }, [userId])

    return (
        <div>
            <div>
                <Navbar />
            </div>
            {loading ?
                <div className='d-flex justify-content-center align-items-center'>
                    <h3 className='text-center'>We are loading your list.</h3>
                </div>
                :
                hasTopics ?
                    <>
                        <Topics data={topics} handleDelete={handleDelete}/>
                    </>
                    : <EmptyList />
            }
        </div>
    )
}

export default TopicsList;
