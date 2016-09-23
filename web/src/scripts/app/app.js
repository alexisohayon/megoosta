'use strict';

import moment from 'moment';
import angular from 'angular';
import ngTouch from 'angular-touch';
import ngSanitize from 'angular-sanitize';
import uiRouter from 'angular-ui-router';
import LocalStorageModule from 'angular-local-storage';
import angularMoment from 'angular-moment';
import async from 'async';
import modules from './modules/_loader';
import ctrls from './controllers/_loader';
import directives from './directives/_loader';
import services from './services/_loader';
import templates from './templates';

/**
 * Register main angular app
 */
angular.module('trusk.business', [
    'angularMoment',
    ngTouch,
    ngSanitize,
    uiRouter,
    LocalStorageModule,
    ctrls,
    directives,
    services,
    modules])
    .config(function ($stateProvider, $locationProvider, $urlRouterProvider, stateHelperProvider) {
        'ngInject';

        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'views/home.html',
                controller: 'MyCtrl'
            })
            .state('page1', {
                url: '/page1',
                templateUrl: 'views/page1.html',
                controller: 'MyCtrl'
            })
            .state('page1.detail', {
                url: '/detail',
                templateUrl: 'views/detail.html',
                controller: 'DetailCtrl'
            });


        $locationProvider.html5Mode(true);
    });
