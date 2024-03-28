export default interface UserData {
    email: string,
    username: string,
    tradesCompleted: number,
    role: 'USER' | 'ADMIN',
    dateOfRegistration: string,
    fullName: string,
    dateOfBirth: Date,
    phoneNumber: string,
    profilePicture: string,
}