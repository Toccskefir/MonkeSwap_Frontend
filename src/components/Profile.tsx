import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../contexts/AuthContext";
import {HttpContext} from "../providers/HttpProvider";
import UserData from "../interfaces/userData";
import ProfilePicture from "./ProfilePicture";

function Profile() {
    const {userData, setUserData, logout} = useContext(AuthContext);
    const axios = useContext(HttpContext);

    const [user, setUser] = useState<UserData | null>();
    const [username, setUsername] = useState(user?.username);
    const [fullName, setFullName] = useState(user?.fullName);
    const [dateOfBirth, setDateOfBirth] = useState(user?.dateOfBirth);
    const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber);
    const [selectedProfilePicture, setSelectedProfilePicture] = useState<Blob | null>(null);
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordAgain, setNewPasswordAgain] = useState('');
    const [editingProfile, setEditingProfile] = useState(false);
    const [editingProfilePicture, setEditingProfilePicture] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [errorMessagePassword, setErrorMessagePassword] = useState('');

    useEffect(() => {
        if(userData) {
            setUser(userData);
        }
    }, [axios, userData]);

    useEffect(() => {
        setUsername(user?.username);
        setFullName(user?.fullName);
        setDateOfBirth(user?.dateOfBirth);
        setPhoneNumber(user?.phoneNumber);
    }, [user]);

    function profilePictureUpload(files: FileList | null) {
        if ( files && files.length > 0) {
            setSelectedProfilePicture(pic => files[0]);
        }
        setEditingProfilePicture(editing => true);
    }

    function cancelProfilePictureEditing() {
        setEditingProfilePicture(editing => false);
        setSelectedProfilePicture(null);
    }

    function saveProfilePicture() {
        const formData = new FormData();
        formData.append('profilePicture', selectedProfilePicture as Blob);
        axios.put('user/profilepicture', formData)
            .then((response) => {
                if (user) {
                    setUserData({...user, profilePicture: response.data.profilePicture});
                }
                cancelProfilePictureEditing();
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

    function handlePasswordSubmitEvent(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (newPassword !== newPasswordAgain) {
            setErrorMessage('Passwords must match');
            return;
        }
        axios.put('user/password', {password: newPassword})
            .then(() => {
                setNewPassword('');
                setNewPasswordAgain('');
                setErrorMessagePassword('Password changed');
            })
            .catch((error) => {
                if (error.response) {
                    setErrorMessagePassword(error.response.data);
                }
            });
    }

    return (
        <div>
            <ProfilePicture
                selectedProfilePicture={selectedProfilePicture}
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
            <form onSubmit={handlePasswordSubmitEvent}>
                <label>
                    New password
                    <input
                        type="password"
                        placeholder="********"
                        value={newPassword}
                        onChange={event => setNewPassword(event.target.value)}
                    />
                </label>
                <label>
                    Confirm new password
                    <input
                        type="password"
                        placeholder="********"
                        value={newPasswordAgain}
                        onChange={event => setNewPasswordAgain(event.target.value)}
                    />
                </label>
                <p>{errorMessagePassword}</p>
                <button type="submit">Save new password</button>
            </form>
            <button onClick={userDelete}>Delete user</button>
        </div>
    );
}

export default Profile;