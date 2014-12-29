
var MultiFretBoard = function() {
    var self = this;

    self.fretBoardIds = ko.observableArray([]);


    self.addNewFretBoard = function() {
        var vm = new FretBoard();
        var fretBoardId = koutils.addToSectionSync("fretBoardsGoHere", "FretBoard.html", "FretBoard", vm, true);
        var fretBoardIds = self.fretBoardIds();
        fretBoardIds.push(fretBoardId);
        self.fretBoardIds(fretBoardIds);
    };

    self.pluginViews = function(){
        self.addNewFretBoard();
    };
};
