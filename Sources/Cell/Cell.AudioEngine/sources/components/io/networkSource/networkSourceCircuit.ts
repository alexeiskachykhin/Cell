﻿/// <reference path="../../../_references.ts" />


module FxAudioEngine {
    'use strict';


    export class NetworkSourceCircuit extends Circuit {

        private _outputGainNode: GainNode;

        private _mediElementSourceNode: MediaStreamAudioSourceNode;


        constructor(context: Context) {
            Contract.isNotNullOrUndefined(context, 'context');

            super(context);

            this._buildAudioCircuit();
        }


        public mountMediaElement(mediaElement: HTMLMediaElement): void {
            Contract.isNotNullOrUndefined(mediaElement, 'mediaElement');

            this._mediElementSourceNode = this.context.audioContext.createMediaElementSource(mediaElement);
            this._mediElementSourceNode.connect(this._outputGainNode);
        }

        private _buildAudioCircuit(): void {
            this._outputGainNode = this.context.audioContext.createGain();
            this._publishOutputComponent(this._outputGainNode);
        }
    }
}
