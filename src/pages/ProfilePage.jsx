import { useParams } from "react-router-dom";
import ProfileCover from "../feature/auth/profile/ProfileCover";
import ProfileInfo from "../feature/auth/profile/ProfileInfo";
import { useEffect, useState } from "react";
import axios from "../config/axios";
import { useAuth } from "../hooks/use-auth";

export default function ProfilePage() {
    const [profileUser, setProfileUser] = useState({});
    const [statusWithAuthUser, setStatusWithAuthUser] = useState('');
    const [profileFriends, setProfileFriends] = useState([])
    const { profileId } = useParams();

    const { authUser } = useAuth();
    const isAuthUser = authUser.id === +profileId;

    useEffect(() => {
        axios
            .get(`/user/${profileId}`)
            .then(res => {
                setProfileUser(res.data.user);
                console.log(res.data.user);
                setStatusWithAuthUser(res.data.status);
                setProfileFriends(res.data.friends);
            })
            .catch(err => {
                console.log(err);
            });
    }, [profileId]);

    // axios.get('/user/'+profileId).then(res => setProfileUser(res.data.user))
    // ใช้ไม่ได้ จะเกิด infinty Loop

    return (
        <div className="bg-gradient-to-b from-gray-400 to-white shadow pb-4">
            {profileUser ? (
                <>
                    <ProfileCover
                        coverImage={
                            isAuthUser ? authUser.coverImage : profileUser?.coverImage
                        }
                    />
                    <ProfileInfo
                        profileUser={isAuthUser ? authUser : profileUser}
                        statusWithAuthUser={statusWithAuthUser}
                        setStatusWithAuthUser={setStatusWithAuthUser}
                        profileFriends={profileFriends}
                    />
                </>
            ) : (
                <h1 className="text-center p-8 text-3xl font-bold">
                    404 !!! user not found
                </h1>
            )}
        </div>
    )
}