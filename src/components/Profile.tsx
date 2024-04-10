import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../contexts/AuthContext";
import {HttpContext} from "../providers/HttpProvider";
import UserData from "../interfaces/userData";
import ProfilePicture from "./ProfilePicture";

function Profile() {
    const [user, setUser] = useState<UserData>();
    const [username, setUsername] = useState(user?.username);
    const [fullName, setFullName] = useState(user?.fullName);
    const [dateOfBirth, setDateOfBirth] = useState(user?.dateOfBirth);
    const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber);
    const [profilePicture, setProfilePicture] = useState(user?.profilePicture);
    const [selectedProfilePicture, setSelectedProfilePicture] = useState<string | null>(null);
    const [editingProfile, setEditingProfile] = useState(false);
    const [editingProfilePicture, setEditingProfilePicture] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const {logout} = useContext(AuthContext);
    const axios = useContext(HttpContext);

    useEffect(() => {
        axios.get('user')
            .then((response) => {
                setUser(response.data);
            });
    }, [axios]);

    useEffect(() => {
        setUsername(user?.username);
        setFullName(user?.fullName);
        setDateOfBirth(user?.dateOfBirth);
        setPhoneNumber(user?.phoneNumber);
        setProfilePicture(user?.profilePicture);
    }, [user]);

    function profilePictureUpload(files: FileList | null) {
        if ( files && files.length > 0) {
            setProfilePicture(pic => URL.createObjectURL(files[0]));
        }
        setEditingProfilePicture(editing => !editing);
    }

    function cancelProfilePictureEditing() {
        setEditingProfilePicture(editing => !editing);
        setProfilePicture(user?.profilePicture);
    }

    function saveProfilePicture() {
        const formData = new FormData();
        formData.append('profilePicture', profilePicture as string);
        axios.put('user/profilepicture', formData)
            .then(() => {
                setEditingProfilePicture(editing => !editing);
            })
            .catch((error) => {
                if (error.response) {
                    setErrorMessage(error.response.data);
                }
            })
    }

    function handleProfileEditing() {
        setEditingProfile(editing => !editing);
    }

    async function userDelete() {
        await axios.delete('user')
            .then(() => {
                logout();
            });
    }

    function handleSubmitEvent(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        axios.put('user', {username, fullName, dateOfBirth, phoneNumber})
            .then(() => {
                handleProfileEditing();
            })
            .catch((error) => {
                if (error.response) {
                    setErrorMessage(error.response.data);
                }
            });
    }

    return (
        <div>
            <ProfilePicture
                profilePicture={editingProfilePicture ? profilePicture as string : `data:image/png;base64, ${profilePicture}`}
                profilePictureUpload={profilePictureUpload} />

            {editingProfilePicture && <button onClick={saveProfilePicture}>Save</button>}
            {editingProfilePicture && <button onClick={cancelProfilePictureEditing}>Cancel</button>}

            <form onSubmit={handleSubmitEvent}>
                <label>
                    Username
                    {!editingProfile ?
                        <p>{username}</p> :
                        <input
                            type="text"
                            placeholder="Monke"
                            value={username}
                            onChange={event => setUsername(event.target.value)}
                        />
                    }
                </label>
                <label>
                    Full Name
                    {!editingProfile ?
                        <p>{fullName}</p> :
                        <input
                            type="text"
                            placeholder="No full name yet"
                            value={fullName}
                            onChange={event => setFullName(event.target.value)}
                        />
                    }
                </label>
                <label>
                    Date of birth
                    {!editingProfile ?
                        <p>{dateOfBirth?.toDateString()}</p> :
                        <input
                            type="date"
                            value={dateOfBirth?.toDateString()}

                        />
                    }
                </label>
                <label>
                    Phone number
                    {!editingProfile ?
                        <p>{phoneNumber}</p> :
                        <input
                            type="text"
                            placeholder="No phone number yet"
                            value={phoneNumber}
                            onChange={event => setPhoneNumber(event.target.value)}
                        />
                    }
                </label>
                <p>{errorMessage}</p>
                <button type="submit">{editingProfile ? 'Save changes' : ''}</button>
            </form>
            <button onClick={handleProfileEditing}>{editingProfile ? 'Back' : 'Edit profile'}</button>
            <button onClick={userDelete}>Delete user</button>
        </div>
    );
}

export default Profile;