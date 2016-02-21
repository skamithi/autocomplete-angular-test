angular
  .module('MyApp', ['ngMaterial'])
  .run(function($log){
    $log.debug('MyApp is done');
  });
