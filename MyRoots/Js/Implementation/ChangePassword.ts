/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../../Scripts/typings/knockout/knockout.d.ts" />
/// <reference path="../../Scripts/typings/knockout/tests/jasmine.extensions.d.ts" />
/// <reference path="../../scripts/typings/gateway/axcorlib.d.ts" />
/// <reference path="../../scripts/typings/gateway/mscorlib.d.ts" />
/// <reference path="../../scripts/typings/promise/promise.d.ts" />


$(document).ready(function () {
    let vm = document.getElementById("user");
    ko.applyBindings(new ChangePasswordViewModel(), vm);
});

class ChangePasswordViewModel {
    public password = ko.observable().extend({
        required: true,
        pattern: {
            message: "Hasło musi zawierać co najmniej jedną literę i jedną liczbę",
            params: /^(?=.*[0-9])(?=.*[a-zA-Z])[A-Za-z0-9]+$/
        }
    });
    public passwordConfirm = ko.observable();
    public showTrueMessage = ko.observable();
    public showConfirmMessage = ko.observable();
    public showPasswordMessage = ko.observable();

    constructor() {
        this.showConfirmMessage(false);
        this.showTrueMessage(false);
        this.showPasswordMessage(false);
    }


    public sendChangedData() {
        console.log(this.password() + " " + this.passwordConfirm());
        this.showConfirmMessage(true);
        this.showTrueMessage(true);
        this.showPasswordMessage(true);
    }
    public checkPassword() {
        if (this.password() != this.passwordConfirm()) {
            this.showPasswordMessage(true);
            this.showConfirmMessage(true);
        
        }
        else {
            this.showConfirmMessage(false);
        }
    }
    public equalPassword() {
        if (this.password() != this.passwordConfirm()) {
            this.showConfirmMessage(true);
        }
        else {
            this.showConfirmMessage(false);
        }
    }

}


