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
        this.applicationUser = ko.observable();
        this.GetCurrentName().then(function (resolve) {
            var json = ko.toJSON(resolve);
            //    this.applicationUser(ko.toJS(resolve));
            var parsed = JSON.parse(json);
            _this.applicationUser(parsed);
            _this.firstName(_this.applicationUser().firstName);
            _this.lastName(_this.applicationUser().lastName);
            console.log(_this.applicationUser().firstName);
        }, function (rejected) {
            _this.GetCurrentName();
        });
    }
    AccountManagement.prototype.changeName = function () {
        var _this = this;
        console.log(this.firstName() + " " + this.lastName());
        return new Promise(function (resolve, rejected) {
            $.ajax({
                'url': 'http://' + HomeViewModel.host + '/MyRoot/ChangeUserNameAndLastName?firstName=' + _this.firstName() + '&lastName=' + _this.lastName(),
                'type': 'POST',
                'success': function (data) {
                    resolve(data);
                }
            });
        });
    };
    AccountManagement.prototype.uploadImage = function ($element) {
        console.log($element);
        /* return new Promise((resolve, rejected) => {
             $.ajax({
                 'url': 'http://' + HomeViewModel.host + '/MyRoot/UploadAvatarr?img=' + image(),
                 'type': 'POST',
                 'success': function (data) {
                     resolve(data);
                 }
             });
 
         });*/
    };
    AccountManagement.prototype.GetCurrentName = function () {
        return new Promise(function (resolve, rejected) {
            $.ajax({
                'url': 'http://' + HomeViewModel.host + '/MyRoot/GetUser',
                'success': function (data) {
                    resolve(data);
                }
            });
        });
    };
    AccountManagement.host = window.location.host;
    return AccountManagement;
}());
//# sourceMappingURL=AccountManagement.js.map