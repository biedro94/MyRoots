/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../../Scripts/typings/knockout/knockout.d.ts" />
/// <reference path="../../Scripts/typings/knockout/tests/jasmine.extensions.d.ts" />
/// <reference path="../../scripts/typings/gateway/axcorlib.d.ts" />
/// <reference path="../../scripts/typings/gateway/mscorlib.d.ts" />
/// <reference path="../../scripts/typings/promise/promise.d.ts" />


$(document).ready(function () {

    let vm = document.getElementById("settingsTree");
    ko.applyBindings(new SettingsTreeViewModel(), vm);

});

class SettingsTreeViewModel {

    public treeName = ko.observable<string>();
    public static host: string = window.location.host;

    constructor() {
        
    }

    public insertTreeName() {
        console.log(this.treeName());
        return new Promise((resolve, rejected) => {
            $.ajax({
                'url': 'http://' + HomeViewModel.host + '/MyRoot/CreateTree?treeName=' + this.treeName(),
                'type': 'POST',
                'success': function (data) {
                    resolve(data);
                }
            });

        }); 
    }

}