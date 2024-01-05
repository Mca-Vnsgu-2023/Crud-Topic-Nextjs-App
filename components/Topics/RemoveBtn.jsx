'use client'
import { useRouter } from "next/navigation";
import { HiOutlineTrash } from "react-icons/hi";
import { toast } from "react-toastify";
import Swal from 'sweetalert2';
import { deleteTopic } from "./Utils/topicAction";


export const RemoveBtn = ({ id }) => {

  const router = useRouter()

  const RemoveTopic = async () => {
    if (id) {
      deleteTopic(id).then((res) => {
        if (res.status == 201) {
          toast.error("Record deleted ssuccessfully!", {
            position: toast.POSITION.TOP_RIGHT, autoClose: 2000
          });
          router.push('/')
          router.refresh();
        }
      })
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