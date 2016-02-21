(function () {
  'use strict';
  angular
    .module('MyApp', ['ngMaterial'])
    .controller('AutoComplete', AutoComplete);

  function AutoComplete() {
    var self = this;
    /* querySearch is run each time you type a word in the autocomplete text
     * field
     */
    self.querySearch = querySearch;
    /* define where you get the list to autocomplete against. In this case we
     * cover something locally defined..No API call
     */
    self.states = loadAll();

    function loadAll() {
      var allStates = 'Alabama, Alaska'
      return allStates.split(/, +/g).map(
        function(state) {
          return {
            value: state.toLowerCase(),
            display: state
        };
      });
    }

    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);
      return function filterFn(state) {
        return (state.value.indexOf(lowercaseQuery) === 0);
      }
    }

    function querySearch(query) {
      var results = query ? self.states.filter(
        createFilterFor(query)) : self.states, deferred;
      return results;
    }
  }
})();
