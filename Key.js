
var Key = function( name, notes) {
    var self = this;

    self.name = name;
    self.notes = notes;

    self.contains = function( note ) {
        return (self.notes.indexOf(note) >= 0);
    };
};

var Key_A = new Key("A", [0, 2, 4, 5, 7, 9, 11]);