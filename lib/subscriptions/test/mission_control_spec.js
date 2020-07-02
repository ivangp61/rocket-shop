const moment = require('moment');
const MissionControl = require('../models/mission_control');
const assert = require('assert');
const db = require('../db');
const sinon = require('sinon');

sinon.stub(db, 'find').yields(null, {id : 1});
let missionControl = new MissionControl({db : db});

describe('Mission Control', function(){
  describe('The Current Mission', function(){
    let currentMission;
    before(function(done){
      missionControl.currentMission(function(err, res){
        currentMission = res;
        done();
      });
    });
    it('is created if none exist', function(){
      assert(currentMission);
    });
  });
});
