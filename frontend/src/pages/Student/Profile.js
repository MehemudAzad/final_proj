import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";

const Profile = () => {
    const {user} = useContext(AuthContext);
    return ( 
        <>fdafd
            <h1 className="text-5xl p-10 text-bold">{user?.username}</h1>
            <h1 className="text-5xl p-10 text-bold">This is profile page</h1>
        </>
     );
}
 
export default Profile;