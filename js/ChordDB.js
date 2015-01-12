
define(
        ["Chord", "chordOffsets", "Note"],
    function(
        Chord, CHORD_OFFSETS, Note
    ){
        return function() {
            var self = this;

            var NOTE = new Note();

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

            self.findChordByName = function( chordName ) {
                for (var i in self.chords) {
                    var chord = self.chords[i];
                    if (chord.name == chordName)
                        return chord;
                }
                return null;
            };

            init();
        };
    }
);
