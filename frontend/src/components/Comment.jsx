import axios from "axios";
import { MdDelete } from "react-icons/md";
import { URL } from "../url";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const Comment = ({ c, post }) => {
  const { user } = useContext(UserContext);

  const deleteComment = async (id) => {
    try {
      await axios.delete(URL + "/api/comments/" + id, { withCredentials: true });
      window.location.reload(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="comment-container border p-3 my-3">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-gray-600">@{c.author}</h3>
        <div className="flex items-center space-x-2 text-gray-500">
          <p>{new Date(c.updatedAt).toLocaleDateString()}</p>
          <p>{new Date(c.updatedAt).toLocaleTimeString()}</p>
          {user?._id === c?.userId && (
            <p
              className="cursor-pointer hover:text-red-500"
              onClick={() => deleteComment(c._id)}
            >
              <MdDelete />
            </p>
          )}
        </div>
      </div>
      <p className="px-2 mt-2">{c.comment}</p>
    </div>
  );
};

export default Comment;