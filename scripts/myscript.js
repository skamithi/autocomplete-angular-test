(function () {
  'use strict';
  angular
    .module('MyApp', ['ngMaterial'])
/*    .config(function($mdThemingProvider) {
      $mdThemingProvider.theme('default')
      .primaryPalette('pink')
      .accentPalette('orange');
    })*/
    .controller('AutoComplete', AutoComplete)
    .filter('capitalize', function() {
      return function(input, all) {
        var reg = (all) ? /([^\W_]+[^\s-]*) */g : /([^\W_]+[^\s-]*)/;
        return (!!input) ? input.replace(reg, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}) : '';
    }
  });

  function AutoComplete($http, $log) {
    var self = this;
    /* autocomplete_data_loaded: if set to true hide label
    */
    self.capitalExists = true;
    self.dataLoaded = true;
    /* by default the input field is in a disabled state
     * it stays in a red color as well.
     * when the api call succeeds, remove the red color and enable the form
     */
    self.isDisabled = true;
    /* querySearch is run each time you type a word in the autocomplete text
     * field
     */
    self.querySearch = querySearch;
    /* define where you get the list to autocomplete against. In this case we
     * cover something locally defined..No API call
     */
    loadAll();
    self.placeholder = "Enter Country Name";

    /* populate autocomplete data struct */
    /* create a object array with one of the object attributes being "display".
     * The other values can be used for search and for sending back to server
     * via API. 'value' is what is put in the input value field
     * name is used for the search
     * This is what md-autocomplete is looking for. For example
     * { data: Object, value: "united states", display: "United States"},
     * { data: Object, value: "canada", display: "United States" }
     */
    function populateAutocomplete(data) {
      self.states = _.map(data, function(entry) {
        if (!entry.capital) {
           entry.capital = 'Not Available';
           entry.flagImage = 'country-flags/svg/flag_of_none.svg';
        } else {
           entry.flagImage = 'country-flags/svg/' + angular.lowercase(entry.alpha2Code) + '.svg';
        }
        return {
          display: entry.name,
          value: entry,
          search_value: angular.lowercase(entry.name)
        }
      });
      self.isDisabled = false;
      self.dataLoaded = true;
    }

    /* loadAll countries from a API */
    function loadAll() {
      var responsePromise = $http.get("https://restcountries.eu/rest/v1/all");
      responsePromise.success(function(data, status, headers, config) {
        populateAutocomplete(data);
      });
      responsePromise.error(function(data, status, headers, config) {
        $log.info('failed to load');
      });
    }

    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);
      return function filterFn(state) {
        return (state.search_value.indexOf(lowercaseQuery) === 0);
      }
    }

    function querySearch(query) {
      var results = query ? self.states.filter(
        createFilterFor(query)) : self.states, deferred;
      return results;
    }
  }
})();
