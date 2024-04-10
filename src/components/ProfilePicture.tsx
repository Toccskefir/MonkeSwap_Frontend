import default_profile_pic from "../assets/default_profile_pic.png";
import React from "react";
import {FiUpload} from "react-icons/fi";

interface ProfilePictureProps {
    profilePicture: string,
    profilePictureUpload: (fileList: FileList) => void,
}

function ProfilePicture(props: ProfilePictureProps) {
    return (
        <div className="mx-auto w-64 text-center">
            <div className="relative w-64">
                <img className="w-64 h-64 rounded-full absolute border object-cover"
                     src={props.profilePicture ? props.profilePicture : default_profile_pic}
                     alt="Profile picture"/>
                <label
                    className="w-64 h-64 group hover:bg-gray-200 opacity-60 rounded-full absolute flex justify-center items-center cursor-pointer transition duration-500">
                    <FiUpload className="hidden group-hover:block w-12 h-12"/>
                    <input
                        style={{display: 'none'}}
                        type="file"
                        onChange={(event) =>
                            props.profilePictureUpload(event.target.files as FileList)}
                    />
                </label>
            </div>
        </div>
    );
}

export default ProfilePicture;