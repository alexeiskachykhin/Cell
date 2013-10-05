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
    }


    loadSound('../../fixtures/audio/sample.mp3', function (audioBuffer) {
        var context = new FxAudioEngine.FxRealTimeContext();

        var sourceUnit = new FxAudioEngine.FxBufferSourceUnit(context);
        var destinationUnit = new FxAudioEngine.FxAudioDestinationUnit(context);
        var splitterUnit = new FxAudioEngine.FxChannelSplitterUnit(context, 2);
        var mergerUnit = new FxAudioEngine.FxChannelMergerUnit(context, 2);


        sourceUnit.ports.outputs[0].connect(splitterUnit.ports.inputs[0]);
        splitterUnit.ports.outputs[0].connect(mergerUnit.ports.inputs[0]);
        splitterUnit.ports.outputs[1].connect(mergerUnit.ports.inputs[1]);

        mergerUnit.ports.outputs[0].connect(destinationUnit.ports.inputs[0]);


        var initOperation = sourceUnit.init(audioBuffer);

        initOperation.addEventListener('success', function () {
            sourceUnit.stream.start(0);
        });
    });
}());