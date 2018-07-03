/*
*  Track and Allow Event to perform
 */

var authEvent=(function (utilityService) {

    var self;
    var util=utilityService();

    var authEvent = function(){
        self=this;
        self.events=[];
    };

    authEvent.prototype.registerEvent = function(evt){
        evt.active=false;
        self.events.push(evt);
        console.log(self);
    };

    authEvent.prototype.activateEvent = function(evt){
        var checked = false, valid =true;
        self.events.forEach(function(event,index){
            if((evt.event !== event.event) && (event.active === true)){
                checked = true;
                valid = false;
                util.showStatus(event.errMsg);
                return false;
            }
        });

        if(checked === false){
            self.events.forEach(function(event,index){
                if((evt.event === event.event) && (evt.active === false)){
                    checked = true;
                    event.active=true;
                    return true;
                }
            });
        }

        return valid;
    };

    authEvent.prototype.deactivateEvent = function(evt,callback){
        console.log(evt);
        if(!callback){
            callback();
        }
        self.events.forEach(function(event,index) {
            if (evt.event === event.event) {
                event.active = false;
            }
        });

    };

    return authEvent;

})(utilityService);