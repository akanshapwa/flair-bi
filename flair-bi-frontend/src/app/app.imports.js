import * as angular from 'angular';
'use strict';

angular
    .module('flairbiApp')
    .constant('d3', d3)
    .constant('topojson', topojson)
    .constant('leaflet', L);

