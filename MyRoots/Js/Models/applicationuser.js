var ApplicationUser = (function () {
    function ApplicationUser() {
        this.firstName = ko.observable();
        this.lastName = ko.observable();
        this.image = ko.observable();
        this.firstName("");
        this.lastName("");
        this.image("");
    }
    return ApplicationUser;
}());
