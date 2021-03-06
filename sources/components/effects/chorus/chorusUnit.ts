/// <reference path="../../../_references.ts" />


namespace FXAudio {
    'use strict';


    const DEFAULT_DEPTH = 0.002;
    const DEFAULT_RATE = 0.25;


    export class ChorusUnit extends Unit<ChorusCircuit> {

        public get rate(): number {
            return this.circuit.lfoNode.frequency.value;
        }

        public set rate(value: number) {
            this.circuit.lfoNode.frequency.value = value;
        }

        public get depth(): number {
            return this.circuit.depthNode.gain.value;
        }

        public set depth(value: number) {
            this.circuit.depthNode.gain.value = value;
        }


        constructor(context: Context) {
            Contract.isNotNullOrUndefined(context, 'context');

            super(new ChorusCircuit(context));

            this.depth = DEFAULT_DEPTH;
            this.rate = DEFAULT_RATE;
        }
    }
}
