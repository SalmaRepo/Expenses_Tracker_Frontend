import { useContext, useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "../../config/urlConfig";
import { context } from "../../context/context";


export default function ChangeProfileImg() {
  const { state, dispatch } = useContext(context);
  const [preview, setPreview] = useState("");
 

  function grabImage(e) {
    e.stopPropagation();
    dispatch({type:"setChangeImage", payload:e.target.files[0]})
    setPreview(URL.createObjectURL(e.target.files[0]));
  }
  
  function handleChangeImg(e) {
    const token = localStorage.getItem("token");
    e.preventDefault();
    const upLoad = new FormData();
    upLoad.append("userImage", state.changeImage);
    axios
      .patch(`${BASE_URL}/api/users/changeProfileImg`, upLoad, {
        headers: { token: token },
      })
      .then(result  => 
        dispatch({
          type: "setUser",
          payload: result.data.data,
        })
      )
      .catch((error) => {
        console.log(error);
      });
  }

/*   console.log(state.user) */
  return (
    <div>
      Profile Image
      <form action="" onSubmit={handleChangeImg}>
        <input type="file" name="file" onChange={grabImage} />
        <img src={preview} alt="" style={{ height: "100px", width: "100px" }} />
        <button>Submit</button>
      </form>
    </div>
  );
}
