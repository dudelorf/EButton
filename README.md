# EButton
Customizable numerical button widget

Include this template on page in a script type="template/EButton" tag:

<div class="EButton">
</div>

	<div class="__EBtnMain">
		<div class="__EBLess">
			<span>-</span>
		</div>
	  	<div class="__EBNumber">
	  	</div>
		<div class="__EBMore">
			<span>+</span>
		</div>
	</div>

Template can be customized, however markup requires an id of EButtonTemplate and 4 uinque elements with the following classes:
<pre>
  __EBtnMain		:	button container
  __EBLess		:	decrement button
  __EBNumber		:	number display
  __EBMore		:	increment button
</pre>
To create the button use the following code
  var myButton = new EButton(wrapper, options);
  
  	wrapper			div DOV element to contain button
  	
  	options 		object passed in to override default settings (values are all optional)
  		min		(int)	minimum value button allows
  		max		(int)	maximum value button allows
  		startVal	(int)	changes default starting value of button

Once created the button exposes the following api:

			getValue() - returns the current value of button
			
			disable() - disables button actions
			
			enable() - enables button actions
			
			isDisabled() - returns true if button is disabled
			
			register(fx) - will call the function (fx) passed to argument whenever button's value canges
