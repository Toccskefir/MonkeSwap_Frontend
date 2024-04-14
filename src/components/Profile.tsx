import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../contexts/AuthContext";
import {HttpContext} from "../providers/HttpProvider";
import UserData from "../interfaces/userData";
import ProfilePicture from "./ProfilePicture";
import {UserDataContext} from "../contexts/UserDataContext";

function Profile() {
    const {logout} = useContext(AuthContext);
    const axios = useContext(HttpContext);
    const {userData, setUserData} = useContext(UserDataContext);

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
            setSelectedProfilePicture(files[0]);
        }
        setEditingProfilePicture(true);
    }

    function cancelProfilePictureEditing() {
        setEditingProfilePicture(false);
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
        setErrorMessage('');
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
            setErrorMessagePassword('Passwords must match');
            return;
        }
        axios.put('user/password', {password: newPassword})
            .then(() => {
                setNewPassword('');
                setNewPasswordAgain('');
                setErrorMessagePassword('Password changed!');
            })
            .catch((error) => {
                if (error.response) {
                    setErrorMessagePassword(error.response.data);
                }
            });
    }

    return (
        <div className="flex flex-col w-full font-poppins overflow-hidden columns-3">
            <div className="bg-white px-10 py-20 rounded-3xl border-2 border-gray-200 mt-3 ml-5 mr-5">
            <div className="w-full flex">
                <div className="w-1/3 flex-col text-center">
                <ProfilePicture
                    selectedProfilePicture={selectedProfilePicture}
                    profilePictureUpload={profilePictureUpload}/>

                {editingProfilePicture && <button onClick={saveProfilePicture} className="mt-72 mr-2 w-20 py-2 rounded-xl bg-primary-yellow
                    text-yellow-900 text-lg font-bold col-span-2">Save</button>}
                {editingProfilePicture && <button onClick={cancelProfilePictureEditing} className="w-20 py-2 rounded-xl bg-white
                    text-yellow-900 text-lg font-bold col-span-2">Cancel</button>}
                </div>

                <div className="w-1/3">
                    <form onSubmit={handleSubmitEvent} className="flex flex-col">
                        <label className="font-semibold flex flex-col">
                            Username
                        </label>
                            {!editingProfile ?
                                <p className="font-normal">{username}</p> :
                                <input
                                    type="text"
                                    placeholder="Monke"
                                    className="mb-3 pl-1 w-80 border-2 border-black"
                                    value={username}
                                    onChange={event => setUsername(event.target.value)}
                                />
                            }
                        <label className="font-semibold flex flex-col">
                            Full Name
                        </label>
                            {!editingProfile ?
                                <p className="font-normal">{fullName}</p> :
                                <input
                                    type="text"
                                    placeholder="No full name yet"
                                    className="mb-3 pl-1 w-80 border-2 border-black"
                                    value={fullName}
                                    onChange={event => setFullName(event.target.value)}
                                />
                            }
                        <label className="font-semibold flex flex-col">
                            Date of birth
                        </label>
                            {!editingProfile ?
                                <p className="font-normal">{dateOfBirth?.toDateString()}</p> :
                                <input
                                    type="date"
                                    className="mb-3 pl-1 w-80 border-2 border-black"
                                    value={dateOfBirth?.toDateString()}
                                />
                            }
                        <label className="font-semibold flex flex-col">
                            Phone number
                        </label>
                            {!editingProfile ?
                                <p className="font-normal">{phoneNumber}</p> :
                                <input
                                    type="text"
                                    placeholder="No phone number yet"
                                    className="mb-3 pl-1 w-80 border-2 border-black"
                                    value={phoneNumber}
                                    onChange={event => setPhoneNumber(event.target.value)}
                                />
                            }
                        <p className="text-red-600 font-medium">{errorMessage}</p>
                        {editingProfile ? <button type="submit" className="py-2 rounded-xl bg-primary-yellow
                    text-yellow-900 text-lg font-bold w-full col-span-2">Save changes</button> : ''}
                    </form>
                    {editingProfile ? <button className="py-2 mt-3 rounded-xl bg-white
                    text-yellow-900 text-lg font-bold w-full col-span-2" onClick={handleProfileEditing}>Cancel</button> : <button className="py-2 rounded-xl bg-primary-yellow
                    text-yellow-900 text-lg font-bold w-full col-span-2" onClick={handleProfileEditing}>Edit profile</button>}
                </div>

                <div className="w-1/3">
                    <form onSubmit={handlePasswordSubmitEvent} className="flex flex-col">
                    <label className="font-semibold flex flex-col">
                        New password
                    </label>
                        <input
                            className="mb-3 pl-1 w-80 border-2 border-black"
                            type="password"
                            placeholder="********"
                            value={newPassword}
                            onChange={event => setNewPassword(event.target.value)}
                        />
                    <label className="font-semibold flex flex-col">
                        Confirm new password
                    </label>
                        <input
                            className="mb-3 pl-1 w-80 border-2 border-black"
                            type="password"
                            placeholder="********"
                            value={newPasswordAgain}
                            onChange={event => setNewPasswordAgain(event.target.value)}
                        />
                    <p className="text-red-600 font-medium">{errorMessagePassword}</p>
                    <button type="submit" className="w-50 py-2 ml-12 rounded-xl bg-primary-yellow
                    text-yellow-900 text-lg font-bold col-span-2">Save new password</button>
                    <button onClick={userDelete} className="w-50 mt-3 py-2 ml-12 rounded-xl bg-red-600
                    text-yellow-900 text-lg font-bold col-span-2">Delete user</button>
                </form>
            </div>
        </div>
            </div>
        </div>
    );
}

export default Profile;