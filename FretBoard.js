
var FretBoard = function() {
    var self = this;
    
    self.table = ko.observable([]);
    self.selectedNotes = ko.observable([]);

    var noteNames = {
         0: "A",
         1: "A#",
         2: "B",
         3: "C",
         4: "C#",
         5: "D",
         6: "D#",
         7: "E",
         8: "F",
         9: "F#",
        10: "G",
        11: "G#"
    };

    var startNotes = [
         7,  // E
         2,  // B
        10,  // G
         5,  // D
         0,  // A
         7   // E
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
        var selectedNotes = self.selectedNotes();
        var i = findCellWithNote(selectedNotes, cell);
        if (i < 0) {
            selectedNotes.push(cell);
            self.selectedNotes( selectedNotes );
        }
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
                var name = noteNames[note];
                var noteInfo = {
                    tone: tone,
                    note: note,
                    name: name,
                    fret: f,
                    string: s
                };
                noteInfo.isHighlighted = (findCellWithNote(self.selectedNotes(), noteInfo) >= 0);
                string.push(noteInfo);
            }
            tab.push(string);
        }
        self.table(tab);
    };

    createTable();
};
