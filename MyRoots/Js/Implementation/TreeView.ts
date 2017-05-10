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

    public printTree(elem): void {
       // var divElements = document.getElementById('tree').innerHTML;
     
        //Get the HTML of whole page
     //var oldPage = document.body.innerHTML;
      
        //Reset the page's HTML with div's HTML only
      // document.body.innerHTML =
       //    "<html><head><link rel='stylesheet' type='text/ css' href='../../Content/treeView.css' /><title></title></head><body>" +
         // divElements + "</body>";

        //Print Page
     //   window.print();
       

        ////Restore orignal HTML
       // document.body.innerHTML = oldPage;
        var mywindow = window.open('', 'PRINT', 'height=768,width=1366');

        mywindow.document.write("<html><head><link rel=\"stylesheet\" type=\"text/css\" href=\"../../Content/treeView.css\" /><title>" + document.title + "</title>");
        mywindow.document.write('</head><body >');
        mywindow.document.write('<h1>' + document.title + '</h1>');
        var data = document.getElementById(elem).innerHTML;
        console.log(data);    
        mywindow.document.write(data);
        mywindow.document.write('</body></html>');

        mywindow.document.close(); // necessary for IE >= 10

        mywindow.focus(); // necessary for IE >= 10*/
        setTimeout(function () { mywindow.print(); }, 100000);
       // mywindow.print();
       // mywindow.close();

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
        Stopień pokrewieństka : <select>\
            <option value='Ja'>Ja</option>\
            <option value='Brat'>Brat</option>\
            <option value='Ojciec'>Ojciec</option>\
            <option value='Dziadek'>Dziadek</option>\
            <option value='Pradziadek'>Pradziadek</option>\
            <option value='Prapradziadek'>Prapradziadek</option>\
        <select><br/>\
        Zdjęcie :<input type='file' name='zdjecie' /><br/>\
        </form>", function (result) {     
                 if (result) {                
                    var firstName = $("#infos").find("input[name='firstName']").val();
                    var lastName = $("#infos").find("input[name='lastName']").val();
                    var dateOfBirth = $("#infos").find("input[name='dateOfBirth']").val();
                    var dateOfDeath = $("#infos").find("input[name='dateOfDeath']").val();
                    var birthPlace = $("#infos").find("input[name='birthPlace']").val();
                    var description = $("#infos").find("input[name='description']").val();
                    var DegreeOfRelationshipId = $('#infos option:selected').val();



                    if (DegreeOfRelationshipId == "Ja") {
                        fm.degreeOfRelationship(new DegreeOfRelationship(2));
                    } else if (DegreeOfRelationshipId == "Brat") {
                        fm.degreeOfRelationship(new DegreeOfRelationship(1));
                    } else if (DegreeOfRelationshipId == "Ojciec") {
                        fm.degreeOfRelationship(new DegreeOfRelationship(4));
                    } else if (DegreeOfRelationshipId == "Dziadek") {
                        fm.degreeOfRelationship(new DegreeOfRelationship(6));
                    } else if (DegreeOfRelationshipId == "Pradziadek") {
                        fm.degreeOfRelationship(new DegreeOfRelationship(7));
                    } else if (DegreeOfRelationshipId == "Prapradziadek") {
                        fm.degreeOfRelationship(new DegreeOfRelationship(8));
                    }

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
    public degreeOfRelationship = ko.observable<DegreeOfRelationship>();

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
        this.degreeOfRelationship(new DegreeOfRelationship(0));
    }

}

class DegreeOfRelationship {
    public DegreeOfRelationshipId = ko.observable<number>();

    constructor(data) {
        this.DegreeOfRelationshipId(data)
    }

}

