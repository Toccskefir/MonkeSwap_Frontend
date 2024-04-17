export default interface UserData {
    email: string,
    username: string,
    tradesCompleted: number,
    role: 'USER' | 'ADMIN',
    dateOfRegistration: string,
    fullName: string,
    dateOfBirth: string,
    phoneNumber: string,
    profilePicture: string,
}