(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(factory);
  } else {
    // Browser globals
    root.EButton = factory();
  }
}(this, function () {

	//EButton constructor
	var EButton = function(wrapper, options){
		/*
		*	wrapper		div element to contain button
		*	
		*	options		object passed in to override default settings
		*
		*		min			(int)	minimum value button allows
		*		max			(int)	maximum value button allows 
		*	  startVal		(int)	changes default starting value of button
		*/
		
		//private variables
		var settings = getSettings(options || {});
		
		var val = settings.startVal;
		
		var regFx = []; //stores registered functions
		
		var el = {}; //references to components of button
					
		var disabled = false;	//status of button
		
		var btn = {
			getValue : function(){
				return val;
			},
			
			disable : function(){
				disabled = true;
			},
			
			enable : function(){
				disabled = false;
			},
			
			isDisabled : function(){
				return disabled;
			},
			
			register : function(fx){
				regFx.push(fx);
			},
			
		};
		
		//callbacks for event handlers that have access to private variables
		var callbacks = {
			increaseVal : function(){
				if(!disabled && val < settings.max){
					return ++val;
				} else {
					return val;
				}
			},
			decreaseVal : function(){
				if (!disabled && val > settings.min){
					return --val;
				} else {
					return val;
				}
			},
			runRegistered : function(){
				regFx.forEach(function(fx){
					fx();
				});
			}
		}
			
		//initialization code
		wrapper.innerHTML = document.getElementById("EButtonTemplate").innerHTML;
		
		el = setUpEl(wrapper);
		el.num.innerHTML = btn.getValue();
		applyEventHandlers(el, callbacks);
		return btn;
	};
	
	//default values for settings - can be changed by passing in 
	//values through options parameter of constructor
	var defaultSettings = {
		min : 0,
		max : 50,
		startVal : 10
	}	
	
	//returns default settings for values not passed in as options
	function getSettings(options){
		var settings = {};
		Object.keys(defaultSettings).forEach(function(k){
			if(!options.hasOwnProperty(k)){
				settings[k] = defaultSettings[k];
			} else {
				settings[k] = options[k];
			}
		});
		return settings;
	}
	
	//looks up and stores references to button parts, returns obj with references
	function setUpEl(wrapper){			
		return {
			main: wrapper.getElementsByClassName("__EBtnMain")[0],
			num : wrapper.getElementsByClassName("__EBNumber")[0],
			more : wrapper.getElementsByClassName("__EBMore")[0],
			less : wrapper.getElementsByClassName("__EBLess")[0]
		};
	}
	
	//sets event handlers for button
	function applyEventHandlers(el, callbacks){
		el.more.addEventListener("click", function(){
			el.num.innerHTML = callbacks.increaseVal();
			callbacks.runRegistered();
		});
		
		el.less.addEventListener("click", function(){
			el.num.innerHTML = callbacks.decreaseVal();
			callbacks.runRegistered();
		});
	}
	
	return EButton;

}));



