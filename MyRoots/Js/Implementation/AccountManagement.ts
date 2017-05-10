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

class AccountManagement {
    public firstName = ko.observable(); // imie
    public lastName = ko.observable(); // nazwisko
    public avatar = ko.observable(); // avatar
    public fileInput = ko.observable(); //plik wejsciowy
    public image = ko.observable(); //obrazek
    public applicationUser = ko.observable<ApplicationUser>(new ApplicationUser()); //uzytkownik zalogowany
    public static host: string = window.location.host;
    public showMessage = ko.observable(); // wprowadzono nie poprawne dane i nie zmieniono danych w bazie taka jest koncepcja
    public showTrueMessage = ko.observable(); // dodano do bazy


    constructor() {
        this.getApplicationUserData().then((resolve) => {
            var jsonString = String(resolve);
            var parse = JSON.parse(jsonString);
            this.applicationUser().firstName(String(parse.FirstName));
            this.applicationUser().lastName(String(parse.LastName));
            this.applicationUser().image(String(parse.Image));
            this.showMessage(false);
            this.showTrueMessage(false);

        }, (rejected) => { });
    }

    public sendChangedData() {
        this.showMessage(true);
        this.showTrueMessage(true);
        let ob = ko.toJSON(this.applicationUser());
        return new Promise((resolve, rejected) => {
            $.post('http://' + HomeViewModel.host + '/MyRoot/ChangeUserData', ob, function (returnedData) {
                resolve(returnedData);

            });
        });
    }

    public getApplicationUserData() {
        return new Promise((resolve, rejected) => {
            $.ajax({
                'url': 'http://' + HomeViewModel.host + '/MyRoot/GetUser',
                'success': function (data) {
                    resolve(data);
                }
            });

        });
    }

    public uploadImage(base64) {
        this.fileReader(base64).then((resolve) => {
            this.applicationUser().image(String(resolve));
        });

    }

    public fileReader(base64) {
        return new Promise((resolve, rejected) => {
            var reader = new FileReader();
            reader.addEventListener("load", function () {
                resolve(reader.result);
            }, false);

            if (base64) {
                reader.readAsDataURL(base64);
            }
        });
    }

    
}
class ApplicationUser {

    public firstName = ko.observable<string>();
    public lastName = ko.observable<string>();
    public image = ko.observable<string>();

    constructor() {
        this.firstName("");
        this.lastName("");
        this.image("");
    }
    

}