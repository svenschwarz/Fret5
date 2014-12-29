
var koutils = koutils || {};

var $ = $ || {};



koutils.loadHtml = function(htmlFile) {
    var result_html = null;
    var xhr = new XMLHttpRequest();
    xhr.open( 'GET', htmlFile, false );  // async = false  => sync call
    xhr.onreadystatechange = function() {
        if ( xhr.readyState === 4 ) {
            if( xhr.status === 200 ) {
                result_html = xhr.responseText;
            } else {
                console.log( "Loading " + htmlFile + " FAILED:" + xhr.statusText );
                console.log( xhr ) ;
            }
        }
    };
    xhr.send();
    return result_html;
};

koutils.addToSectionSync = function(section, htmlFile, htmlElementId, viewModel) {
    var html = koutils.loadHtml( htmlFile );  // no callback => synchronous
    $('body #' + section).append(html);

    if( viewModel && viewModel.pluginViews ) {
        viewModel.pluginViews();
    }

    ko.applyBindings(viewModel, document.getElementById(htmlElementId));
    //if (htmlElementId && viewModel) {
    //    if( viewModel.readyToBind ) {
    //        koutils.ViewModel_chain( viewModel.readyToBind, function() {
    //            if( viewModel.readyToBind() )
    //                ko.applyBindings(viewModel, document.getElementById(htmlElementId));
    //        });
    //    } else {
    //        ko.applyBindings(viewModel, document.getElementById(htmlElementId));
    //    }
    //}
};

koutils.setInSection = function(section, htmlFile, htmlElementId, viewModel) {
    koutils.clearSection(section);
    koutils.addToSectionSync(section, htmlFile, htmlElementId, viewModel);

    //// scroll to the top
    //document.body.scrollTop = 0;
    //document.documentElement.scrollTop = 0;
};

koutils.clearSection = function(section) {
    //koutils.log( "clear section " + section );
    $('body #' + section + ' *').each(function() {
        //koutils.log( "removing " + this );
        if( ko )
            ko.removeNode(this);
        else
            $(this).remove();
    });
};

koutils.removeFromSection = function(section, toRemove) {
    //koutils.log( "clear section " + section );
    $('body #' + section + ' #' + toRemove + ' *').each(function() {
        //koutils.log( "removing " + this );
        if( ko )
            ko.removeNode(this);
        else
            $(this).remove();
    });
};