export class NavigationButton {
    private route: string;
    private buttonText: string;
    private buttonColor: string;
    private buttonOrder: number;
    private minimumRole: number;
    private maximumRole: number;

    constructor(route: string, buttonText: string, minimumRole : number, maximumRole : number, buttonColor: string = '', buttonOrder: number = 0){
        this.route = route;
        this.buttonText = buttonText;
        this.buttonColor = buttonColor;
        this.buttonOrder = buttonOrder;
        this.minimumRole = minimumRole;
        this.maximumRole = maximumRole;
    }
    getMaximumRole() : number {
        return this.maximumRole;
    }
    getMinimumRole() : number {
        return this.minimumRole;
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
    setUrl(url : string) : void {
        this.route = url;
    }

}
