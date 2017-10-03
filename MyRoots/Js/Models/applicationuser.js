/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../../Scripts/typings/knockout/knockout.d.ts" />
/// <reference path="../../Scripts/typings/knockout/tests/jasmine.extensions.d.ts" />
"use strict";
var ApplicationUser = (function () {
    function ApplicationUser() {
        this.firstName = ko.observable();
        this.lastName = ko.observable();
        this.image = ko.observable();
        this.firstName("");
        this.lastName("");
        this.image("");
    }
    return ApplicationUser;
}());
exports.ApplicationUser = ApplicationUser;
