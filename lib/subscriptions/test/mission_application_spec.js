const assert = require('assert');
const MembershipApplication = require('../models/membership_application');

describe('Membership application requirements', function(){
  let validApp;

  before(function(){
    //arrange data here
    validApp = new MembershipApplication({
      first: 'Test',
      last: 'User',
      email: 'test@test.com',
      age: 30,
      height: 66,
      weight: 180
    });

  });

  describe('Application valid if...', function(){

    it('all validators successful', function(){
      assert(validApp.isValid(), 'Not valid');
    });
  });
  describe('Application invalid if...', function(){
    it('email is 4 characters or less',function(){
      let app = new MembershipApplication({email: 'dd'});
      assert(!validApp.emailIsValid());
    });

    it('email does not contain an @',function(){
      let app = new MembershipApplication({email: 'thingthingthing:thing.com'});
      assert(!validApp.emailIsValid());
    });

    it('email is omitted',function(){
      let app = new MembershipApplication();
      assert(!validApp.emailIsValid());
    });

    it('height is less than 60 inches',function(){
      let app = new MembershipApplication({height: 10});
      assert(!validApp.heightIsValid());
    });

    it('height is more than 75 inches',function(){
      let app = new MembershipApplication({height: 80});
      assert(!validApp.heightIsValid());
    });

    it('height is omitted',function(){
      let app = new MembershipApplication();
      assert(!validApp.heightIsValid());
    });

    it('age is more than 100',function(){
      let app = new MembershipApplication({age: 101});
      assert(!validApp.ageIsValid());
    });

    it('age is less than 15',function(){
      let app = new MembershipApplication({age: 14});
      assert(!validApp.ageIsValid());
    });

    it('age is omitted',function(){
      let app = new MembershipApplication();
      assert(!validApp.ageIsValid());
    });

    it('weight is less than 100',function(){
      let app = new MembershipApplication({weight: 99});
      assert(!validApp.weightIsValid());
    });

    it('weight is more than 300',function(){
      let app = new MembershipApplication({weight: 301});
      assert(!validApp.weightIsValid());
    });

    it('weight is omitted',function(){
      let app = new MembershipApplication();
      assert(!validApp.weightIsValid());
    });

    it('first is omitted',function(){
      let app = new MembershipApplication();
      assert(!validApp.nameIsValid());
    });

    it('last is omitted',function(){
      let app = new MembershipApplication();
      assert(!validApp.lastIsValid());
    });


  });
});