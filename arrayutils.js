var arrayEquals = function( array1, array2 ) {
    if( array1.length != array2.length )
        return false;
    for( var i in array1 ) {
        if( array1[i] != array2[i] )
            return false;
    }
    return true;
};

var arrayIntersection = function(array1, array2) {
    var result = [];
    for( var i in array1 ) {
        var a1 = array1[i];
        for( var j in array2 ) {
            var a2 = array2[j];
            if( a1 == a2 )
                result.push( a1 );
        }
    }
    return result;
};

var arrayDisjointUnion = function(array1, array2) {
    var result = [];
    for( var i in array1 ) {
        var a1 = array1[i];
        if( result.indexOf( a1 ) < 0 )
            result.push( a1 );
    }
    for( var j in array2 ) {
        var a2 = array2[j];
        if( result.indexOf( a2 ) < 0 )
            result.push( a2 );
    }
    return result;
};

var arraySubtraction = function(array1, array2) {
    var subtract = array1.filter( function( a1 ) {
        return array2.indexOf( a1 ) < 0;
    } );
    return subtract;
};
