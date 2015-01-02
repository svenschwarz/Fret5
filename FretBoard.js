
var FretBoard = function(multiFretBoard) {
    var self = this;

    self.multiFretBoard = multiFretBoard;
    self.fretBoardId = null;

    self.key = ko.observable( Key_A );
    self.table = ko.observableArray([]);
    self.selectedNotesArray = ko.observableArray([ [], [], [] ]);

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


    self.clickOnCell = function(cell) {
        //alert(JSON.stringify(cell));
        var selectedNotesArray = self.selectedNotesArray();
        var selectedNotes = selectedNotesArray[0];
        var i = findCellWithNote(selectedNotes, cell);
        if (i < 0) {
            selectedNotes.push(cell);
        } else {
            selectedNotes.splice(i, 1);
        }
        self.selectedNotesArray( selectedNotesArray );
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
                noteInfo.isSelected1 = (findCellWithNote(self.selectedNotesArray()[0], noteInfo) >= 0);
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

};
