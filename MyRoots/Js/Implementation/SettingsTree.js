/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../../Scripts/typings/knockout/knockout.d.ts" />
/// <reference path="../../Scripts/typings/knockout/tests/jasmine.extensions.d.ts" />
/// <reference path="../../scripts/typings/gateway/axcorlib.d.ts" />
/// <reference path="../../scripts/typings/gateway/mscorlib.d.ts" />
/// <reference path="../../scripts/typings/promise/promise.d.ts" />
$(document).ready(function () {
    var vm = document.getElementById("settingsTree");
    ko.applyBindings(new SettingsTreeViewModel(), vm);
});
var SettingsTreeViewModel = (function () {
    function SettingsTreeViewModel() {
        this.treeName = ko.observable();
    }
    SettingsTreeViewModel.prototype.insertTreeName = function () {
        var _this = this;
        console.log(this.treeName());
        return new Promise(function (resolve, rejected) {
            $.ajax({
                'url': 'http://' + HomeViewModel.host + '/MyRoot/CreateTree?treeName=' + _this.treeName(),
                'type': 'POST',
                'success': function (data) {
                    resolve(data);
                }
            });
        });
    };
    SettingsTreeViewModel.host = window.location.host;
    return SettingsTreeViewModel;
}());
//# sourceMappingURL=SettingsTree.js.map