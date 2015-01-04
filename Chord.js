
var CHORD_OFFSETS = {
    "5"     : [0, 7],               //  1 - 5
    ""      : [0, 4, 7],            //  1 - 3 - 5
    "6"     : [0, 4, 7, 9],         //  1 - 3 - 5 - 6
    "7"     : [0, 4, 7, 10],        //  1 - 3 - 5 - b7
    "maj7"  : [0, 4, 7, 11],        //  1 - 3 - 5 - 7
    "add9"  : [0, 4, 7, 2],         //  1 - 3 - 5 - 9
    "9"     : [0, 4, 7, 10, 2],     //  1 - 3 - 5 - b7 - 9
    "maj9"  : [0, 4, 7, 11, 2],     //  1 - 3 - 5 - 7 - 9
    "m"     : [0, 3, 7],            //  1 - b3 - 5
    "m6"    : [0, 3, 7, 9],         //  1 - b3 - 5 - 6
    "m7"    : [0, 3, 7, 10],        //  1 - b3 - 5 - b7
    "mmaj7" : [0, 3, 7, 11],        //  1 - b3 - 5 - 7
    "madd9" : [0, 3, 7, 2],         //  1 - b3 - 5 - 9
    "m9"    : [0, 3, 7, 10, 2],     //  1 - b3 - 5 - b7 - 9
    "mmaj9" : [0, 3, 7, 11, 2],     //  1 - b3 - 5 - 7 - 9
    "aug"   : [0, 4, 8],            //  1 - b3 - b5
    "dim"   : [0, 3, 6],            //  1 - b3 - b5
    "dim7"  : [0, 3, 6, 9]          //  1 - b3 - b5 - 6(bb7)
};


var Chord = function(noteName, type) {
    var self = this;

    self.noteName = noteName;
    self.type = type;
    self.note = null;

    self.name = null;
    self.notes = null;

    var init = function() {
        if (!self.type)
            self.type = "";
        var offsets = CHORD_OFFSETS[self.type];
        if (!offsets)
            console.error("unknown type in Chord: " + self.type);

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
        var types = Object.keys(CHORD_OFFSETS);
        for (var t in types) {
            var type = types[t];
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

