	var PT_INTEGRATION = (function (window) {
				"use strict";
				
				
				var isAutoLogin = false,
					token = "",
					username = "",
					reference = "",
					gamePopup,
					debug = true,
					loggedIn = false;	
					
				var $ = function (id) {
					return document.getElementById(id);
				};
				
							
				/* checks if the user has a loggedin cookie, if so - start autologin flow */
				var getLoggedInPlayerRequest = function () {
					setStatus(0);
					iapiGetLoggedInPlayer(1);
				};
				
				/* in case of loggedin cookie, set isAutoLogin to true */
				var getLoggedInPlayerResponse = function (response) {
					if (response.errorCode === 0) {
						if (response.cookieExists === "1") {
							//setStatus(1, {"playerMessage" : "Logged in cookie found"});
							if(debug === true){console.log("logged in cookie found"); }
							toggleControls(true);
							modalHide();
							
						} else {
							//setStatus(1, {"playerMessage" : "Logged in cookie not found"});
							if(debug === true){console.log("logged in cookie not found");}
							toggleControls(false);
						}
					} else {
						setStatus(2, response);  // ##modal message here
						toggleControls(false);
					}
				};
				
				
				var loginModal = function(){
					modal("",1);
				}
				
				
				
				/* login request 2 */
				var loginRequest2 = function () {  
										
					var username = $("username2").value,
						password = $("password2").value,
						message = "";
						
					if(username == null || username == "")
					{
						message = "Username is mandatory ";
						modal(message,1);
						return;
					}
					if(password == null || password == "")
					{
						message += "Password is mandatory";
						modal(message,1);
						return;
					}	
					
					iapiLogin(username, password, 1, "en");
					setStatus(0);
					makeSpace();
					loader("loginloader2");
				};
				
			
				
				var loader = function(loginBoxNum)
				{
					var html = '<div id="floatBarsG"><div id="floatBarsG_1" class="floatBarsG"></div><div id="floatBarsG_2" class="floatBarsG">' +
					'</div><div id="floatBarsG_3" class="floatBarsG"></div><div id="floatBarsG_4" class="floatBarsG"></div><div id="floatBarsG_5" class="floatBarsG">'+
					'</div><div id="floatBarsG_6" class="floatBarsG"></div><div id="floatBarsG_7" class="floatBarsG"></div>'+
					'<div id="floatBarsG_8" class="floatBarsG"></div></div>';
								
					$(loginBoxNum).innerHTML = html;
					$(loginBoxNum).className = "active";
				}
				
				var loaderRemove = function(){
					//$("loginloader").innerHTML = "";
					//$("loginloader").className = "";
					$("loginloader2").innerHTML = "";
					$("loginloader2").className = "";
				}
				
				
				
				/* login response - verify session (sometimes user would have to accept new TNCs or change password */
				var loginResponse = function (response) { 
					
					if(debug === true){ console.log(JSON.stringify(response)); }
					
					if (iapiLoginSuccess) {  // logged in
						loaderRemove();
						modalHide();
						var message;
						if (iapiSessionValid == 1) { //valid session
							username = response.username.username;
							//setStatus(1);
							toggleControls(true);
							
						} else {
							if (response.sessionValidationData) {
								var validationData = response.sessionValidationData;
								if (validationData.SessionValidationByPasswordChangeData) { // Show player password change window 
									//setStatus(1);
									setPlayerMessage("password");
									modal("",3);
								}
								if (validationData.SessionValidationByTCVersionData) { // Show player terms and conditions window, from provided url. // Reference is needed for iapiValidateTCVersion call.
									//setStatus(1);
									setPlayerMessage("tnc", validationData.SessionValidationByTCVersionData[0].tcVersionUrl, validationData.SessionValidationByTCVersionData[0].termVersionReference);
									modal("",3);
								}
							}
						}
					} else {  
							loaderRemove();
							//copyUn();
							displayErrorMessage(response, 1);
						// Error messages for player
						
					}
				};
				
				
				var displayErrorMessage = function(response, type){
					var message;
					loaderRemove();
					switch(response.errorCode){
						
						case 2:
							message = "Wrong Password.";
							modal(message, type);
							break;
						case 6:
							message = "Request timed out.";
							modal(message, type);
							break;
						case 22:
							message =  "Account temporarily blocked.";
							modal(message, type);
							break;
						case 107:
							message = "Invalid password / username.";
							modal(message, type);
							break;
						default:
							message = response.playerMessage;
							modal(message, type);
						}
						
				};
				
				
				var launchGame = function (game) { 
					if (token == "") {
				
						gamePopup =  window.open("about:blank", "_blank", "width=800, height=600");  // open popup window blank first, then populate in callback
						getTempTokenRequest2(game);
						//return;
					}
					else
					{
						var url = "https://sta-sidk1234531.virtuallogicgames.com/pigames/play/index.do?region=UK&gameType=" + game + "&token=" + username + ":" + token;
						window.open(url, "vfGame", "width=800, height=600");
					}				
					
				};
				
				
				var getTempTokenRequest2 = function (game) {
					//setStatus(0);			
					
					//iapiSetCallout('GetTemporaryAuthenticationToken', calloutToken);
					iapiSetCallout('GetTemporaryAuthenticationToken', function(response){  // made the function inline, inside the scope of getTempTokenRequest2 function
						if (token == "" && typeof(response.sessionToken) != 'undefined') {  // check if response token exists ( to prevent error if game clicked but
																							// client not logged in
							if(debug === true){ console.log(JSON.stringify(response)); }
							
							token = response.sessionToken.sessionToken;
							username = response.username;
							if(debug === true){  console.log(game, token, username); }
						
							var url = "https://sta-sidk1234531.virtuallogicgames.com/pigames/play/index.do?region=UK&gameType=" + game + "&token=" + username + ":" + token;
							//window.open(url, "vfGame", "width=800, height=600");
							 gamePopup.location.href = url;  // populate window. this step needed for chrome as cant open window from code, only from click
						}
						else{  //console.log(game, username, token);  // user name and token are empty therefore login window showen
							var url = "https://sta-sidk1234531.virtuallogicgames.com/pigames/play/index.do?region=UK&gameType=" + game + "&token=" + username + ":" + token;
							gamePopup.location.href = url;
						}
					});
					/*iapiRequestTemporaryToken(1, iapiConf.systemId, iapiConf.serviceType);*/
					iapiRequestTemporaryToken(1, iapiConf.bingoSystemId, iapiConf.serviceType);			
				};
							
				
				/* display logged in/out controls */
				var toggleControls = function (isLoggedIn) {
					if (isLoggedIn === true) {
						$('loggedOutSection').className = "inactive";
						$('loggedInSection').className = "active";
						modalHide();
					} else {
						$('loggedOutSection').className = "active";
						$('loggedInSection').className = "inactive";
					}
				};
				
				
					/* logout */
				var logoutRequest = function () {
					//setStatus(0);
					iapiLogout(1, 1, "all");
				};
				
				var logoutResponse = function (response) {
					if (response.errorCode === 0) {
						toggleControls(false);
						//setStatus(1);
					} else {
						//setStatus(2, response);
					}
				};	
				
				
				/* toggle forgot password section */
				var displayForgotPassword = function () {
					
					$("loginForm").className = "inactive";
					var message = "Please enter your details";
					dob();
									
					
					$('fpEmail').addEventListener("blur", function(){
						var email  = $("fpEmail").value;
						if(email.indexOf("@") == -1)
						{
							$("modalMessage").innerHTML = "<span style='color:red'>Please enter a proper email address</span>";
						}
					});	
					$('fpEmail').addEventListener("focus", function(){		
							$("modalMessage").innerHTML = "Please enter your details";		
					});	
					
					//~ setPlayerMessage("password"); // these 2 lines to test				
					//~ modal("",3); // no message - message comes from playerMessage Section
					modal(message,2);  // this line for live
				};
				
				
				/* send forgot password request */
				var forgotPasswordRequest = function () {
					 //setStatus(0);
					loader("loginloader2");
					var username = $("fpUsername").value,
						email    = $("fpEmail").value,
						birthDate = $("fpYear").value + "-" + $("fpMonth").value + "-" + $("fpDay").value;
				
												
					iapiForgotPassword(username, email, birthDate, 1, "");
									
				};
				
				/* forgot password response */
				var forgotPasswordResponse = function (response) {
					
					var message = "";
					if (response.errorCode === 0) {
						//setStatus(1, "A new password was emailed to you");
						loaderRemove();
						message = "A new password was emailed to you";
						modal(message,2);
					} else {
						loaderRemove();
						//setStatus(2, response);
						displayErrorMessage(response, 2);
					}
					if(debug === true){ console.log(JSON.stringify(response)); }
				};
							
							
								
				
				/* bind event listeners to the games */
				var bindGameListeners = function()
				{
					//var theParent = document.querySelector("#container");  // NB 2 things. it is 2 nodes up, not one
																		// also there are more than one #container
																		
					var x = document.getElementsByClassName("gamecontainer");
					var i;
					for (i = 0; i < x.length; i++) {
						
						//x[i].style.backgroundColor = "red";
						if(typeof(x[i]) != 'undefined' && x[i] != null)
						{
							x[i].addEventListener("click", launchListener, false);
						}					
						
					}													
																		
						function launchListener(e) {
						if (e.target !== e.currentTarget) {
							var gameLink = e.target.parentNode.parentNode.getAttribute('data-gamelink');
							
							
				
							
							launchGame(gameLink);
							e.preventDefault();
						}
						e.stopPropagation();
					}
				}
				
				
				/* bind event listeners to the games list */
				var bindGameListeners2 = function()
				{
					var theParent = document.querySelector("#container");  // NB 2 things. it is 2 nodes up, not one
																		// also there are more than one #container
					
					if(typeof(theParent) != 'undefined' && theParent != null)
					{
						theParent.addEventListener("click", launchListener, false);
					}
					
					function launchListener(e) {
						if (e.target !== e.currentTarget) {
							var gameLink = e.target.parentNode.getAttribute('data-gamelink');
							
						
							
							launchGame(gameLink);
							e.preventDefault();
						}
						e.stopPropagation();
					}
				}
				
				
				/* bind event listeners to the live search */
				var bindGameListeners3 = function()
				{
					var theParent = document.querySelector("#livesearch");  // NB 2 things. it is 2 nodes up, not one
																		// also there are more than one #container
					
					if(typeof(theParent) != 'undefined' && theParent != null)
					{
						theParent.addEventListener("click", launchListener, false);
					}
					
					function launchListener(e) {
						if (e.target !== e.currentTarget) {
							var gameLink = e.target.getAttribute('data-gamelink');
							
					
							
							launchGame(gameLink);
							e.preventDefault();
						}
						e.stopPropagation();
					}
				}
							
				
				/* get token request (for games launch, auto login etc) */
				var getTempTokenRequest = function () {
					setStatus(0);
					/*iapiRequestTemporaryToken(1, iapiConf.systemId, iapiConf.serviceType);*/
					iapiRequestTemporaryToken(1, iapiConf.bingoSystemId, iapiConf.serviceType);
				};
				
				/* token response, if isAutoLogin is true, will perform login using this token */
				var getTempTokenResponse = function (response) {
					if (response.errorCode === 0) {
						setStatus(1, "Token: " + response.sessionToken.sessionToken);
						token = response.sessionToken.sessionToken;
						if (isAutoLogin) {
							loginSessionTokenRequest();
							isAutoLogin = false;
							toggleControls(true);  // show logged in state
						}
					} else {
						setStatus(2, response);
					}
				};
							
				
				/* accept TNC request */
				var validateTermsSession = function () {
					//setStatus(2);
					loader("loginloader2");
					if (reference !== "") {
						iapiValidateTCVersion(reference, 1, 1);
					} else {
					
					}
				};
				
				/* accept TNC request */
				var validatePassword = function () {
					//setStatus(2);
					loader("loginloader2");
					var oldpwValue = $("changePasswordOld").value;
					var newpwValue = $("changePasswordNew").value;
					iapiValidatePasswordChange(oldpwValue, newpwValue, 1, 1);
				};
				
				/* validate session response */
				var validateSessionResponse = function (response) {
					
					if(debug === true){  console.log(JSON.stringify(response)); }
					
					if (response.errorCode) { 
						//setStatus(2, response);
						displayErrorMessage(response, 4)
					} else { 
						setStatus(1);
						var performAutoLogin = true;
						
						/* Check if additional validation is needed */
						if (response.SessionValidationByPasswordChangeData) { /* Change password needed */
							setPlayerMessage("password");
							performAutoLogin = false;
						}
						if (response.SessionValidationByTCVersionData) {  /* Accept TNC required */
							setPlayerMessage("tnc", validationData.SessionValidationByTCVersionData[0].tcVersionUrl, validationData.SessionValidationByTCVersionData[0].termVersionReference);
							performAutoLogin = false;
						}
						
						if (performAutoLogin) {
							isAutoLogin = true;
							getTempTokenRequest();
						}
					}
				};
				
				/* login using session token instead of username/password combo - for auto login */
				var loginSessionTokenRequest = function () {
					iapiLoginSessionToken(token, 1, "en");
					token = "";
					toggleControls(true);
				};
				
			
				
				/* displays human understandable data about requests and responses */
				var setStatus = function (status, data) {
					// status 0: process, 1: success, 2: fail
					switch (status) {
						case 0:
							//$("statusSection").className = "process";
							break;
						case 1:
							//$("statusSection").className = "success";
							if (typeof data === "string") {
								//$("successData").innerText = data;
							} else {
								//$("successData").innerText = "";
							}
							setPlayerMessage("");
							break;
						case 2:
							
							//$("statusSection").className = "fail";
							//if (typeof data === "object") {
							if (typeof data === "string") {
								//$("errorCode").innerText = data.errorCode;
								//$("errorText").innerText = data.errorText;
								
								//$("playerMessage").innerText = data.playerMessage;  //inner Text doesn't work in firefox
								//$("playerMessage").innerHTML = data.playerMessage; 
								
							} else {
								//$("playerMessage").innerText = data.playerMessage;
								//$("playerMessage").innerHTML = data.playerMessage; 
							
							}
							break;
						default:
							//$("playerMessage").innerText = data; console.log(data);
							break;
					}
				};
				
				
				
				/* if there is pending user message - display */ 
				var setPlayerMessage = function (type) { 
					
					//console.log(type);
					if(debug === true){  console.log(arguments); }
					
					if (type === "tnc") { /* user has to accept TNC again */
						reference = arguments[2];
						$("playerMessageSection").innerHTML = "<div class='playerMessageM'>Please accept the terms and conditions <br /> before continuing: </div><a href='" + arguments[1] + "' target='_blank'>Read the Terms and Conditions Here</a><br />";
						var btn = document.createElement("input");
						btn.type = "button";
						btn.id = "acceptTNC";
						btn.value = "Accept";
						$("playerMessageSection").appendChild(btn);
						btn.addEventListener("click", validateTermsSession, false);
					} else if (type === "password") { /* user's password is expired and is requiered to change */
						reference = arguments[2];
						$("playerMessageSection").innerHTML = "<div class='playerMessageM'>Please change your password <br /> before continuing </div>";
						var oldpw = document.createElement("input");
						oldpw.type = "password";
						oldpw.id = "changePasswordOld";
						oldpw.placeholder = "Old password";
						$("playerMessageSection").appendChild(oldpw);
						var newpw = document.createElement("input");
						newpw.type = "password";
						newpw.id = "changePasswordNew";
						newpw.placeholder = "New password";
						$("playerMessageSection").appendChild(newpw);
						var btn = document.createElement("input");
						btn.type = "button";
						btn.id = "acceptPassword";
						btn.value = "Change";
						btn.className = "btn btn-primary"
						$("playerMessageSection").appendChild(btn);
						btn.addEventListener("click", validatePassword, false);
					} else { /* other messages (promos etc) */
						$("playerMessageSection").innerHTML = type;
					}
				};			
				
				
				/* opens reg page */
				var launchRegister = function (e) {
					e.preventDefault();
					var url = "https://sta-sidk1234531.virtuallogicgames.com/pigames/registration/jsf/registrationForm.jsf";
					window.open(url, "vfGame", "width=930, height=768");
				};
				
				
				
				
				/* Modal function */
				var modal = function(content, type){
					if(type === 1)
					{	// show log in form
						takeSpace();
						$("loginForm").className = "active";
						$("forgotPw").className = "inactive";
						$("playerMessageSection").className = "inactive";
					}
					else if(type === 2)
					{	// show forgot password form
						$("loginForm").className = "inactive";
						$("forgotPw").className = "active";
						$("playerMessageSection").className = "inactive";
					}
					else if(type === 3)
					{	// show player message section ( t n c Or change password, + message )
						$("loginForm").className = "inactive";
						$("forgotPw").className = "inactive";
						$("playerMessageSection").className = "active";
					}
					else if(type === 4)
					{	// show message only
						$("loginForm").className = "inactive";
						$("forgotPw").className = "inactive";
						$("playerMessageSection").className = "inactive";
					}
					
					$('modalOverlay').className = "active";
					$('modal').className = "active";
					$('modalMessage').innerHTML = content;
				};
				
				var modalHide = function(){
					$('modalOverlay').className = "";
					$('modal').className = "";
					takeSpace();
				}
				
				
				var makeSpace = function(){
					
					//$("login").style.opacity = "0.2";
					//$("login").style.filter  = 'alpha(opacity=20)'; 
					$("forgot2").style.opacity = "0";
					$("forgot2").style.filter  = 'alpha(opacity=0)'; 
				}
				
				var takeSpace = function(){
					
					//$("login").style.opacity = "1";
					$("forgot2").style.opacity = "1";
				}
				
				
				var dob = function(){
					var monthtxt=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec'];
					
						var today=new Date();
						var dayF=$("fpDay");
						var monthF=$("fpMonth");
						var yearF=$("fpYear");
						for (var i=0; i<31; i++){
							dayF.options[i]=new Option(i+1, get2D(i+1))
							}
						dayF.options[today.getDate()-1]=new Option(today.getDate(), get2D(today.getDate()), true, true) //select today's day
						
						for (var m=0; m<12; m++){
							monthF.options[m]=new Option(monthtxt[m], get2D(m+1))							
								}
							var monthd = today.getMonth() + 1;  monthd < 10 ? '0' + monthd : '' + monthd;
							monthF.options[today.getMonth()]=new Option(monthtxt[today.getMonth()], get2D(monthd), true, true) //select today's month
													
						var thisyear=today.getFullYear()
						for (var y=0; y<100; y++){
							yearF.options[y]=new Option(thisyear, thisyear)
							thisyear-=1
						}
						yearF.options[0]=new Option(today.getFullYear(), today.getFullYear(), true, true) //select today's year
					
				}
				
				var get2D = function( num ) {   // 0 left padding for single numbers
				if( num.toString().length < 2 ) 
					return "0" + num; 
				return num.toString(); 
				}
				
				if(debug === true){  console.log(isAutoLogin); }
				
				
				/* bind button event listeners */
				var bindListeners = function () {
										
					$("register").addEventListener("click", launchRegister, false);
					$("login").addEventListener("click", loginModal, false);
					$("login2").addEventListener("click", loginRequest2, false);
					
					$("modalClose").addEventListener("click", modalHide, false);
					$("logout").addEventListener("click", logoutRequest, false);
					$("forgot2").addEventListener("click", displayForgotPassword, false);
					$("sendNewPassword").addEventListener("click", forgotPasswordRequest, false);
					
					/*$("forgot").addEventListener("click", displayForgotPassword, false);*/
					
				};
				
				/* init PAS API with callout configuration, and check for logged in cookie */
				var init = function () {
					bindListeners();
					bindGameListeners();
					bindGameListeners2();
					bindGameListeners3();
					iapiSetCallout("Login", loginResponse);
					iapiSetCallout("LoginSessionToken", loginResponse);
					iapiSetCallout("GetTemporaryAuthenticationToken", getTempTokenResponse);
					iapiSetCallout("Logout", logoutResponse);
					iapiSetCallout("GetLoggedInPlayer", getLoggedInPlayerResponse);
					iapiSetCallout("ValidateLoginSession", validateSessionResponse);
					iapiSetCallout("ForgotPassword", forgotPasswordResponse);
					
					getLoggedInPlayerRequest();  // check for logged in cookie
				};
				
				window.addEventListener("DOMContentLoaded", init, false);
			} (window));
			
			
			
