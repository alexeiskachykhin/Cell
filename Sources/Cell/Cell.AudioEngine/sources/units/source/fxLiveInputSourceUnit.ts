/// <reference path="../../_references.ts" />


module FxAudioEngine.Units.Source {
    'use strict';


    export class FxLiveInputSourceUnit extends FxAudioSourceUnit<FxLiveInputSourceUnitBuilder, MediaStream> {

        private _audioSourceController: IFxAudioSourceController;


        public get stream(): IFxAudioSourceController {
            return this._audioSourceController;
        }


        constructor(context: FxUnitContext) {
            super(context, new FxLiveInputSourceUnitBuilder());
            
            this._audioSourceController = new FxLiveInputAudioSourceController();
        }


        public init(stream: MediaStream): IFxEventSource {
            var asyncCompletionSource = new FxEventSource();

            try {
                this.builder.mountStream(this.context, stream);
                asyncCompletionSource.dispatchEvent('success');
            }
            catch (e) {
                asyncCompletionSource.dispatchEvent('error', e);
            }

            return asyncCompletionSource;
        }
    }


    export class FxLiveInputSourceUnitBuilder implements IFxUnitBuilder {

        private _outputGainNode: GainNode;

        private _mediStreamSourceNode: MediaStreamAudioSourceNode;


        public buildAudioCircuit(unitContext: FxUnitContext): FxAudioCircuit {
            var audioNode: GainNode = unitContext.audioContext.createGain();
            var audioCircuit: FxAudioCircuit = new FxAudioCircuit(null, audioNode);

            this._outputGainNode = audioNode;

            return audioCircuit;
        }

        public mountStream(unitContext: FxUnitContext, stream: MediaStream): void {
            this._mediStreamSourceNode = unitContext.audioContext.createMediaStreamSource(<any>stream);
            this._mediStreamSourceNode.connect(this._outputGainNode);
        }
    }
}
