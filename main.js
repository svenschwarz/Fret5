
requirejs.config({
    baseUrl: 'js',
    paths: {
        '3rdparty': 'js/3rdparty',
        'view': '../view',
        'app': '../app',

        text: '3rdparty/requirejs/text',
        jquery: '3rdparty/jquery/jquery-2.1.0',
        knockout: '3rdparty/knockout/knockout-2.3.0'
    }
});


// Start loading the main app file. Put all of
// your application logic in there.
requirejs(['app/main']);
