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
        this.firstName = ko.observable();
        this.lastName = ko.observable();
        this.dateOfBirth = ko.observable();
        this.dateOfDeath = ko.observable();
        this.birthPlace = ko.observable();
        this.description = ko.observable();
        this.image = ko.observable();
        this.treeId = ko.observable();
        this.degreeOfRelationship = ko.observable(new DegreeOfRelationship(0));
    }
    return FamilyMember;
}());
var DegreeOfRelationship = (function () {
    function DegreeOfRelationship(data) {
        this.DegreeOfRelationshipId = ko.observable();
        this.DegreeOfRelationshipId(data);
    }
    return DegreeOfRelationship;
}());
var TreeViewModel = (function () {
    function TreeViewModel() {
        this.familyMemberList = ko.observableArray([]);
        this.familyMemberToAdd = ko.observable(new FamilyMember());
    }
    TreeViewModel.prototype.ShowPopUp = function (fmb) {
        $(".bs-example-modal-sm").modal('show');
    };
    TreeViewModel.prototype.AddFamilyMember = function () {
        console.log(this.familyMemberToAdd());
        this.insertFamilyMember(this.familyMemberToAdd());
    };
    TreeViewModel.prototype.UploadImage = function (file) {
        console.log(file);
    };
    //public printTree(elem): void {
    //   // var divElements = document.getElementById('tree').innerHTML;
    //    //Get the HTML of whole page
    // //var oldPage = document.body.innerHTML;
    //    //Reset the page's HTML with div's HTML only
    //  // document.body.innerHTML =
    //   //    "<html><head><link rel='stylesheet' type='text/ css' href='../../Content/treeView.css' /><title></title></head><body>" +
    //     // divElements + "</body>";
    //    //Print Page
    // //   window.print();
    //    ////Restore orignal HTML
    //   // document.body.innerHTML = oldPage;
    //    //var mywindow = window.open('', 'PRINT', 'height=768,width=1366');
    //    //mywindow.document.write("<html><head><link rel=\"stylesheet\" type=\"text/css\" href=\"../../Content/treeView.css\" /><title>" + document.title + "</title>");
    //    //mywindow.document.write('</head><body >');
    //    //mywindow.document.write('<h1>' + document.title + '</h1>');
    //    //var data = document.getElementById(elem).innerHTML;
    //    //console.log(data);    
    //    //mywindow.document.write(data);
    //    //mywindow.document.write('</body></html>');
    //    //mywindow.document.close(); // necessary for IE >= 10
    //    //mywindow.focus(); // necessary for IE >= 10*/
    //    //setTimeout(function () { mywindow.print(); }, 100000);
    //    //mywindow.print();
    //   // mywindow.close();
    //}
    TreeViewModel.prototype.insertFamilyMember = function (fmember) {
        return new Promise(function (resolve, rejected) {
            var data = ko.toJSON(fmember);
            console.log(data);
            $.post('http://' + HomeViewModel.host + '/MyRoot/CreateFamilyMember', data, function (returnedData) {
                resolve(returnedData);
            });
        });
    };
    return TreeViewModel;
}());
//class FamilyMember {
//    public id = ko.observable<number>();
//    public firstName = ko.observable<string>();
//    public lastName = ko.observable<string>();
//    public dateOfBirth = ko.observable<string>();
//    public dateOfDeath = ko.observable<string>();
//    public birthPlace = ko.observable<string>();
//    public description = ko.observable<string>();
//    public image = ko.observable<string>();
//    public treeId = ko.observable<number>();
//    public degreeOfRelationship = ko.observable<DegreeOfRelationship>();
//    constructor() {
//        this.id(0)
//        this.firstName("");
//        this.lastName("");
//        this.dateOfBirth("");
//        this.dateOfDeath("");
//        this.birthPlace("");
//        this.description("");
//        this.image("");
//        this.treeId(0);
//        this.degreeOfRelationship(new DegreeOfRelationship(0));
//    }
//}
//# sourceMappingURL=TreeView.js.map