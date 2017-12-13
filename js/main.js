const $userInfo = $(".user_info"); 
const $jobSelect = $("#title");
const $design = $("#design");
const $color = $("#color"); 
const $payment = $('#payment');
const $submit = $('#submit'); 

//Focus on Name on page load 
$(function () {
	$("#name").focus();
})


//When other job is selected, insert new input field with text "Your Job Role"
$('#other-title').hide()

$jobSelect.on('change', function() {
	if ($jobSelect.val() === "other") {
		$('#other-title').show()
	} else {
		if ($('#other-title').length > 0) {
			$('#other-title').hide(); 
		}	
	}
})

/****************************************
T-Shirt Info: Show selected design options
*****************************************/

//Only display colors once design is selected 
$('#colors-js-puns').hide(); 

//TO DO: Could we create a class for each design theme so that we don't need all the for loops
//Function to show set of options 
function hide_show(theme) {
	if (theme === "puns") {
		for (var i = 2; i < 8; i +=1) {
			if (i < 5) {
				$('#color :eq('+ i + ')').show();	
			} else {
			$('#color :eq(' + i + ')').hide(); 
			}
		}
	} else {
		for (var i = 2; i < 8; i +=1) {
			if (i < 5) {
				$('#color :eq('+ i + ')').hide();	
			} else {
			$('#color :eq(' + i + ')').show(); 
			}
		}
	}
}

//Display shirt options appropriate for design selection
$design.on('change', function () {
	if ($design.val() === "js puns") {
		$('#colors-js-puns').show();
		hide_show('puns'); 
		$color.val($('#color :eq(1)').val());
	} else if ($design.val() === "heart js") {
		$('#colors-js-puns').show();
		hide_show(''); 
		$color.val($('#color :eq(1)').val());
	} else {
		$('#colors-js-puns').hide();
		for (var i = 2; i < 8; i +=1) {
			$('#color :eq(' + i + ')').show();
		}
		$color.val($('#color :eq(0)').val()); 
	}
})

/****************************************
Activities Registration: No overlap 
*****************************************/
const $jsFrameworks = $('[name="js-frameworks"]');
const $jsLibs = $('[name="js-libs"]');
const $express = $('[name="express"]');
const $node = $('[name="node"]'); 
const $main = $('[name="all"]');
const $tools = $('[name="build-tools"]'); 
const $npm = $('[name="npm"]'); 
const $activities = $('.activities'); 
let total = 0; 

$activities.append("<p id='total_html'>Total: <span id='total'></span></p>");
$('#total_html').hide(); 

$activities.on('change', function () {
	if (total > 0) {
		$('#total_html').show(); 
		$('#total').text(String(total));
	} else {
		$('#total_html').hide(); 
	}
})

$jsFrameworks.on('change', function () {
	if ($jsFrameworks.prop('checked')){
		total += 100; 
		$('#total').text(String(total));
		$express.attr("disabled", true);
		$('#express').css('color', 'grey') 	
	} else {
		total -= 100; 
		$('#total').text(String(total));
		$express.attr("disabled", false); 
		$('#express').css('color', 'black')
	}
})

$jsLibs.on('change', function () {
	if ($jsLibs.prop('checked')){
		total += 100; 
		$('#total').text(String(total));
		$node.attr("disabled", true);
		$('#node').css('color', 'grey')  	
	} else {
		total -= 100; 
		$('#total').text(String(total));
		$node.attr("disabled", false); 
		$('#node').css('color', 'black')
	}
})

$express.on('change', function () {
	if ($express.prop('checked')){
		total += 100; 
		$('#total').text(String(total));
		$jsFrameworks.attr("disabled", true); 
		$('#js-frameworks').css('color', 'grey')	
	} else {
		total -= 100; 
		$('#total').text(String(total));
		$jsFrameworks.attr("disabled", false); 
		$('#js-frameworks').css('color', 'black')
	}
})

$node.on('change', function () {
	if ($node.prop('checked')){
		total += 100; 
		$('#total').text(String(total));
		$jsLibs.attr("disabled", true);
		$('#js-libs').css('color', 'grey') 	
	} else {
		total -= 100; 
		$('#total').text(String(total));
		$jsLibs.attr("disabled", false); 
		$('#js-libs').css('color', 'black') 
	}
})

$main.on('change', function () {
	if ($main.prop('checked')) {
		total += 200; 
		$('#total').text(String(total));
	} else {
		total -= 200; 
		$('#total').text(String(total));
	}
})

$tools.on('change', function () {
	if ($tools.prop('checked')) {
		total += 100; 
		$('#total').text(String(total));
	} else {
		total -= 100; 
		$('#total').text(String(total));
	}
})

$npm.on('change', function () {
	if ($npm.prop('checked')) {
		total += 100; 
		$('#total').text(String(total));
	} else {
		total -= 100; 
		$('#total').text(String(total));
	}
})


/****************************************
Payment Section: Display selected options
*****************************************/
// Show specific payment details based on selection 
$creditCard = $('#credit-card')
$paypal = $('#paypal');
$bitcoin = $('#bitcoin');

//Hide payment options in beginnnig
$creditCard.hide(); 
$paypal.hide();
$bitcoin.hide(); 

$payment.on('change', function () {
	switch ($payment.val()) {
		case "credit card": 
			$creditCard.show(); 
			$paypal.hide();
			$bitcoin.hide(); 			
			break;
		
		case "paypal":
			$paypal.show(); 
			$creditCard.hide();
			$bitcoin.hide();			
			break;

		case "bitcoin": 
			$bitcoin.show(); 
			$creditCard.hide(); 
			$paypal.hide(); 			
			break;

		default: 
			$creditCard.hide(); 
			$paypal.hide();
			$bitcoin.hide(); 
	}
})

/****************************************
Form Validation
*****************************************/


/*If statement checking each condition:
name, mail, activity, valid credit card if selected
*/ 
let valid_name = false; 
let valid_mail = false; 
let valid_activity = false;
let valid_payment = false; 

//Helper function to disable/enable submit button
$('form').on('submit', function (e) {
	if (valid_name && valid_mail && valid_activity && valid_payment) {
		return true; 		
	} else {
		e.preventDefault();
		
		if (valid_name === false) {
			$('#name').css("border", "3px solid red");
			console.log('missing name');
		}

		if (valid_mail === false) {
			$('#mail').css("border", "3px solid red");
			console.log('missing email');
		}

		if (valid_activity === false) {
			alert("Please select at least one activity"); 
			console.log('missing activity');
		}

		if (valid_payment === false) {
			alert("Please select a payment option or fill out the payment details")
			console.log('missing payment');
		}
		return false; 
	}
})


//Name fields can not be blank
$('#name').on('change', function () {
	if ($('#name').val() === '') {
		valid_name = false;
		$('#name').css("border", "3px solid red") 		  
	} else {
		valid_name = true; 
		$('#name').css("border", "3px solid green") 
	}
}) 

/*Valid email must have letters/numbers before and after  
the required '@' and letters/numbers after '.'*/
$('input#mail').after("<label for='mail' id='mail-required' class='required-m'>*Required</label>");
const regex = /^[a-zA-Z0-9_.-]*@[a-zA-Z0-9]*\.[a-z]/; 

$('#mail').on('keyup', function () {
	if (!regex.test($('#mail').val())) {
		valid_mail = false; 
		$('#mail-required').text("*Not a valid email address...").css('color', 'red');
		$('#mail').css("border", "3px solid red");
	} else {
		valid_mail = true; 
		$('#mail-required').text("*Looks valid!").css('color', 'green');
		$('#mail').css("border", "3px solid green"); 
	}
})


//Ensure at least one activity is checked
$activities.append("<p id='activity-m' class='required-m'>Please select at least one activity</p>");
$('#activity-m').hide();
$activities.on('change', function () {
	if ($("input[type=checkbox]").is(":checked")) {
		valid_activity = true;
		$('#activity-m').hide();
	} else {
		valid_activity = false; 
		$('#activity-m').show();
	}
})

//Validate payment scheme 
$('input#cc-num').after("<label for='cc-num' id='cc-required' class='required-m'>*Please enter a credit card number</label>");

/* Helper function to validate credit card:
 13 or 16 digit number, 5-digit zip code, 3 digit CVV */

function validate_cc () {
	//CC number check 
	let $ccNum = $('#cc-num');
	let $ccZip = $('#zip');
	let $ccCVV = $('#cvv'); 
	let valid_num = false;
	let valid_zip = false; 
	let valid_cvv = false; 

	valid_payment = false;

	function cc_valid () {
		if (valid_num === true && valid_zip === true && valid_cvv === true) {
			valid_payment = true; 
		}
	} 

	$ccNum.on('keyup', function () {
		let digit_check = /^[0-9]+$/;
		if (digit_check.test($ccNum.val())) { 
			if ($ccNum.val().length === 13 || $ccNum.val().length === 16) {
				valid_num = true;
				$('#cc-required').text("*Looks valid!").css('color', 'green');
			} else {
				valid_num = false; 
				$('#cc-required').text("*Please enter a 13 or 16 digit number").css('color', 'red');
			} 
		} else {
			valid_num = false; 
			$('#cc-required').text("*Please enter a 13 or 16 digit number").css('color', 'red');
		}
		cc_valid();
	})

	//CC Zip Check 
	$ccZip.on('change', function () {
		if ($ccZip.val().length !== 5) {
			alert("Please input a 5 digit zip code")
			$ccZip.css("border", "3px solid red")
			valid_zip = false; 
		} else {
			valid_zip = true; 
			$ccZip.css("border", "3px solid green")
		}
		cc_valid();
	})

	//CC CVV Check 
	$ccCVV.on('change', function () {
		if ($ccCVV.val().length !== 3) {
			alert("Please input a 3 digit CVV")
			$ccCVV.css("border", "3px solid red")
			valid_cvv = false; 
		} else {
			valid_cvv = true; 
			$ccCVV.css("border", "3px solid green")
		}
		cc_valid();
	})
}

$payment.on('change', function () {
	if ($payment.val() === "credit card") {
		validate_cc(); 
	} else if ($payment.val() === "paypal" || $payment.val() === "bitcoin") {
		valid_payment = true; 
	} else {
		valid_payment = false; 
	}
})