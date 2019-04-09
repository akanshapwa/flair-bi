import * as angular from 'angular';
'use strict';

angular
    .module('flairbiApp')
    .config(pagerConfig);

pagerConfig.$inject = ['uibPagerConfig', 'paginationConstants'];

function pagerConfig(uibPagerConfig, paginationConstants) {
    uibPagerConfig.itemsPerPage = paginationConstants.itemsPerPage;
    uibPagerConfig.previousText = '«';
    uibPagerConfig.nextText = '»';
}
