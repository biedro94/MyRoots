/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../../Scripts/typings/knockout/knockout.d.ts" />
/// <reference path="../../Scripts/typings/knockout/tests/jasmine.extensions.d.ts" />
$(document).ready(function () {
    var vm = document.getElementById("Home");
    ko.applyBindings(new HomeViewModel(), vm);
});
var HomeViewModel = (function () {
    function HomeViewModel() {
        console.log("Weszlo");
    }
    return HomeViewModel;
}());
//# sourceMappingURL=Home.js.map