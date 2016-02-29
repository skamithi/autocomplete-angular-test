describe('AutoComplete', function(){
  beforeEach(module('MyApp'));

  describe('placeholder', function() {
    it('should be something cool', inject(function($controller){
      var myCtrl = $controller('AutoComplete');
      myCtrl.placeholder.should.equal('Enter Country Name');
    }));
  });
});
