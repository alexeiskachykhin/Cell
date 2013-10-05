﻿(function () {
    'use strict';


    var context = new FxAudioEngine.FxRealTimeContext();

    var sourceUnit = new FxAudioEngine.FxNetworkSourceUnit(context);
    var destinationUnit = new FxAudioEngine.FxAudioDestinationUnit(context);

    sourceUnit.ports.outputs[0].connect(destinationUnit.ports.inputs[0]);

    var mediaElement = document.querySelector('audio');
    var initOperation = sourceUnit.init(mediaElement);

    initOperation.addEventListener('success', function () {
        sourceUnit.stream.start(0);
    });
}());