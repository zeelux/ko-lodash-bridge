; (function () {
    'use strict';

    function Character(first, last) {
        this.firstName = ko.observable(first);
        this.lastName = ko.observable(last);

        this.fullName = ko.computed(function () {
            return this.firstName() + ' ' + this.lastName();
        }, this);
    }

    function ViewModel() {
        this.characters = ko.observableArray([
            new Character('Fred', 'Flintstone'),
            new Character('Wilma', 'Flintstone'),
            new Character('Barney', 'Rubble')
        ]);
        this.firstNameFilter = ko.observable('');
        this.filteredCharacters =  ko.computed(filterCharacters.bind(null, this));
    }

    function filterCharacters(self) {
        var allCharacters = self.characters(),
            filterStr = self.firstNameFilter();

        if (!filterStr) {
            return allCharacters;
        }

        return _.filter(allCharacters, { firstName: filterStr });
    }

    ko.applyBindings(new ViewModel());

})();