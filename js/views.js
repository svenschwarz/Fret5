
define(
        ["text", "jquery", "knockout"],
    function(
        rjstext, $, ko
    ){
        var object = {};

        object.clearSection = function(section) {
            if($("body #" + section).length > 0) {
                $('body #' + section + ' *').each(function () {
                    ko.removeNode(this);
                });
            } else {
                $("body").append( "<div id='" + section + "'></div>" );
            }
        };

        object.removeFromSection = function(section, toRemove) {
            $('body #' + section + ' #' + toRemove + ' *').each(function() {
                ko.removeNode(this);
            });
        };

        object.addToSection = function(section, htmlFile, htmlElementId, viewModel, newElementId) {
            var html = require("text!view/" + htmlFile);
            $('body #' + section).append(html);

            if (newElementId !== undefined) {
                if (newElementId === true)
                    newElementId = htmlElementId + new Date().getTime();
                $('body #' + section + " #" + htmlElementId).attr("id", newElementId);
                htmlElementId = newElementId;
            }

            ko.applyBindings(viewModel, document.getElementById(htmlElementId));

            if( viewModel && viewModel.pluginViews ) {
                viewModel.pluginViews();
            }

            return htmlElementId;
        };

        object.setInSection = function(section, htmlFile, htmlElementId, viewModel, newElementId) {
            object.clearSection(section);
            var newElementId = object.addToSectionSync(section, htmlFile, htmlElementId, viewModel, newElementId);

            //// scroll to the top
            //document.body.scrollTop = 0;
            //document.documentElement.scrollTop = 0;

            return newElementId;
        };

        return object;
});
