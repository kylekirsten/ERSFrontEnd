export class UserData {
    private isOpen: boolean;
    private userId: number;
    private userName : string;
    private hash : string;
    private firstName : string;
    private lastName : string;
    private email : string;
    private role : number;
    constructor(isOpen: boolean, dataArr : string[]){
        this.isOpen = isOpen;
        this.userId = parseInt(dataArr[0], 10);
        this.userName = dataArr[1];
        this.hash = dataArr[2];
        this.firstName = dataArr[3];
        this.lastName = dataArr[4];
        this.email = dataArr[5];
        this.role = parseInt(dataArr[6], 10);
    }
    checkIsOpen() : boolean {
        return this.isOpen;
    }
    setOpenState(open : boolean){
        this.isOpen = open;
    }
    toggleOpenState(){
        if(this.isOpen){
            this.isOpen = false;
        }else{
            this.isOpen = true;
        }
        console.log(this.isOpen)

    }
    getId(): number {
        return this.userId;
    }
    getUsername() : string {
        return this.userName;
    }
    getFirstName() : string {
        return this.firstName;
    }
    getLastName() : string {
        return this.lastName;
    }
    getEmail() : string {
        return this.email;
    }
    getRole() : number {
        console.log(this.role);
        return this.role;
    }
}
