

<div id='modalOverlay'></div>
		<div id='modal'>
			<div class='modalContent'>			
				<div id='modalMessage'></div>
			
				<form action="#" class="loginForm" id="loginForm">							
					<div><input type="text" id="username2" placeholder="Username" value="shmilbingo" required /></div>			
					<div><input type="password" id="password2" placeholder="Password" value="play1234" required /></div>			
					<div class="modal_butCont">
					
						 <button class="btn btn-primary pull-right disinline topnavbutton" type="button" id="login2" class="login2">login</button>
						
						<div  id="forgot2" class="forgot2">
							<a href="#">Forgotton Password?</a>
						</div>
					</div>				
				</form>
				
				<form action = "#" class="forgotPw" id="forgotPw">
					<div class="formControl">
						<div class="label"><label for="fpUsername">Username: </label></div>
						<input type="text" id="fpUsername" />
					</div>
					<div class="formControl"> 
						<div class="label"><label for="fpEmail">Email: </label></div>
						<input type="email" id="fpEmail" />
					</div> 
					<div class="formControl">
						<div class="formSection">Date Of Birth: </div>
						<select id="fpDay"></select>
						<select id="fpMonth"></select>
						<select id="fpYear"></select>
					</div>
					<button class="btn btn-primary pull-right disinline topnavbutton" type="button"  id="sendNewPassword">submit</button>
					
				</form>	
				
				<section id="playerMessageSection"></section>
				
				<div class="loginloader" id="loginloader2"></div>
			</div>		
			<div class="modalClose" id="modalClose"><a href='#'>close</a></div>
		</div>
