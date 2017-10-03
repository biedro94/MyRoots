/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../../Scripts/typings/knockout/knockout.d.ts" />
/// <reference path="../../Scripts/typings/knockout/tests/jasmine.extensions.d.ts" />
/// <reference path="../../scripts/typings/gateway/axcorlib.d.ts" />
/// <reference path="../../scripts/typings/gateway/mscorlib.d.ts" />
/// <reference path="../../scripts/typings/promise/promise.d.ts" />
/// <reference path="../../scripts/typings/bootbox/index.d.ts" />


interface FileReaderEventTarget extends EventTarget {
    result: string
}

interface FileReaderEvent extends Event {
    target: FileReaderEventTarget;
    getMessage(): string;
}

$(document).ready(function () {
    var vm = document.getElementById("treeView");
    ko.applyBindings(new TreeViewModel(), vm);
});

class FamilyMember {
    public id = ko.observable<number>();
    public FirstName = ko.observable<string>();
    public LastName = ko.observable<string>();
    public DateOfBirth = ko.observable(new Date());
    public DateOfDeath = ko.observable(new Date());
    public BirthPlace = ko.observable<string>();
    public Description = ko.observable<string>();
    public Image = ko.observable<string>();
    public TreeId = ko.observable<number>();
    public DegreeOfRelationship = ko.observable<DegreeOfRelationship>();
}

class DegreeOfRelationship {
    public DegreeOfRelationshipId = ko.observable<number>();
    public Name = ko.observable<string>();
    public ShortName = ko.observable<string>();
    public Me = ko.observable<boolean>();

    constructor(id: number, name: string, shortName: string, me: boolean) {
        this.DegreeOfRelationshipId(id);
        this.Name(name);
        this.ShortName(shortName);
        this.Me(me);
    }
}


class TreeViewModel {

    public familyMemberList = ko.observableArray<FamilyMember>([]);
    public familyMemberToAdd = ko.observable(new FamilyMember());
    public filebase64 = ko.observable();
    public selectedDeegreeOfRelationShip = ko.observable<number>();
    public degreesOfRelationShipsArray = ko.observableArray<DegreeOfRelationship>([]);


    //public img = document.getElementById("fmImage");

    constructor() {
        this.LoadDegreeOfRelationShipArray();
    }

    public LoadDegreeOfRelationShipArray(): void {
        this.degreesOfRelationShipsArray.push(new DegreeOfRelationship(1, "Ja", "JA", true));
        this.degreesOfRelationShipsArray.push(new DegreeOfRelationship(2, "Brat", "BR", false));
        this.degreesOfRelationShipsArray.push(new DegreeOfRelationship(3, "Siostra", "SIS", false));
        this.degreesOfRelationShipsArray.push(new DegreeOfRelationship(4, "Ojciec", "OJ", false));
        this.degreesOfRelationShipsArray.push(new DegreeOfRelationship(5, "Matka", "MT", false));
        this.degreesOfRelationShipsArray.push(new DegreeOfRelationship(6, "Dziadek", "DZI", false));
        this.degreesOfRelationShipsArray.push(new DegreeOfRelationship(7, "Babcia", "BAB", false));
        this.degreesOfRelationShipsArray.push(new DegreeOfRelationship(8, "Pradziadek", "PRDZI", false));
        this.degreesOfRelationShipsArray.push(new DegreeOfRelationship(9, "Prababcia", "PRBAB", false));
    }


    public ShowPopUp(fmb): void {
        $(".bs-example-modal-sm").modal('show');
    }

    public AddFamilyMember(): void {
        this.familyMemberToAdd().DegreeOfRelationship(this.GetObjectFromArraybyValue(this.selectedDeegreeOfRelationShip()));
        console.log(this.familyMemberToAdd());
        //this.insertFamilyMember(this.familyMemberToAdd());

        this.insertFamilyMember(this.familyMemberToAdd()).then(resolve => {
            $(".bs-example-modal-sm").modal('hide');
            setTimeout($('.alert').show(),1000);
        }, rejected => {
            console.log("NIE POSZLO");
        });
    }

    public GetObjectFromArraybyValue(val): DegreeOfRelationship {
        return ko.utils.arrayFirst(this.degreesOfRelationShipsArray(), function (obj) {
            return obj.DegreeOfRelationshipId() == val;
        });
    }

    public UploadImage(file): void {

        this.GetBase64(file).then((response:string) => {
            this.familyMemberToAdd().Image(response);
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
    }

    public GetBase64(file) {
        var reader = new FileReader();
        var deferred = $.Deferred();
        reader.onload = function (fileLoadedEvent: FileReaderEvent) {
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
    }

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

    public insertFamilyMember(fmember) {
        return new Promise((resolve, rejected) => {
            var data = ko.toJSON(fmember);
            var data1 = JSON.stringify(data); 
            console.log(data1);           
            console.log(data);
            $.post('http://' + HomeViewModel.host + '/MyRoot/CreateFamilyMember', data, function (returnedData) {
                resolve(returnedData);
            });
        });
    }

    //public familyMemberForm() {
    //    let fm = new FamilyMember();
    //    bootbox.confirm("<form id='infos' action=''>\
    //   Imie :<input type='text' name='firstName' /><br/>\
    //    Nazwisko :<input type='text' name='lastName' /><br/>\
    //    Data urodzenia :<input type='date' name='dateOfBirth' /><br/>\
    //    Data śmierci :<input type='date' name='dateOfDeath' /><br/>\
    //    Miejsce urodzenia :<input type='text' name='birthPlace' /><br/>\
    //    Opis :<input type='text' name='description' /><br/>\
    //    Stopień pokrewieństka : <select>\
    //        <option value='Ja'>Ja</option>\
    //        <option value='Brat'>Brat</option>\
    //        <option value='Ojciec'>Ojciec</option>\
    //        <option value='Dziadek'>Dziadek</option>\
    //        <option value='Pradziadek'>Pradziadek</option>\
    //        <option value='Prapradziadek'>Prapradziadek</option>\
    //    <select><br/>\
    //    Zdjęcie :<input type='file' name='zdjecie' /><br/>\
    //    </form>", function (result) {     
    //             if (result) {                
    //                var firstName = $("#infos").find("input[name='firstName']").val();
    //                var lastName = $("#infos").find("input[name='lastName']").val();
    //                var dateOfBirth = $("#infos").find("input[name='dateOfBirth']").val();
    //                var dateOfDeath = $("#infos").find("input[name='dateOfDeath']").val();
    //                var birthPlace = $("#infos").find("input[name='birthPlace']").val();
    //                var description = $("#infos").find("input[name='description']").val();
    //                var DegreeOfRelationshipId = $('#infos option:selected').val();

    //                if (DegreeOfRelationshipId == "Ja") {
    //                    fm.degreeOfRelationship(new DegreeOfRelationship(2));
    //                } else if (DegreeOfRelationshipId == "Brat") {
    //                    fm.degreeOfRelationship(new DegreeOfRelationship(1));
    //                } else if (DegreeOfRelationshipId == "Ojciec") {
    //                    fm.degreeOfRelationship(new DegreeOfRelationship(4));
    //                } else if (DegreeOfRelationshipId == "Dziadek") {
    //                    fm.degreeOfRelationship(new DegreeOfRelationship(6));
    //                } else if (DegreeOfRelationshipId == "Pradziadek") {
    //                    fm.degreeOfRelationship(new DegreeOfRelationship(7));
    //                } else if (DegreeOfRelationshipId == "Prapradziadek") {
    //                    fm.degreeOfRelationship(new DegreeOfRelationship(8));
    //                }

    //                fm.firstName(firstName);
    //                fm.lastName(lastName);
    //                fm.dateOfBirth(dateOfBirth);
    //                fm.dateOfDeath(dateOfDeath);
    //                fm.birthPlace(birthPlace);
    //                fm.description(description);
    //                let ob = new TreeViewModel();
    //                ob.insertFamilyMember(fm);                                  
    //            }                  
    //        });

    //}
}



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



