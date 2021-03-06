
define([],
    function() {
        var CHORD_OFFSETS = {
            "5"         : [0, 7],               //  1 - 5
            ""          : [0, 4, 7],            //  1 - 3 - 5
            "6"         : [0, 4, 7, 9],         //  1 - 3 - 5 - 6
            "7"         : [0, 4, 7, 10],        //  1 - 3 - 5 - b7
            "maj7"      : [0, 4, 7, 11],        //  1 - 3 - 5 - 7
            "add9"      : [0, 4, 7, 2],         //  1 - 3 - 5 - 9
            "9"         : [0, 4, 7, 10, 2],     //  1 - 3 - 5 - b7 - 9
            "maj9"      : [0, 4, 7, 11, 2],     //  1 - 3 - 5 - 7 - 9
            "m"         : [0, 3, 7],            //  1 - b3 - 5
            "m6"        : [0, 3, 7, 9],         //  1 - b3 - 5 - 6
            "m7"        : [0, 3, 7, 10],        //  1 - b3 - 5 - b7
            "mmaj7"     : [0, 3, 7, 11],        //  1 - b3 - 5 - 7
            "madd9"     : [0, 3, 7, 2],         //  1 - b3 - 5 - 9
            "m9"        : [0, 3, 7, 10, 2],     //  1 - b3 - 5 - b7 - 9
            "mmaj9"     : [0, 3, 7, 11, 2],     //  1 - b3 - 5 - 7 - 9
            "aug"       : [0, 4, 8],            //  1 - b3 - b5
            "dim"       : [0, 3, 6],            //  1 - b3 - b5
            "dim7"      : [0, 3, 6, 9],         //  1 - b3 - b5 - 6(bb7)
            "sus2"      : [0, 2, 7],            //  1 - 2 - 5
            "sus4"      : [0, 5, 7],            //  1 - 4 - 5
            "sus2sus4"  : [0, 2, 5, 7]          //  1 - 2 - 4 - 5
        };

        return CHORD_OFFSETS;
    }
);
