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
var TreeViewModel = (function () {
    function TreeViewModel() {
    }
    TreeViewModel.prototype.insertFamilyMember = function (fmember) {
        return new Promise(function (resolve, rejected) {
            var data = ko.toJSON(fmember);
            console.log(data);
            $.post('http://' + HomeViewModel.host + '/MyRoot/CreateFamilyMember', data, function (returnedData) {
                resolve(returnedData);
            });
        });
    };
    TreeViewModel.prototype.familyMemberForm = function () {
        var fm = new FamilyMember();
        bootbox.confirm("<form id='infos' action=''>\
       Imie :<input type='text' name='firstName' /><br/>\
        Nazwisko :<input type='text' name='lastName' /><br/>\
        Data urodzenia :<input type='date' name='dateOfBirth' /><br/>\
        Data śmierci :<input type='date' name='dateOfDeath' /><br/>\
        Miejsce urodzenia :<input type='text' name='birthPlace' /><br/>\
        Opis :<input type='text' name='description' /><br/>\
        Zdjęcie :<input type='file' name='zdjecie' /><br/>\
        </form>", function (result) {
            if (result) {
                var firstName = $("#infos").find("input[name='firstName']").val();
                var lastName = $("#infos").find("input[name='lastName']").val();
                var dateOfBirth = $("#infos").find("input[name='dateOfBirth']").val();
                var dateOfDeath = $("#infos").find("input[name='dateOfDeath']").val();
                var birthPlace = $("#infos").find("input[name='birthPlace']").val();
                var description = $("#infos").find("input[name='description']").val();
                fm.firstName(firstName);
                fm.lastName(lastName);
                fm.dateOfBirth(dateOfBirth);
                fm.dateOfDeath(dateOfDeath);
                fm.birthPlace(birthPlace);
                fm.description(description);
                var ob = new TreeViewModel();
                ob.insertFamilyMember(fm);
            }
        });
    };
    return TreeViewModel;
}());
var FamilyMember = (function () {
    function FamilyMember() {
        this.id = ko.observable();
        this.firstName = ko.observable();
        this.lastName = ko.observable();
        this.dateOfBirth = ko.observable();
        this.dateOfDeath = ko.observable();
        this.birthPlace = ko.observable();
        this.description = ko.observable();
        this.image = ko.observable();
        this.treeId = ko.observable();
        this.degreeOfRelationShipsId = ko.observable();
        this.id(0);
        this.firstName("");
        this.lastName("");
        this.dateOfBirth("");
        this.dateOfDeath("");
        this.birthPlace("");
        this.description("");
        this.image("");
        this.treeId(0);
        this.degreeOfRelationShipsId(0);
    }
    return FamilyMember;
}());
//# sourceMappingURL=TreeView.js.map