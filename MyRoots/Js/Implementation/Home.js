/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../../Scripts/typings/knockout/knockout.d.ts" />
/// <reference path="../../Scripts/typings/knockout/tests/jasmine.extensions.d.ts" />
/// <reference path="../../scripts/typings/gateway/axcorlib.d.ts" />
/// <reference path="../../scripts/typings/gateway/mscorlib.d.ts" />
/// <reference path="../../scripts/typings/promise/promise.d.ts" />
$(document).ready(function () {
    var vm = document.getElementById("sidebar");
    ko.applyBindings(new HomeViewModel(), vm);
});
var HomeViewModel = (function () {
    function HomeViewModel() {
        var _this = this;
        this.firstAndLastName = ko.observable();
        this.GetCurrentName().then(function (resolve) {
            _this.firstAndLastName(resolve);
        });
    }
    HomeViewModel.prototype.GetCurrentName = function () {
        return new Promise(function (resolve, rejected) {
            $.ajax({
                'url': 'http://' + HomeViewModel.host + '/MyRoot/GetFirstNameAndLastName',
                'type': 'GET',
                'success': function (data) {
                    resolve(data);
                }
            });
        });
    };
    HomeViewModel.host = window.location.host;
    return HomeViewModel;
}());
//# sourceMappingURL=Home.js.map