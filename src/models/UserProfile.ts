import * as Session from '../utils/Session';
class UserProfile {
    constructor(token : string, userId : number = 0, username :string = '', 
                firstName : string = '', lastName : string = '',
                 email :string = '', role : number = 0){
        this.token = token;
        this.userId = userId;
        this.userName = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.role = role;
        this.initSession();
    }
    private userId : number;
    private userName : string;
    private token : string;
    private firstName : string;
    private lastName : string;
    private email : string;
    private role : number;
    getUserId() : number {
        return this.userId;
    }
    getUserName() : string {
        return this.userName;
    }
    getToken() : string {
        return this.token;
    }
    getFirstName(): string {
        return this.firstName;
    }
    getLastName(): string {
        return this.lastName;
    }
    getFullName(): string{
        return this.firstName + ' ' + this.lastName;
    }
    getEmail() : string {
        return this.email;
    }
    getRole() : number {
        return this.role;
    }
    private async initSession(): Promise<any> {
        const userSessionDetails = await Session.retrieveSession(this.token);
        Object.assign(this, userSessionDetails);
        console.log(this);
        return true;
    }
    private async isValidSession() : Promise<boolean> {
        return await Session.isValidSession(this.token);
    }
}

export default UserProfile;