import default_profile_pic from "../assets/default_profile_pic.png";
import React from "react";

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
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                         stroke="currentColor" className="hidden group-hover:block w-12 h-12">
                        <path stroke-linecap="round" stroke-linejoin="round"
                              d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"/>
                    </svg>
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