/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../../Scripts/typings/knockout/knockout.d.ts" />
/// <reference path="../../Scripts/typings/knockout/tests/jasmine.extensions.d.ts" />
/// <reference path="../../scripts/typings/gateway/axcorlib.d.ts" />
/// <reference path="../../scripts/typings/gateway/mscorlib.d.ts" />
/// <reference path="../../scripts/typings/promise/promise.d.ts" />
/// <reference path="../../scripts/typings/bootbox/index.d.ts" />
$(document).ready(function () {
    var vm = document.getElementById("treeView");
    ko.applyBindings(new TreeViewModel(), vm);
});
var FamilyMember = (function () {
    function FamilyMember() {
        this.id = ko.observable();
        this.FirstName = ko.observable();
        this.LastName = ko.observable();
        this.DateOfBirth = ko.observable(new Date());
        this.DateOfDeath = ko.observable(new Date());
        this.BirthPlace = ko.observable();
        this.Description = ko.observable();
        this.Image = ko.observable();
        this.TreeId = ko.observable();
        this.DegreeOfRelationship = ko.observable();
    }
    return FamilyMember;
}());
var DegreeOfRelationship = (function () {
    function DegreeOfRelationship(id, name, shortName, me) {
        this.DegreeOfRelationshipId = ko.observable();
        this.Name = ko.observable();
        this.ShortName = ko.observable();
        this.Me = ko.observable();
        this.DegreeOfRelationshipId(id);
        this.Name(name);
        this.ShortName(shortName);
        this.Me(me);
    }
    return DegreeOfRelationship;
}());
var TreeViewModel = (function () {
    function TreeViewModel() {
        this.familyMemberList = ko.observableArray([]);
        this.familyMemberToAdd = ko.observable(new FamilyMember());
        this.filebase64 = ko.observable();
        this.selectedDeegreeOfRelationShip = ko.observable();
        this.degreesOfRelationShipsArray = ko.observableArray([]);
        this.LoadDegreeOfRelationShipArray();
    }
    TreeViewModel.prototype.LoadDegreeOfRelationShipArray = function () {
        this.degreesOfRelationShipsArray.push(new DegreeOfRelationship(1, "Ja", "JA", true));
        this.degreesOfRelationShipsArray.push(new DegreeOfRelationship(2, "Brat", "BR", false));
        this.degreesOfRelationShipsArray.push(new DegreeOfRelationship(3, "Siostra", "SIS", false));
        this.degreesOfRelationShipsArray.push(new DegreeOfRelationship(4, "Ojciec", "OJ", false));
        this.degreesOfRelationShipsArray.push(new DegreeOfRelationship(5, "Matka", "MT", false));
        this.degreesOfRelationShipsArray.push(new DegreeOfRelationship(6, "Dziadek", "DZI", false));
        this.degreesOfRelationShipsArray.push(new DegreeOfRelationship(7, "Babcia", "BAB", false));
        this.degreesOfRelationShipsArray.push(new DegreeOfRelationship(8, "Pradziadek", "PRDZI", false));
        this.degreesOfRelationShipsArray.push(new DegreeOfRelationship(9, "Prababcia", "PRBAB", false));
    };
    TreeViewModel.prototype.ShowPopUp = function (fmb) {
        $(".bs-example-modal-sm").modal('show');
    };
    TreeViewModel.prototype.AddFamilyMember = function () {
        this.familyMemberToAdd().DegreeOfRelationship(this.GetObjectFromArraybyValue(this.selectedDeegreeOfRelationShip()));
        this.insertFamilyMember(this.familyMemberToAdd()).then(function (resolve) {
            $(".bs-example-modal-sm").modal('hide');
            setTimeout($('#resultAlert').show(), 1000);
            setTimeout($('#resultAlert').hide(), 5000);
        }, function (rejected) {
            console.log("NIE POSZLO");
        });
    };
    TreeViewModel.prototype.GetObjectFromArraybyValue = function (val) {
        return ko.utils.arrayFirst(this.degreesOfRelationShipsArray(), function (obj) {
            return obj.DegreeOfRelationshipId() == val;
        });
    };
    TreeViewModel.prototype.UploadImage = function (file) {
        var _this = this;
        this.GetBase64(file).then(function (response) {
            _this.familyMemberToAdd().Image(response);
        });
    };
    TreeViewModel.prototype.GetBase64 = function (file) {
        var reader = new FileReader();
        var deferred = $.Deferred();
        reader.onload = function (fileLoadedEvent) {
            deferred.resolve(fileLoadedEvent.target.result);
        };
        reader.readAsDataURL(file);
        return deferred.promise();
    };
    TreeViewModel.prototype.insertFamilyMember = function (fmember) {
        return new Promise(function (resolve, rejected) {
            var data = ko.toJSON(fmember);
            $.post('http://' + HomeViewModel.host + '/MyRoot/CreateFamilyMember', data, function (returnedData) {
                resolve(returnedData);
            });
        });
    };
    return TreeViewModel;
}());
//# sourceMappingURL=TreeView.js.map