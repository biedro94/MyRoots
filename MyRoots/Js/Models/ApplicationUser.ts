/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../../Scripts/typings/knockout/knockout.d.ts" />
/// <reference path="../../Scripts/typings/knockout/tests/jasmine.extensions.d.ts" />

export class ApplicationUser {

        public firstName = ko.observable<string>();
        public lastName = ko.observable<string>();
        public image = ko.observable<string>();

        constructor() {
            this.firstName("");
            this.lastName("");
            this.image("");
        }
    }



