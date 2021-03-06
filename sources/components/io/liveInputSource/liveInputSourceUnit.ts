/// <reference path="../../../_references.ts" />


namespace FXAudio {
    'use strict';


    export class LiveInputSourceUnit extends AudioSourceUnit<LiveInputSourceCircuit, MediaStream> {

        private _audioSourceController: IAudioSourceController;


        public get stream(): IAudioSourceController {
            return this._audioSourceController;
        }


        constructor(context: Context) {
            Contract.isNotNullOrUndefined(context, 'context');

            super(new LiveInputSourceCircuit(context));
            
            this._audioSourceController = new LiveInputAudioSourceController();
        }


        public init(stream: MediaStream): IEventSource {
            Contract.isNotNullOrUndefined(stream, 'stream');

            const asyncCompletionSource = new EventSource();

            try {
                this.circuit.mountStream(stream);
                asyncCompletionSource.dispatchEvent('success');
            }
            catch (e) {
                asyncCompletionSource.dispatchEvent('error', e);
            }

            return asyncCompletionSource;
        }
    }
}
