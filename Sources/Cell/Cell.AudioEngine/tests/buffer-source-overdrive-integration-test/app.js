﻿(function () {
    'use strict';


    function loadSound(url, callback) {
        var request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.responseType = 'arraybuffer';

        request.addEventListener('load', function () {
            callback(this.response);
        });

        request.send();
    };


    loadSound('../fixtures/audio/sample.mp3', function (audioBuffer) {
        var unitContext = new FxAudioEngine.FxRealTimeUnitContext();

        var sourceUnit = new FxAudioEngine.Units.Source.FxBufferSourceUnit(unitContext);
        var destinationUnit = new FxAudioEngine.Units.FxAudioDestinationUnit(unitContext);
        var overdriveUnit = new FxAudioEngine.Units.FxOverdriveUnit(unitContext);

        sourceUnit.ports.outputs[0].connect(overdriveUnit.ports.inputs[0]);
        overdriveUnit.ports.outputs[0].connect(destinationUnit.ports.inputs[0]);


        var initOperation = sourceUnit.init(audioBuffer);

        initOperation.addEventListener('success', function () {
            sourceUnit.stream.start(0);
        });
    });
}());