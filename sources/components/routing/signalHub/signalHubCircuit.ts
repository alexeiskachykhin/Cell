﻿/// <reference path="../../../_references.ts" />


namespace FXAudio {
    'use strict';


    export class SignalHubCircuit extends Circuit {

        constructor(context: Context, numberOfInputs: number, numberOfOutputs: number) {
            Contract.isNotNullOrUndefined(context, 'context');
            Contract.isPositiveOrZero(numberOfInputs, 'numberOfInputs');
            Contract.isPositiveOrZero(numberOfOutputs, 'numberOfOutputs');

            super(context);

            this._createSignalHubCircuit(numberOfInputs, numberOfOutputs);
        }


        private _createSignalHubCircuit(numberOfInputs: number, numberOfOutputs: number): void {
            Contract.isPositiveOrZero(numberOfInputs, 'numberOfInputs');
            Contract.isPositiveOrZero(numberOfOutputs, 'numberOfOutputs');

            const inputs = this._creatComponentGroup(numberOfInputs);
            const outputs = this._creatComponentGroup(numberOfOutputs);

            AudioUtilities.WebAudioAPI.routeCross(inputs, outputs);

            this._publishInputComponents(inputs);
            this._publishOutputComponents(outputs);
        }

        private _creatComponentGroup(numberOfNodes: number): AudioNode[] {
            Contract.isPositiveOrZero(numberOfNodes, 'numberOfNodes');

            const nodes: AudioNode[] = [];

            for (let i = 0; i < numberOfNodes; i++) {
                const node = AudioUtilities.WebAudioAPI.createNode(this.context.audioContext, NodeType.GAIN);
                nodes.push(node);
            }

            return nodes;
        }
    }
}
