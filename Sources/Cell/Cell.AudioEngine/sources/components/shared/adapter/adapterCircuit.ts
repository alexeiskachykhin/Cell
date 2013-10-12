﻿/// <reference path="../../../_references.ts" />


module FxAudioEngine {
    'use strict';


    export class AdapterCircuit<TNode extends AudioNode> extends Circuit {

        private _audioNode: TNode;

        private _audioNodeType: NodeType;

        private _audioNodeFactoryMethodArguments: any[];


        public get audioNode(): TNode {
            return this._audioNode;
        }


        constructor(context: Context, audioNodeType: NodeType, ...args: any[]) {
            Contract.isNotNullOrUndefined(context, 'context');

            super(context);

            this._audioNodeType = audioNodeType;
            this._audioNodeFactoryMethodArguments = args;

            this._buildAudioCircuit();
        }


        private _buildAudioCircuit(): void {
            this._audioNode = this._createNode();

            this._publishInputComponent(this._audioNode);
            this._publishOutputComponent(this._audioNode);
        }

        private _createNode(): TNode {
            var audioContext: AudioContext = this.context.audioContext;
            var audioNodeType: NodeType = this._audioNodeType;
            var audioNodeArguments: any[] = this._audioNodeFactoryMethodArguments;


            var audioNode: TNode = <TNode>AudioUtilities.WebAudioAPI.createNode(
                audioContext, audioNodeType, audioNodeArguments);

            return audioNode;
        }
    }
}
