/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../../Scripts/typings/knockout/knockout.d.ts" />
/// <reference path="../../Scripts/typings/knockout/tests/jasmine.extensions.d.ts" />
/// <reference path="../../scripts/typings/gateway/axcorlib.d.ts" />
/// <reference path="../../scripts/typings/gateway/mscorlib.d.ts" />
/// <reference path="../../scripts/typings/promise/promise.d.ts" />
$(document).ready(function () {
    var vm = document.getElementById("nav-accordion");
    ko.applyBindings(new HomeViewModel(), vm);
});
var HomeViewModel = (function () {
    function HomeViewModel() {
        var _this = this;
        this.firstAndLastName = ko.observable();
        this.avatarString = ko.observable();
        this.GetCurrentName().then(function (resolve) {
            _this.GetAvatar().then(function (resolve) {
                var tmpString = "/Images/" + resolve;
                _this.avatarString(tmpString);
            }, function (rejected) { });
            _this.firstAndLastName(resolve);
        }, function (rejected) { });
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
    HomeViewModel.prototype.GetAvatar = function () {
        return new Promise(function (resolve, rejected) {
            $.ajax({
                'url': 'http://' + HomeViewModel.host + '/MyRoot/GetAvatarForUser',
                'type': 'GET',
                'success': function (data) {
                    resolve(data);
                }
            });
        });
    };
    //    this.GetAvatar().then((resolve) => {
    //        let tmpString = "data:image/bmp;base64," + resolve;
    //        this.avatarString(tmpString);
    //    }, (rejected) => {
    //        this.GetAvatar();
    //  }/*);
    /*  }, (rejected) => {
          this.GetCurrentName();
          });
          */
    //  }
    HomeViewModel.host = window.location.host;
    return HomeViewModel;
}());
//# sourceMappingURL=Home.js.map