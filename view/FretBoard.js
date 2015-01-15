
define(
        ["knockout", "views", "Note", "ChordDB"],
    function(
        ko, views, Note, ChordDB
    ){
        return function(multiFretBoard) {
            var self = this;

            var CHORD_DB = new ChordDB();
            var NOTE = new Note();

            self.multiFretBoard = multiFretBoard;
            self.fretBoardId = null;

            self.key = ko.observable( multiFretBoard.createMatchingKey() );
            self.table = ko.observableArray(null);
            self.markedNotesArray = ko.observableArray([ [], [], [] ]);
            self.selectedColor = ko.observable(0);
            self.matchingChordsArray = ko.observableArray([ [], [], [] ]);

            self.keyTypeName = ko.computed(function(){
                return self.key().getKeyTypeName();
            });

            self.markingColors = [
                "#ffff00",
                "#ff2000",
                "#90ee90"
            ];

            self.markingBackgroundColors = [
                "#ffffc0",
                "#ffd0c0",
                "#e0ffe0"
            ];

            var tuning = [
                2 * 12 +  7,  // E
                2 * 12 +  2,  // B
                1 * 12 + 10,  // G
                1 * 12 +  5,  // D
                1 * 12 +  0,  // A
                0 * 12 +  7   // E
            ];

            var findCellWithNote = function(array, cell){
                for (var i = 0; i < array.length; i++) {
                    var c = array[i];
                    if (c.note == cell.note)
                        return i;
                }
                return -1;
            };


            var findMatchingChordsForColor = function(colorNumber) {
                var markedNotes = self.markedNotesArray()[colorNumber];
                var matchingChordsArray = self.matchingChordsArray();
                var noteNumbers = markedNotes.map(function(cell){
                    return cell.note;
                });
                var matchingChords = CHORD_DB.findMatchingChords(noteNumbers);
                matchingChordsArray[colorNumber] = matchingChords;
                self.matchingChordsArray(matchingChordsArray);

            };

            self.clickOnCell = function(cell) {
                //alert(JSON.stringify(cell));
                var markedNotesArray = self.markedNotesArray();
                var markedNotes = markedNotesArray[self.selectedColor()];
                var i = findCellWithNote(markedNotes, cell);
                if (i < 0) {
                    markedNotes.push(cell);
                } else {
                    markedNotes.splice(i, 1);
                }
                self.markedNotesArray(markedNotesArray);

                findMatchingChordsForColor(self.selectedColor());

                //createTable();
                updateMarkings(cell.note);
            };

            self.enterChord = function (colorNumber) {
                var chordName = prompt("Enter name of chord, e.g. A or Ammaj9", "");
                if (!chordName)
                    return;
                var chord = CHORD_DB.findChordByName(chordName);
                self.setChord(colorNumber, chord);
            };

            self.setChord = function (colorNumber, chord) {
                var markedNotesArray = self.markedNotesArray();
                var markedNotes = chord.notes.map(function(note){
                    return {
                        note: note,
                        index: self.key().notes.indexOf(note) + 1,
                        name: NOTE.getName(note)
                    };
                });
                markedNotesArray[colorNumber] = markedNotes;
                self.markedNotesArray(markedNotesArray);

                findMatchingChordsForColor(colorNumber);
                createTable();
            };

            var createTable = function(){
                var tab = [];
                for (var s = 0; s < 6; s++) {
                    var start = tuning[s];
                    var string = [];
                    for (var f = 0; f < 22; f++) {
                        var tone = start + f;
                        var note = tone % 12;
                        var name = NOTE.getName(note);
                        var noteInfo = {
                            tone: tone,
                            note: note,
                            index: self.key().notes.indexOf(note) + 1,
                            name: name,
                            fret: f,
                            string: s
                        };

                        var markings = [ null, null, null ];
                        for (var c in [0,1,2]) {
                            if (findCellWithNote(self.markedNotesArray()[c], noteInfo) >= 0 && self.markedNotesArray()[c].length > 0) {
                                if (noteInfo.index > 0) {
                                    markings[c] = ((noteInfo.index - self.markedNotesArray()[c][0].index + 7) % 7) + 1;
                                    //if ([2,4,6].indexOf(noteInfo.markings[c]) >= 0)
                                    //    noteInfo.markings[c] += 7;
                                } else {
                                    markings[c] = "0";
                                }
                            }
                        }
                        noteInfo.markings = ko.observableArray(markings);
                        string.push(noteInfo);
                    }
                    tab.push(string);
                }
                self.table(tab);
            };

            var updateMarkings = function(changedNote) {
                var table = self.table();
                for (var s = 0; s < 6; s++) {
                    var string = table[s];
                    for (var f = 0; f < 22; f++) {
                        var noteInfo = string[f];
                        if (noteInfo.note != changedNote)
                            continue;
                        var markings = noteInfo.markings();
                        for (var c in [0,1,2]) {
                            if (findCellWithNote(self.markedNotesArray()[c], noteInfo) >= 0 && self.markedNotesArray()[c].length > 0) {
                                if (noteInfo.index > 0) {
                                    markings[c] = ((noteInfo.index - self.markedNotesArray()[c][0].index + 7) % 7) + 1;
                                    //if ([2,4,6].indexOf(noteInfo.markings[c]) >= 0)
                                    //    noteInfo.markings[c] += 7;
                                } else {
                                    markings[c] = "0";
                                }
                            } else {
                                markings[c] = null;
                            }
                        }
                        noteInfo.markings(markings);
                    }
                }

            };

            self.removeThisFretBoard = function() {
                if (self.multiFretBoard) {
                    self.multiFretBoard.removeFretBoard(self);
                }
            };

            self.pluginViews = function(){
                createTable();
            };


            var fixMarkedNotes = function() {
                var markedNotesArray = self.markedNotesArray();
                for (var c in markedNotesArray) {
                    var markedNotes = markedNotesArray[c];
                    for (var n in markedNotes) {
                        var noteInfo = markedNotes[n];
                        noteInfo.index = self.key().notes.indexOf(noteInfo.note) + 1;
                    }
                }
                self.markedNotesArray(markedNotesArray);
            };

            self.nextKey = function() {
                self.key().nextKey();
                self.key( self.key() );
                fixMarkedNotes();
                createTable();
            };

            self.previousKey = function() {
                self.key().previousKey();
                self.key( self.key() );
                fixMarkedNotes();
                createTable();
            };

            self.toggleKeyType = function() {
                self.key().toggleKeyType();
                self.key( self.key() );
                fixMarkedNotes();
                createTable();
            };

            self.selectColor = function(col) {
                self.selectedColor(col);
            };
        };
    }
);
