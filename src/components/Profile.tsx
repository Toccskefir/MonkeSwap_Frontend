import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../contexts/AuthContext";
import {HttpContext} from "../providers/HttpProvider";
import UserData from "../interfaces/userData";
import ProfilePicture from "./ProfilePicture";
import {UserDataContext} from "../contexts/UserDataContext";
import {FaUserSlash} from "react-icons/fa";
import ModalContent from "./ModalContent";
import {Modal} from "@mui/material";

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
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [maxDate, setMaxDate] = useState('');

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

    useEffect(() => {
        const currentDate = new Date();
        const maxDateValue = new Date(currentDate.getFullYear() - 18, currentDate.getMonth(), currentDate.getDate());
        const formattedMaxDate = maxDateValue.toISOString().split('T')[0];
        setMaxDate(formattedMaxDate);
    }, []);

    function handleModalClose() {
        setOpenModal(false);
    }

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
            });
    }

    function handleProfileEditing() {
        setEditingProfile(editing => !editing);
        setUsername(user?.username);
        setFullName(user?.fullName);
        setDateOfBirth(user?.dateOfBirth);
        setPhoneNumber(user?.phoneNumber);
        setErrorMessage('');
    }

    function handleDateChange(event: React.ChangeEvent<HTMLInputElement>) {
        const selectedDate = new Date(event.target.value);
        setDateOfBirth(selectedDate.toLocaleDateString());
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
                if (user) {
                    setUserData({
                        ...user,
                        username: username?.trim() as string,
                        fullName: fullName?.trim() as string,
                        dateOfBirth: dateOfBirth?.trim() as string,
                        phoneNumber: phoneNumber?.trim() as string
                    });
                }
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

                {editingProfilePicture && <button onClick={saveProfilePicture} className="active:scale-[.98] active:duration-75
                                    hover:scale-[1.01] ease-in-out transition-all mt-72 mr-2 w-20 py-2 rounded-xl bg-primary-yellow
                    text-yellow-900 text-lg font-bold col-span-2">Save</button>}
                {editingProfilePicture && <button onClick={cancelProfilePictureEditing} className="active:scale-[.98] active:duration-75
                                    hover:scale-[1.01] ease-in-out transition-all w-20 py-2 rounded-xl bg-white
                    text-yellow-900 text-lg font-bold col-span-2">Cancel</button>}
                </div>

                <div className="w-1/3">
                    <form onSubmit={handleSubmitEvent} className="flex flex-col">
                        <label className="font-semibold flex flex-col">
                            Username
                            {!editingProfile ?
                                <p className="font-normal">{username}</p> :
                                <input
                                    type="text"
                                    maxLength={25}
                                    placeholder="Monke"
                                    className="font-normal mb-3 pl-1 w-80 border-2 border-black"
                                    value={username}
                                    onChange={event => setUsername(event.target.value)}
                                />
                            }
                        </label>
                        <label className="font-semibold flex flex-col">
                            Full Name
                            {!editingProfile ?
                                <p className="font-normal">{fullName}</p> :
                                <input
                                    type="text"
                                    maxLength={25}
                                    placeholder="No full name yet"
                                    className="font-normal mb-3 pl-1 w-80 border-2 border-black"
                                    value={fullName}
                                    onChange={event => setFullName(event.target.value)}
                                />
                            }
                        </label>
                        <label className="font-semibold flex flex-col">
                            Date of birth
                            {!editingProfile ?
                                <p>{dateOfBirth}</p> :
                                <input
                                    type="date"
                                    className="font-normal mb-3 pl-1 w-80 border-2 border-black"
                                    max={maxDate}
                                    onChange={handleDateChange}
                                />
                            }
                        </label>
                        <label className="font-semibold flex flex-col">
                            Phone number

                            {!editingProfile ?
                                <p className="font-normal">{phoneNumber}</p> :
                                <input
                                    type="text"
                                    maxLength={16}
                                    placeholder="No phone number yet"
                                    className="font-normal mb-3 pl-1 w-80 border-2 border-black"
                                    value={phoneNumber}
                                    onChange={event => setPhoneNumber(event.target.value)}
                                />
                            }
                        </label>
                        <p className="text-red-600 font-medium">{errorMessage}</p>
                        {editingProfile ? <button type="submit" className="active:scale-[.98] active:duration-75
                        hover:scale-[1.01] ease-in-out transition-all py-2 rounded-xl bg-primary-yellow
                    text-yellow-900 text-lg font-bold w-full col-span-2">Save changes</button> : ''}
                    </form>
                    {editingProfile ? <button className="active:scale-[.98] active:duration-75
                        hover:scale-[1.01] ease-in-out transition-all py-2 mt-3 rounded-xl bg-white
                    text-yellow-900 text-lg font-bold w-full col-span-2" onClick={handleProfileEditing}>Cancel</button>
                        :
                        <button className="active:scale-[.98] active:duration-75
                        hover:scale-[1.01] ease-in-out transition-all py-2 rounded-xl bg-primary-yellow
                    text-yellow-900 text-lg font-bold w-full col-span-2" onClick={handleProfileEditing}>Edit profile</button>}
                </div>

                <div className="w-1/3">
                    <form onSubmit={handlePasswordSubmitEvent} className="flex flex-col ml-20">
                        <label className="font-semibold flex flex-col text-left">
                            New password
                        </label>
                        <input
                            className="mb-3 pl-1 w-80 border-2 border-black"
                            type="password"
                            maxLength={30}
                            placeholder="********"
                            value={newPassword}
                            onChange={event => setNewPassword(event.target.value)}
                        />
                        <label className="font-semibold flex flex-col text-left">
                            Confirm new password
                        </label>
                        <input
                            className="mb-3 pl-1 w-80 border-2 border-black"
                            type="password"
                            maxLength={30}
                            placeholder="********"
                            value={newPasswordAgain}
                            onChange={event => setNewPasswordAgain(event.target.value)}
                        />
                        <p className="text-red-600 font-medium">{errorMessagePassword}</p>
                        <button type="submit" className="active:scale-[.98] active:duration-75
                    hover:scale-[1.01] ease-in-out transition-all w-52 py-2 ml-12 rounded-xl bg-primary-yellow
                    text-yellow-900 text-lg font-bold">Save new password
                        </button>
                    </form>
                    <button onClick={() => setOpenModal(true)} className="active:scale-[.98] active:duration-75
                    hover:scale-[1.01] ease-in-out transition-all w-52 mt-3 py-2 ml-32 rounded-xl bg-red-600
                    text-white text-lg font-bold">Delete user
                    </button>
                    <Modal open={openModal} onClose={handleModalClose} className="grid h-screen place-items-center">
                        <ModalContent onClose={handleModalClose}>
                            <div className="text-center w-56">
                                <FaUserSlash size={56} className="mx-auto text-red-500" />
                                <div className="mx-auto my-4 w-48">
                                    <h3 className="text-lg font-black text-gray-800">Confirm Delete</h3>
                                    <p className="text-sm text-gray-500">
                                        Are you sure you want to delete your account?
                                    </p>
                                </div>
                                <div className="flex gap-4 font-semibold">
                                    <button className="active:scale-[.98] active:duration-75
                    hover:scale-[1.01] ease-in-out transition-all rounded-xl bg-red-600 w-full py-2 text-white"
                                            onClick={userDelete}>Delete</button>
                                    <button
                                        className="active:scale-[.98] active:duration-75
                    hover:scale-[1.01] ease-in-out w-full py-2"
                                        onClick={handleModalClose}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </ModalContent>
                    </Modal>
                </div>
            </div>
            </div>
        </div>
    );
}

export default Profile;