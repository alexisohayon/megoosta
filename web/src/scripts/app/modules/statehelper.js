'use strict';

import modules from './_modules';

modules.provider('stateHelper', function($stateProvider) {
  var self = this;

  this.state = function(state){
    var args = Array.prototype.slice.apply(arguments);
    var options = {
      keepOriginalNames: false,
      siblingTraversal: false
    };

    if (typeof args[1] === 'boolean') {
      options.keepOriginalNames = args[1];
    }
    else if (typeof args[1] === 'object') {
      angular.extend(options, args[1]);
    }

    if (!options.keepOriginalNames) {
      fixStateName(state);
    }

    $stateProvider.state(state);

    if(state.children && state.children.length){
      state.children.forEach(function(childState){
        childState.parent = state;
        self.state(childState, options);
      });

      if (options.siblingTraversal) {
        addSiblings(state);
      }
    }

    return self;
  };

  this.setNestedState = this.state;

  self.$get = angular.noop;

  /**
  * Converts the name of a state to dot notation, of the form `grandfather.father.state`.
  * @param state
  */
  function fixStateName(state){
    if(state.parent){
      state.name = (angular.isObject(state.parent) ? state.parent.name : state.parent) + '.' + state.name;
    }
  }

  function addSiblings(state) {
    state.children.forEach(function (childState, idx, array) {
      if (array[idx + 1]) {
        childState.nextSibling = array[idx + 1].name;
      }
      if (array[idx - 1]) {
        childState.previousSibling = array[idx - 1].name;
      }
    });
  }
});
