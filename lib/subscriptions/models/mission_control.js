const moment = require('moment');
const assert = require('assert');
const Mission = require('../models/mission');

let MissionControl = function(args){
  assert(args.db, 'Need a DB instance');
  this.db = args.db;
};

MissionControl.prototype.currentMission = function(next){
  //the current mission is the one that starts the first
  //of next month
  let nextMission = moment().add(1, 'month').startOf('month');
  let formattedMissionDate = nextMission.format('MM-DD-YYYY');
  let self = this;
  //pull fromt the DB
  this.db.find({launchDate : formattedMissionDate}, function(err, foundMission){

    //no bubbling here, throw
    assert.ok(err === null, err);
    //if there's a saved mission, send it along..
    if(foundMission){
      next(null, new Mission(foundMission));      
    }
    else{
      //create it and save
      foundMission = new Mission();
      self.db.insert(foundMission, function(err, result){
        next(err, foundMission);
      });
    }
  });
};

MissionControl.prototype.hasSpaceForRole = function(role, next){
  this.currentMission(function(err, mission){
    let hasRoom = mission.needsRole(role);
    next(null, hasRoom);
  });
};

module.exports = MissionControl;