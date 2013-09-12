﻿/// <reference path="../../_references.ts" />


module FxAudioEngine.Units.Source {
	'use strict';


    export class FxAudioSourceUnit<TSource> extends FxUnit {

        public stream: IFxAudioSourceController;


        public init(source: TSource): IFxEventSource { return; }
    }
}
