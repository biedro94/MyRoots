/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../../Scripts/typings/knockout/knockout.d.ts" />
/// <reference path="../../Scripts/typings/knockout/tests/jasmine.extensions.d.ts" />
/// <reference path="../../scripts/typings/gateway/axcorlib.d.ts" />
/// <reference path="../../scripts/typings/gateway/mscorlib.d.ts" />
/// <reference path="../../scripts/typings/promise/promise.d.ts" />
/// <reference path="../models/applicationuser.ts" />
$(document).ready(function () {
    var vm = document.getElementById("user");
    ko.applyBindings(new AccountManagement(), vm);
});
var AccountManagement = (function () {
    function AccountManagement() {
        var _this = this;
        this.firstName = ko.observable();
        this.lastName = ko.observable();
        this.avatar = ko.observable();
        this.fileInput = ko.observable();
        this.image = ko.observable();
        this.applicationUser = ko.observable(new ApplicationUser());
        this.getApplicationUserData().then(function (resolve) {
            var jsonString = String(resolve);
            var parse = JSON.parse(jsonString);
            _this.applicationUser().firstName(String(parse.FirstName));
            _this.applicationUser().lastName(String(parse.LastName));
            _this.applicationUser().image(String(parse.Image));
        }, function (rejected) { });
    }
    AccountManagement.prototype.sendChangedData = function () {
        var ob = ko.toJSON(this.applicationUser());
        return new Promise(function (resolve, rejected) {
            $.post('http://' + HomeViewModel.host + '/MyRoot/ChangeUserData', ob, function (returnedData) {
                resolve(returnedData);
            });
        });
    };
    AccountManagement.prototype.getApplicationUserData = function () {
        return new Promise(function (resolve, rejected) {
            $.ajax({
                'url': 'http://' + HomeViewModel.host + '/MyRoot/GetUser',
                'success': function (data) {
                    resolve(data);
                }
            });
        });
    };
    AccountManagement.prototype.uploadImage = function (base64) {
        var _this = this;
        this.fileReader(base64).then(function (resolve) {
            _this.applicationUser().image(String(resolve));
        });
    };
    AccountManagement.prototype.fileReader = function (base64) {
        return new Promise(function (resolve, rejected) {
            var reader = new FileReader();
            reader.addEventListener("load", function () {
                resolve(reader.result);
            }, false);
            if (base64) {
                reader.readAsDataURL(base64);
            }
        });
    };
    AccountManagement.host = window.location.host;
    return AccountManagement;
}());
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
