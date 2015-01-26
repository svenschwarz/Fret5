
define(
        ["views", "view/MultiFretBoard", "text!view/MultiFretBoard.html", "view/Title", "text!view/Title.html" ],
    function(
        views, MultiFretBoard, MultiFretBoard_html, Title, Title_html
    ){
        var object = {};

        object.run = function(){
            var vm, id;

            views.clearSection("titleContent");
            vm = new Title();
            id = views.addToSection("titleContent", "Title.html", "Title", vm, true);

            views.clearSection("mainContent");
            vm = new MultiFretBoard();
            id = views.addToSection("mainContent", "MultiFretBoard.html", "MultiFretBoard", vm, true);
        };

        return object;
    }
);
