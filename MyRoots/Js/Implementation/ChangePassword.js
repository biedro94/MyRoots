/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../../Scripts/typings/knockout/knockout.d.ts" />
/// <reference path="../../Scripts/typings/knockout/tests/jasmine.extensions.d.ts" />
/// <reference path="../../scripts/typings/gateway/axcorlib.d.ts" />
/// <reference path="../../scripts/typings/gateway/mscorlib.d.ts" />
/// <reference path="../../scripts/typings/promise/promise.d.ts" />
$(document).ready(function () {
    var vm = document.getElementById("user");
    ko.applyBindings(new ChangePasswordViewModel(), vm);
});
var ChangePasswordViewModel = (function () {
    function ChangePasswordViewModel() {
        this.password = ko.observable().extend({
            required: true,
            pattern: {
                message: "Hasło musi zawierać co najmniej jedną literę i jedną liczbę",
                params: /^(?=.*[0-9])(?=.*[a-zA-Z])[A-Za-z0-9]+$/
            }
        });
        this.passwordConfirm = ko.observable();
        this.showTrueMessage = ko.observable();
        this.showConfirmMessage = ko.observable();
        this.showPasswordMessage = ko.observable();
        this.showConfirmMessage(false);
        this.showTrueMessage(false);
        this.showPasswordMessage(false);
    }
    ChangePasswordViewModel.prototype.sendChangedData = function () {
        console.log(this.password() + " " + this.passwordConfirm());
        this.showConfirmMessage(true);
        this.showTrueMessage(true);
        this.showPasswordMessage(true);
    };
    ChangePasswordViewModel.prototype.checkPassword = function () {
        if (this.password() != this.passwordConfirm()) {
            this.showPasswordMessage(true);
            this.showConfirmMessage(true);
        }
        else {
            this.showConfirmMessage(false);
        }
    };
    ChangePasswordViewModel.prototype.equalPassword = function () {
        if (this.password() != this.passwordConfirm()) {
            this.showConfirmMessage(true);
        }
        else {
            this.showConfirmMessage(false);
        }
    };
    return ChangePasswordViewModel;
}());
//# sourceMappingURL=ChangePassword.js.map