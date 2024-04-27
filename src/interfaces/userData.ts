/**
 * Represents the data structure for user information.
 */
export default interface UserData {
    /**
     * The email address of the user.
     */
    email: string;

    /**
     * The username of the user.
     */
    username: string;

    /**
     * The number of trades completed by the user.
     */
    tradesCompleted: number;

    /**
     * The role of the user, indicating whether they are a regular user or an admin.
     * Possible values are: 'USER' | 'ADMIN'.
     */
    role: 'USER' | 'ADMIN';

    /**
     * The date of registration of the user.
     */
    dateOfRegistration: string;

    /**
     * The full name of the user.
     */
    fullName: string;

    /**
     * The date of birth of the user.
     */
    dateOfBirth: string;

    /**
     * The phone number of the user.
     */
    phoneNumber: string;

    /**
     * The URL or path to the profile picture of the user.
     */
    profilePicture: string;
}