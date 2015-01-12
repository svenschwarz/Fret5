
define(
        ["views", "view/FretBoard", "text!view/FretBoard.html", "Key"],
    function(
        views, FretBoard, FretBoard_html, Key
    ){
        return function() {
            var self = this;

            self.id2fretBoard = {};
            self.lastAddedFretBoard = null;


            self.addNewFretBoard = function() {
                var fretBoard = new FretBoard(self);
                var fretBoardId = views.addToSection("fretBoardsGoHere", "FretBoard.html", "FretBoard", fretBoard, true);
                fretBoard.fretBoardId = fretBoardId;
                self.id2fretBoard[fretBoardId] = fretBoard;
                self.lastAddedFretBoard = fretBoard;
            };

            self.removeFretBoard = function(fretBoard) {
                var fretBoardId = fretBoard.fretBoardId;
                if (!fretBoardId) {
                    console.error("removeFretBoard -> no id found for that fretBoard");
                    return;
                }
                delete self.id2fretBoard[fretBoardId];
                views.removeFromSection("fretBoardsGoHere", fretBoardId);
            };

            self.createMatchingKey = function() {
                if (!self.lastAddedFretBoard)
                    return new Key("A");

                var lastKey = self.lastAddedFretBoard.key();
                var cloneKey = new Key(lastKey.keyNoteName, lastKey.keyType);
                return cloneKey;
            };

            self.pluginViews = function(){
                self.addNewFretBoard();
            };
        };
    }
);
