
define(
        ["knockout", "views"],
    function(
        ko, views
    ){
        return function() {
            var self = this;

            //self.help = function() {
            //    location = "help.html";
            //};

            self.github = function() {
                location = "https://github.com/svenschwarz/Fret5";
            };

        };
    }
);
