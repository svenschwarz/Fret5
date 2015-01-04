
var FretBoard = function(multiFretBoard) {
    var self = this;

    self.multiFretBoard = multiFretBoard;
    self.fretBoardId = null;

    self.key = ko.observable( multiFretBoard.createMatchingKey() );
    self.table = ko.observableArray([]);
    self.markedNotesArray = ko.observableArray([ [], [], [] ]);
    self.selectedColor = ko.observable(0);
    self.matchingChordsArray = ko.observableArray([ [], [], [] ]);

    self.keyTypeName = ko.computed(function(){
        return self.key().getKeyTypeName();
    });

    var startNotes = [
        31,  // E   7
        26,  // B   2
        22,  // G  10
        17,  // D   5
        12,  // A   0
         7   // E   7
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
        createTable();
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
            return { note: note, name: NOTE.getName(note) };
        });
        markedNotesArray[colorNumber] = markedNotes;
        self.markedNotesArray(markedNotesArray);

        findMatchingChordsForColor(colorNumber);
        createTable();
    };

    var createTable = function(){
        var tab = [];
        for (var s = 0; s < 6; s++) {
            var start = startNotes[s];
            var string = [];
            for (var f = 0; f < 22; f++) {
                var tone = start + f;
                var note = tone % 12;
                var name = NOTE.getName(note);
                var noteInfo = {
                    tone: tone,
                    note: note,
                    name: name,
                    fret: f,
                    string: s
                };
                noteInfo.ismarked1 = (findCellWithNote(self.markedNotesArray()[0], noteInfo) >= 0);
                noteInfo.ismarked2 = (findCellWithNote(self.markedNotesArray()[1], noteInfo) >= 0);
                noteInfo.ismarked3 = (findCellWithNote(self.markedNotesArray()[2], noteInfo) >= 0);
                string.push(noteInfo);
            }
            tab.push(string);
        }
        self.table(tab);
    };

    self.removeThisFretBoard = function() {
        if (self.multiFretBoard) {
            self.multiFretBoard.removeFretBoard(self);
        }
    };

    self.pluginViews = function(){
        createTable();
    };

    self.nextKey = function() {
        self.key().nextKey();
        self.key( self.key() );
    };

    self.previousKey = function() {
        self.key().previousKey();
        self.key( self.key() );
    };

    self.toggleKeyType = function() {
        self.key().toggleKeyType();
        self.key( self.key() );
    };

    self.selectColor = function(col) {
        self.selectedColor(col);
    };

};
