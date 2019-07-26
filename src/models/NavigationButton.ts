export class NavigationButton {
    private route: string;
    private buttonText: string;
    private buttonColor: string;
    private buttonOrder: number;

    constructor(route: string, buttonText: string, buttonColor: string = '', buttonOrder: number = 0){
        this.route = route;
        this.buttonText = buttonText;
        this.buttonColor = buttonColor;
        this.buttonOrder = buttonOrder;
    }
    getRoute() : string {
        return this.route;
    }
    getText() : string {
        return this.buttonText;
    }
    getOrder() : number {
        return this.buttonOrder;
    }
    getColor() : string {
        return this.buttonColor;
    }

}
