import { throwStatement } from "@babel/types";

export class ReimbursementData {
    private isOpen: boolean;
    private reimbursementId: number;
    private amount : number;
    private author : string;
    private dateSubmitted : Date;
    private dateResolved : Date | undefined;
    private description : string;
    private resolver : number | undefined;
    private status : number;
    private type : number;
    constructor(isOpen: boolean, dataArr : any){
        try{
        this.reimbursementId = parseInt(dataArr.reimbursementId, 10);
        this.amount = parseInt(dataArr.amount, 10);
        this.author = dataArr.author || '';
        this.dateSubmitted = dataArr.dateSubmitted;
        this.dateResolved = dataArr.dateResolved;
        this.description = dataArr.description;
        this.resolver = parseInt(dataArr.resolver, 10);
        this.status = parseInt(dataArr.status.statusId, 10);
        this.type = parseInt(dataArr.type.typeId, 10);
        }catch{
            this.reimbursementId = 0;
            this.amount = 0;
            this.dateSubmitted = new Date(0);
            this.dateResolved = new Date(0);
            this.resolver = 0;
            this.description = '';
            this.status = 0;
            this.type = 0;
            this.author = '';
        }
        finally{}
        console.log(this);

        this.isOpen = isOpen;
        //this.reimbursementId = parseInt(dataArr[0], 10);
        //this.amount = parseInt(dataArr[1], 10);
        //this.author = dataArr[2];
        //this.dateSubmitted = new Date(dataArr[3]);
        //this.dateResolved = new Date(dataArr[4]) || undefined;
        //this.description = dataArr[5];
        //this.resolver = parseInt(dataArr[6], 10) || undefined;
        //this.status = parseInt(dataArr[7]);
        //this.type = parseInt(dataArr[8]);
    }
    public checkIsOpen() : boolean {
        return this.isOpen;
    }
    public setOpenState(open : boolean){
        this.isOpen = open;
    }
    public toggleOpenState(){
        if(this.isOpen){
            this.isOpen = false;
        }else{
            this.isOpen = true;
        }
        console.log(this.isOpen)

    }
    public getAmount() : number {
        return this.amount;
    }
    public getAuthor() : string {
        return this.author;
    }
    public getDateSubmitted() : Date {
        return this.dateSubmitted;
    }
    public getDateResolved() : Date | undefined {
        return this.dateResolved;
    }
    public getDescription() : string {
        return this.description;
    }
    public getResolver() : number | undefined {
        return this.resolver;
    }
    public getStatus() : number {
        return this.status;
    }
    public getType() : number {
        return this.type;
    }
}
