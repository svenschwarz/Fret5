
define(
        ["views", "view/MultiFretBoard", "text!view/MultiFretBoard.html"],
    function(
        views, MultiFretBoard, MultiFretBoard_html
    ){
        var self = this;

        self.run = function(){
            views.clearSection("mainContent");
            var vm = new MultiFretBoard();
            var id = views.addToSection("mainContent", "MultiFretBoard.html", "MultiFretBoard", vm, true);
        };

        return self;
    }
);