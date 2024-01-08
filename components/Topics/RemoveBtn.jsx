'use client'
import { HiOutlineTrash } from "react-icons/hi";
import Swal from 'sweetalert2';


export const RemoveBtn = ({ id,handleDelete }) => {

  const RemoveTopic = async () => {
    if (id) {
      handleDelete(id)
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