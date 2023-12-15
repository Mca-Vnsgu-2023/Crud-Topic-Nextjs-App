'use client'
import { useRouter } from "next/navigation";
import React from "react";
import { HiOutlineTrash } from "react-icons/hi";
import { toast } from "react-toastify";
import Swal from 'sweetalert2'

export const RemoveBtn = ({ id }) => {

    const router = useRouter()

    const RemoveTopic = async () => {
        if (id) {
            const res = await fetch(`http://127.0.0.1:3000/api/topics?id=${id}`, {
                method: "DELETE"
            })
            if (res.ok) {
                toast.error("Record deleted successfully!", {
                    position: toast.POSITION.TOP_RIGHT
                });
                router.refresh();
            }
        }
    }

    const successAlert = () => {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
            onClick: RemoveTopic()
          });
        }
      });
    }

    return (
        <div>
            <div>
                <button onClick={successAlert}>
                    <HiOutlineTrash size={24} color="red" />
                </button>
            </div>
        </div>
    );
};