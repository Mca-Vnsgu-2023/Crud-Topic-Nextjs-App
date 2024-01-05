'use client'
import moment from "moment";
import Link from "next/link";
import { HiPencilAlt } from 'react-icons/hi';
import styles from '../main.module.scss';
import { RemoveBtn } from "./RemoveBtn";


export default function Topics({data}) {

    return (
        <div>
            {data?.map((item, index) => (
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
                                <Link href={`/topic/edit/${item?._id}`}>
                                    <button>
                                        <HiPencilAlt size={24} color="green" />
                                    </button>
                                </Link>
                                <div>
                                    <RemoveBtn id={item?._id} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
