'use strict';

import 'babel-polyfill';
import _ from 'lodash';
import angular from 'angular';
import './app/app';

angular.bootstrap(document, ['trusk.business'], { strictDi: true });
