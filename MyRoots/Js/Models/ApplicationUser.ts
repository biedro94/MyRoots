class ApplicationUser {

    public firstName = ko.observable<string>();
    public lastName = ko.observable<string>();
    public image = ko.observable<string>();

    constructor() {
        this.firstName("");
        this.lastName("");
        this.image("")

}
}