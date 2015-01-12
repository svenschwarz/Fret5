
define(
        ["arrayutils", "chordOffsets", "Note"],
    function(
        arrayutils, CHORD_OFFSETS, Note
    ){
        return function (noteName, type) {
            var self = this;

            var NOTE = new Note();

            self.noteName = noteName;
            self.type = type;
            self.note = null;

            self.name = null;
            self.notes = null;

            var init = function () {
                if (!self.type)
                    self.type = "";
                var offsets = CHORD_OFFSETS[self.type];
                if (!offsets)
                    console.error("unknown type in Chord: " + self.type);

                self.name = (self.type ? self.noteName + self.type : self.noteName);
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
                var inter = arrayutils.arrayIntersection(self.notes, notes);
                if (inter.length == self.notes.length && inter.length == notes.length)
                    return true;

                return false;
            };

            init();
        };
    }
);
