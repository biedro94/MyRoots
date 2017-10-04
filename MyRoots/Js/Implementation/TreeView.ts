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

        this.insertFamilyMember(this.familyMemberToAdd()).then(resolve => {
            $(".bs-example-modal-sm").modal('hide');
            setTimeout($('#resultAlert').show(), 1000);
            setTimeout($('#resultAlert').hide(), 5000);
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

        this.GetBase64(file).then((response: string) => {
            this.familyMemberToAdd().Image(response);
        });
    }

    public GetBase64(file) {
        var reader = new FileReader();
        var deferred = $.Deferred();
        reader.onload = function (fileLoadedEvent: FileReaderEvent) {
            deferred.resolve(fileLoadedEvent.target.result);
        };
        reader.readAsDataURL(file);

        return deferred.promise();
    }

    public insertFamilyMember(fmember) {
        return new Promise((resolve, rejected) => {
            var data = ko.toJSON(fmember);
            $.post('http://' + HomeViewModel.host + '/MyRoot/CreateFamilyMember', data, function (returnedData) {
                resolve(returnedData);
            });
        });
    }
}