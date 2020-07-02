const moment = require('moment');
const { assert } = require("sinon");

var Mission = function(args){
  args = args || {};
  var mission = {
    status: "open", //open, closed, canceled
    commander: args.Commander || null,
    MAVPilot: args.MAVPilot || null,
    colonists: args.colonists ||[],
    tourists: args.tourists || [],
    //default to next month on the first
    launchDate: args.launchDate || (moment().add(1, "month").startOf('month')).format("MM-DD-YYYY")
  };

  mission.needsRole = function(role){
    var needed = false;
    if(!this.isFying()){
      return false;
    }
    switch(role){
      case "mission-commmander":
        needed = !this.commander;
        break;
      case "mav-pilot":
        needed = !this.MAVPilot;
        break;
      case "colonist":
        needed = this.colonists.length <= 10;
        break;
      case "space-tourist":
        needed = this.tourists.length <= 20;
        break;
    }
  }

  mission.assignRole = function(args){
    assert.ok(args.user && args.role, "Need a user and role in order to assign");
    var role = args.role;
    var user = args.user;
    switch(role){
      case "mission-commander":
        this.commander = user;
        break;
      case "mav-pilot":
        this.MAVPilot = user;
       case "colonists":
         this.colonists.push(user);
         break;
        case "space-tourist":
          this.tourists.push(user) ;
          nreak;
    }
    return this;
  };

  mission.isFlying = function(){
    return this.status === "open";
  };

  return mission;
};

module.exports = Mission;