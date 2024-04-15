import default_profile_pic from "../assets/default_profile_pic.png";
import React, {useContext, useEffect, useState} from "react";
import {FiUpload} from "react-icons/fi";
import {UserDataContext} from "../contexts/UserDataContext";

interface ProfilePictureProps {
    selectedProfilePicture: Blob | null,
    profilePictureUpload: (fileList: FileList) => void,
}

function ProfilePicture(props: ProfilePictureProps) {
    const {userData} = useContext(UserDataContext);
    const [profilePicture, setProfilePicture] = useState(userData?.profilePicture);

    useEffect(() => {
        setProfilePicture(userData?.profilePicture);
    }, [userData]);

    function profilePictureSelector() {
        if (!props.selectedProfilePicture) {
            if(profilePicture) {
                return `data:image/png;base64, ${profilePicture}`;
            } else {
                return default_profile_pic;
            }
        }
        return URL.createObjectURL(props.selectedProfilePicture as Blob);
    }

    return (
        <div className="mx-auto w-64 text-center">
            <div className="relative w-64">
                <img className="w-64 h-64 rounded-full absolute border object-cover"
                     src={profilePictureSelector()}
                     alt="Profile picture"/>
                <label
                    className="w-64 h-64 group hover:bg-gray-200 opacity-60 rounded-full flex justify-center absolute items-center cursor-pointer transition duration-500">
                    <FiUpload className="hidden group-hover:block w-12 h-12"/>
                    <input
                        style={{display: 'none'}}
                        type="file"
                        accept="image/*"
                        onChange={(event) =>
                            props.profilePictureUpload(event.target.files as FileList)}
                    />
                </label>
            </div>
        </div>
    );
}

export default ProfilePicture;