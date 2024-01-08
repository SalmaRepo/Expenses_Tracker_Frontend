import React, {useState, useEffect, useContext} from 'react'
import { context } from '../../context/context';

// import uploadAvatar from './uploadAvatar';
// import { IoPersonCircleOutline } from 'react-icons/io5';

export default function Profile({token}) {
  const {state, dispatch} = useContext(context)
  console.log(state.user)
  // const [user, setUser] = useState({});
  // const [isUserUpdated, setIsUserUpdated] = useState(false);
 
  // useEffect(()=>{
  //   const getProfile = async ()=>{

  //     try {
  //       const {data} = await axios.get(`http://localhost:5173/api/users/me`, {
  //         headers: {
  //           Authorization: `bearer ${token}`,
  //         },
  //       });
  //       setUser(data);
  //       setIsUserUpdated(false)
  //     } catch (error) {
  //       console.log({error})
  //     }
  //   }  
  //   getProfile();
  // }, [token, isUserUpdated])
  
  return (
    <div className="profile">
    <div className='avatar'>
      <div className='avatar-wrapper'>
      {/* {user.avatarUrl ? (
  <img src={`http://localhost:5173${user.avatar}`} alt={`${user.username} avatar`} />
) : (
  <IoPersonCircleOutline />
)} */}

        {/* <uploadAvatar
        token={token}
        userId={user.id}
        userName={user.userName}
        avatarUrl={user.avatarUrl}
        setIsUserUpdated={setIsUserUpdated}
        /> */}
      </div>
    </div>
    <div>
      <p>User Name:{state.user?.firstName} </p>
      
      <p>Email: {state.user?.email}</p>
    </div>
  </div>
);
}
