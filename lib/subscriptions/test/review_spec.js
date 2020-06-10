const assert = require('assert');
const ReviewProcess = require('../processes/review');
const MembershipApplication = require('../models/membership_application');

describe('The Review Process', function(){

  describe('Receiving a valid application', function(){

    let decision;
    before(function(done){
      validApp = new MembershipApplication({
        first: 'Test',
        last: 'User',
        email: 'test@test.com',
        age: 30,
        height: 66,
        weight: 180
      });

      let review = new ReviewProcess();
      review.processApplication(validApp, function(err, result){
        decision = result;
        done();
      });
    });

    it('return success', function(){
      assert(decision.success, decision.message);
    });

  });
});