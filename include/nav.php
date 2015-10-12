  <!-- Fixed navbar -->
  
  <?php //if(!$loggedin): // logged out?>
  <section id="loggedOutSection">
		<nav class="navbar navbar-fixed-top nbtop">
		  <div class="container">
			<div class="navcont">   
			   <button class="btn btn-danger pull-left disinline topnavbutton" type="submit" id="register">register</button>
					
			   <button class="btn btn-primary pull-right disinline topnavbutton" type="button" id="login">login</button>
			   
			   <div class="logo text-center"><a href="<?php echo $basehref; ?>"><img src="<?php echo $urllink; ?>images/logo.png"></a></div>
			</div>
		  </div>
		</nav>
   </section>
    
    <!--<script>var loggedin = 0; </script>-->
  <?php //else: // logged in?>
  <section id="loggedInSection">
		<!--<nav class="navbar navbar-fixed-top nbtoploggedin"> to show the balance -->
		<nav class="navbar navbar-fixed-top nbtop">
		  <div class="container">
			
			<div class="navcont"> 
				  
			   <div class="pull-left disinline topnavbutton" >
					
				<div class="dropdown">
					<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">
						<span class="glyphicon glyphicon-th-list" aria-hidden="true"></span>
					</button>
					<ul class="dropdown-menu gradient44">
					  <li><a href="#">ACCOUNT</a></li>
					  <li><a href="#">BET HISTORY</a></li>
					  <li><a href="#">DEPOSIT</a></li>
					  <li><a href="#">LOGOUT</a></li>
					</ul>
				 </div>
					   
			   </div>
					
			   <button class="btn btn-primary pull-right disinline topnavbutton" type="button" id="logout">logout</button>
			   
			   <div class="logo text-center"><a href="<?php echo $basehref; ?>"><img src="<?php echo $urllink; ?>images/logo.png"></a></div>
			</div>
			
			<!--<div class="player-balance">BALANCE : <span class="balance-amount">£123,45</span></div>-->
		
		  </div>
		</nav> 
    </section>
     <!--<script>var loggedin = 1; </script>-->
  <?php //endif; ?>
