﻿/// <reference path="../../../libraries/waa.d.ts" />

/// <reference path="../../fxAudioEngine.ts" />
/// <reference path="../../fxAudioNode.ts" />
/// <reference path="../../fxAudioEventSource.ts" />
/// <reference path="fxAudioSourceController.ts" />
/// <reference path="fxAudioSourceNode.ts" />
/// <reference path="fxBufferAudioSourceController.ts" />


module FxAudioEngine.Nodes.Source {
    'use strict';


    export enum FxAudioBufferState {
        NODATA = 0,
        DECODING = 1,
        READY = 2
    };


    export class FxBufferSourceNode extends FxAudioSourceNode<ArrayBuffer> {

        private _bufferState: FxAudioBufferState;

        private _audioSourceNode: AudioBufferSourceNode;

        private _audioSourceController: IFxAudioSourceController;


        public get stream(): IFxAudioSourceController {
            return this._audioSourceController;
        }


        constructor() {
            var audioGraph = this._buildAudioGraph();

            super(audioGraph, null, false);


            this._audioSourceController = new FxBufferAudioSourceController(this._audioSourceNode);
        }


        public init(audioData: ArrayBuffer): IFxAudioEventSource {
            this._bufferState = FxAudioBufferState.DECODING;


            var asyncCompletionSource = new FxAudioEventSource();

            FxAudioEngine.context.decodeAudioData(
                audioData,

                (audioBuffer: AudioBuffer) => {
                    this._audioSourceNode.buffer = audioBuffer;
                    this._bufferState = FxAudioBufferState.READY;

                    asyncCompletionSource.dispatchEvent('success');
                },

                () => {
                    this._audioSourceNode.buffer = null;
                    this._bufferState = FxAudioBufferState.NODATA;

                    asyncCompletionSource.dispatchEvent('error');
                });

            return asyncCompletionSource;
        }


        private _buildAudioGraph(): AudioNode[] {
            var audioNode: AudioBufferSourceNode = FxAudioEngine.context.createBufferSource();
            var audioGraph: AudioNode[] = [audioNode];

            this._audioSourceNode = audioNode;

            return audioGraph;
        }
    }
}