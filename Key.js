/**
 *
 * @param keyNoteName e.g. "A"
 * @param keyType "m" -> moll, otherwise -> dur
 * @constructor
 */
var Key = function( keyNoteName, keyType) {
    var self = this;

    self.keyNoteName = keyNoteName;
    self.keyType = keyType;

    var durOffsets = [0, 2, 4, 5, 7, 9, 11];
    var mollOffsets = [0, 2, 3, 5, 7, 8, 10];

    self.keyNote = -1;
    self.notes = [];

    var initNotes = function() {
        var offsets = durOffsets;
        if (self.keyType) {
            if (self.keyType == "m")
                offsets = mollOffsets;
            else {
                console.error("unexpected keyType in Key: " + self.keyType);
                return;
            }
        }
        self.name = (self.keyType  ?  self.keyNoteName + self.keyType :  self.keyNoteName);
        var notes = [];
        self.keyNote = NOTE.getNote(self.keyNoteName);
        if (self.keyNote < 0) {
            console.error("unknown note keyNoteName in Key: " + self.keyNoteName);
            return;
        }
        for( var i = 0; i < offsets.length; i++) {
            var note = (self.keyNote + offsets[i]) % 12;
            notes.push(note);
        }
        self.notes = notes;
    };

    self.contains = function( note ) {
        return (self.notes.indexOf(note) >= 0);
    };

    self.getKeyTypeName = function() {
        if (!self.keyType)
            return "dur";
        else if (self.keyType == "m")
            return "moll";

        console.error("unknown key type in Key.getKeyTypeName: " + self.keyType);
        return "???";
    };

    self.nextKey = function() {
        self.keyNote = (self.keyNote + 1) % 12;
        self.keyNoteName = NOTE.getName(self.keyNote);
        initNotes();
    };

    self.previousKey = function() {
        self.keyNote = (self.keyNote + 11) % 12;
        self.keyNoteName = NOTE.getName(self.keyNote);
        initNotes();
    };

    self.toggleKeyType = function() {
        self.keyType = (self.keyType == "m"  ?  undefined  :  "m");
        initNotes();
    };

    initNotes();
};


var Key_A = new Key("A");
