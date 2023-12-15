import React from "react";
import { RemoveBtn } from "./RemoveBtn";
import Link from "next/link";
import { HiPencilAlt } from 'react-icons/hi'
import styles from './main.module.scss'
import moment from "moment";


const getTopics = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/topics", {
        cache: "no-store",
      });
  
      if (!res.ok) {
        throw new Error("Failed to fetch topics");
      }
  
      return res.json();
    } catch (error) {
      console.log("Error loading topics: ", error);
    }
  };

export default async function TopicList() {

    const { topics } = await getTopics()

    return (
        <div>
            {topics?.map((item, index) => (
                <div className="card mb-3" style={{ display: 'flex', paddingLeft: '10px', paddingRight: '10px' }} key={index + 1}>
                    <div className="row">
                        <div className="card-body" style={{ display: 'flex', paddingBottom: '0px' }}>
                            <div className="col-md-10">
                                <h5 className="text-capitalize fw-bold">{item?.title}</h5>
                                <p>{item?.description}</p>
                                <p>
                                    <span>CreatedAt: </span>
                                    {moment(item?.createdAt).format('MMMM D, YYYY h:mm A')}
                                </p>
                            </div>
                            <div className={`${styles.btnDiv} col-md-2`}>
                                <Link href={`/editTopic/${item?._id}`}>
                                    <button>
                                        <HiPencilAlt size={24} color="green" />
                                    </button>
                                </Link>
                                <div>
                                    <RemoveBtn id={item?._id}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
