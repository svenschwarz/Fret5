
define([],
    function(){
        return function() {
            var self = this;

            self.names = {
                0: "A",
                1: "A#",
                2: "B",
                3: "C",
                4: "C#",
                5: "D",
                6: "D#",
                7: "E",
                8: "F",
                9: "F#",
                10: "G",
                11: "G#"
            };

            self.getName = function(note) {
                return self.names[note % 12];
            };

            self.getNote = function(name) {
                for (var i = 0; i < 12; i++) {
                    if (self.names[i] == name)
                        return i;
                }
                return -1;
            }

        };
    }
);

