/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../../Scripts/typings/knockout/knockout.d.ts" />
/// <reference path="../../Scripts/typings/knockout/tests/jasmine.extensions.d.ts" />
/// <reference path="../../scripts/typings/gateway/axcorlib.d.ts" />
/// <reference path="../../scripts/typings/gateway/mscorlib.d.ts" />
/// <reference path="../../scripts/typings/promise/promise.d.ts" />
/// <reference path="../models/applicationuser.ts" />

$(document).ready(function () {
    let vm = document.getElementById("user");
    ko.applyBindings(new AccountManagement(), vm);
});


class AccountManagement{
    public firstName = ko.observable();
    public lastName = ko.observable();
    public avatar = ko.observable();
    public fileInput = ko.observable();
    public image = ko.observable();
    public applicationUser = ko.observable<ApplicationUser>();


    constructor() {
        this.GetCurrentName().then((resolve) => {
            var json = ko.toJSON(resolve);
        //    this.applicationUser(ko.toJS(resolve));
            var parsed = JSON.parse(json);
            this.applicationUser(parsed);
            this.firstName(this.applicationUser().firstName);
            this.lastName(this.applicationUser().lastName);
            console.log(this.applicationUser().firstName);
            }, (rejected) => {
            this.GetCurrentName();
        });
    }

    public changeName() {
        console.log(this.firstName() + " " + this.lastName());
        return new Promise((resolve, rejected) => {
            $.ajax({
                'url': 'http://' + HomeViewModel.host + '/MyRoot/ChangeUserNameAndLastName?firstName=' + this.firstName() + '&lastName=' + this.lastName(),
                'type': 'POST',
                'success': function (data) {
                    resolve(data);
                }
            });

        }); 
    }
   

    uploadImage($element) {
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

    }

    public static host: string = window.location.host;

    public GetCurrentName() {
        return new Promise((resolve, rejected) => {
            $.ajax({
                'url': 'http://' + HomeViewModel.host + '/MyRoot/GetUser',
                'success': function (data) {
                    resolve(data);
                }
            });

        });
    }
    /*
    public GetCurrentImage() {
        return new Promise((resolve, rejected) => {
            $.ajax({
                'url': 'http://' + HomeViewModel.host + '/MyRoot/GetAvatarForUser',
                'type': 'GET',
                'success': function (data) {
                    resolve(data);
                }
            });
        });
    }

    public GetCurrentLastName() {
        return new Promise((resolve, rejected) => {
            $.ajax({
                'url': 'http://' + HomeViewModel.host + '/MyRoot/GetLastName',
                'type': 'GET',
                'success': function (data) {
                    resolve(data);
                }
            });

        });
    }
    */
}