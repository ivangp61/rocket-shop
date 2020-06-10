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

    let review = new ReviewProcess();
    let validationSpy = sinon.spy();
    let missionSpy = sinon.spy();
    let roleAvailableSpy = sinon.spy();
    let roleCompatibleSpy = sinon.spy();

    before(function(done){
      review.on('validated', validationSpy);
      review.on('mission-selected', missionSpy);
      review.on('role-available', roleAvailableSpy);
      review.on('role-compatible', roleCompatibleSpy);

      review.processApplication(validApp, function(err, result){
        decision = result;
        done();
      });
    });

    it('return success', function(){
      assert(decision.success, decision.message);
    });

    it('ensures the application is valid', function(){
      assert(validationSpy.called);
    });

    it('selects a mission', function(){
      assert(missionSpy.called);
    });

    it('ensures role exists', function(){
      assert(roleAvailableSpy.called);
    });

    it('ensures role compatibility', function(){
      assert(roleCompatibleSpy.called);
    });

  });
});