/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../../Scripts/typings/knockout/knockout.d.ts" />
/// <reference path="../../Scripts/typings/knockout/tests/jasmine.extensions.d.ts" />
/// <reference path="../../scripts/typings/gateway/axcorlib.d.ts" />
/// <reference path="../../scripts/typings/gateway/mscorlib.d.ts" />
/// <reference path="../../scripts/typings/promise/promise.d.ts" />


$(document).ready(function () {
    let vm = document.getElementById("sidebar");
    ko.applyBindings(new HomeViewModel(), vm);
});

class HomeViewModel {
    public firstAndLastName = ko.observable();

    constructor() {
        this.GetCurrentName().then((resolve) => {
            this.firstAndLastName(resolve);
        });
    }

    public static host: string = window.location.host;


    public GetCurrentName() {
        return new Promise((resolve, rejected) => {
            $.ajax({
                'url': 'http://'+HomeViewModel.host +'/MyRoot/GetFirstNameAndLastName',
                'type': 'GET',
                'success': function (data) {
                    resolve(data);
                }
            });

        });        
    }

}