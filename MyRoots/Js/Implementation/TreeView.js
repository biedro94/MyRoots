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
    //public img = document.getElementById("fmImage");
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
        console.log(this.familyMemberToAdd());
        //this.insertFamilyMember(this.familyMemberToAdd());
        this.insertFamilyMember(this.familyMemberToAdd()).then(function (resolve) {
            $(".bs-example-modal-sm").modal('hide');
            setTimeout($('.alert').show(), 1000);
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
        //this.familyMemberToAdd().Image(reader.result);
        //reader.onload = function (fileLoadedEvent: FileReaderEvent) {
        //    var textAreaFileContents = document.getElementById
        //        (
        //        "fmImage"
        //        );
        //    console.log(fileLoadedEvent.target.result);
        //    textAreaFileContents.innerHTML = fileLoadedEvent.target.result;
        //    //result = fileLoadedEvent.target.result;
        //};
        //this.GetBase64(file).then((response)=>{
        //    console.log(response);
        //});
        //this.familyMemberToAdd().Image(this.fileBase64());
        //console.log(this.fileBase64());
    };
    TreeViewModel.prototype.GetBase64 = function (file) {
        var reader = new FileReader();
        var deferred = $.Deferred();
        reader.onload = function (fileLoadedEvent) {
            deferred.resolve(fileLoadedEvent.target.result);
            //console.log("weszlo");
            //var textAreaFileContents = document.getElementById
            //    (
            //    "fmImage"
            //    );
            //textAreaFileContents.innerHTML = fileLoadedEvent.target.result;
            //resolve(GetBase64());
            //result = fileLoadedEvent.target.result;
        };
        reader.readAsDataURL(file);
        return deferred.promise();
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
            var data1 = JSON.stringify(data);
            console.log(data1);
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