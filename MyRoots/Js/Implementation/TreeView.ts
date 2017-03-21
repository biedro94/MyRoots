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



class TreeViewModel {


    constructor() {

    }

    public insertFamilyMember(fmember) {
        return new Promise((resolve, rejected) => {
            var data = ko.toJSON(fmember);
            console.log(data);
            $.post('http://' + HomeViewModel.host + '/MyRoot/CreateFamilyMember', data, function (returnedData) {
                resolve(returnedData);
            });
        });
    }

    public familyMemberForm() {
        let fm = new FamilyMember();
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
                    let ob = new TreeViewModel();
                    ob.insertFamilyMember(fm);                                  
                }                  
            });
       
    }
}




class FamilyMember {
    public id = ko.observable<number>();
    public firstName = ko.observable<string>();
    public lastName = ko.observable<string>();
    public dateOfBirth = ko.observable<string>();
    public dateOfDeath = ko.observable<string>();
    public birthPlace = ko.observable<string>();
    public description = ko.observable<string>();
    public image = ko.observable<string>();
    public treeId = ko.observable<number>();
    public degreeOfRelationShipsId = ko.observable<number>();

    constructor() {
        this.id(0)
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

}


