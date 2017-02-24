/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../../Scripts/typings/knockout/knockout.d.ts" />
/// <reference path="../../Scripts/typings/knockout/tests/jasmine.extensions.d.ts" />


$(document).ready(function () {
    let vm = document.getElementById("Home");
    ko.applyBindings(new HomeViewModel(), vm);
});

class HomeViewModel {

    constructor() {
        console.log("Weszlo");
    }

}