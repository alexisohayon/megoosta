'use strict'; module.exports = angular.module('ng').run(['$templateCache', function($templateCache) {$templateCache.put('partials/footer.html','<br/>Footer');
$templateCache.put('partials/header.html','<a ui-sref="home">Home |</a><a ui-sref="page1">Page 1</a><br/><br/>');
$templateCache.put('views/detail.html','<br/>Detail page');
$templateCache.put('views/home.html','Home page<br/><br/><div class="asset-img-1"></div>');
$templateCache.put('views/page1.html','Page1: <a ui-sref="page1.detail">Detail</a><br/><br/><div class="asset-img-2"></div><div ui-view="ui-view" class="view-change-animate"></div>');}]);