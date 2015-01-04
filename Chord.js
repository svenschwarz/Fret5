
var Chord = function(noteName, type) {
    var self = this;

    self.noteName = noteName;
    self.type = type;
    self.note = null;

    self.name = null;
    self.notes = null;

    var init = function() {
        var offsets = [0, 4, 7];
        if (self.type) {
            if (self.type == "m")
                offsets = [0, 3, 7];
            else
                console.error("unknown type in Chord: " + self.type);
        }
        self.name = (self.type  ?  self.noteName + self.type  :  self.noteName);
        self.note = NOTE.getNote(noteName);
        var notes = [];
        for (var i = 0; i < offsets.length; i++) {
            var n = (self.note + offsets[i]) % 12;
            notes.push(n);
        }
        self.notes = notes;
    };


    self.contains = function (note) {
        return (self.notes.indexOf(note) >= 0);
    };

    self.match = function (notes) {
        var inter = arrayIntersection(self.notes, notes);
        if (inter.length == self.notes.length && inter.length == notes.length)
            return true;

        return false;
    };

    init();
};


var ChordDB = function() {
    var self = this;

    self.chords = [];

    var init = function() {
        for (var t in [0,1]) {
            var type = (t == 0  ?  ""  :  "m");
            for (var note = 0; note < 12; note++) {
                var noteName = NOTE.getName(note);
                self.chords.push(new Chord(noteName, type));
            }
        }
    };

    self.findMatchingChords = function( notes ) {
        var matchingChords = [];
        for (var i in self.chords) {
            var chord = self.chords[i];
            var match = chord.match(notes);
            if (match)
                matchingChords.push(chord);
        }
        return matchingChords;
    };

    init();
};


var CHORD_DB = new ChordDB();

