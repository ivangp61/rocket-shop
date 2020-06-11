const assert = require('assert');
const ReviewProcess = require('../processes/review');
const MembershipApplication = require('../models/membership_application');
const sinon = require('sinon');

describe('The Review Process', function(){

  describe('Receiving a valid application', function(){

    let decision;
    let validApp = new MembershipApplication({
      first: 'Test',
      last: 'User',
      email: 'test@test.com',
      age: 30,
      height: 66,
      weight: 180
    });

    let review = new ReviewProcess({application: validApp});
    
    sinon.spy(review, 'ensureAppValid');
    sinon.spy(review, 'findNextMission');
    sinon.spy(review, 'roleIsAvailable');
    sinon.spy(review, 'ensureRoleCompatible');

    before(function(done){

      review.processApplication(validApp, function(err, result){
        decision = result;
        done();
      });
    });

    it('return success', function(){
      assert(decision.success, decision.message);
    });

    it('ensures the application is valid', function(){
      assert(review.ensureAppValid.called);
    });

    it('selects a mission', function(){
      assert(review.findNextMission.called);
    });

    it('ensures role exists', function(){
      assert(review.roleIsAvailable.called);
    });

    it('ensures role compatibility', function(){
      assert(review.ensureRoleCompatible.called);
    });

  });
});