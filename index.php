  <?php  $thispage = "Home"; 
   include_once 'include/top.php'; ?>
  <body>
	<?php include_once 'include/modal.php'; ?>
	<?php include_once 'include/nav.php'; ?>
	
	
	<?php include_once 'include/notloggedin_banner.php'; 
		  include 'include/gamesGen.php';
		  //$sourceFile = "xml/featured_games.xml";
		  //$hplink = ""; 
		  //$search = "";
		  //searchXML($sourceFile,$hplink,$search);
	?>
    
    <div class="navbar nbmid gradient">
	
			<div class="nav-center">
			  
			  <div id="middlemen">
				  <ul class="nav nav-tabs">
					  <li class="glyphicon glyphicon-triangle-left tleft nl mmenstyle inactive"></li>
					  <li class="nl"><img src="images/navborder.jpg"></li>
					  <li class="active nl feat mmenstyle"><a data-toggle="tab" href="#featured">FEATURED</a></li>
					  <li class="nl"><img src="images/navborder.jpg"></li>
					  <li class="nl all mmenstyle"><a data-toggle="tab" href="#allg">ALL</a></li>
					  <li class="nl"><img src="images/navborder.jpg"></li>
					  <li class="nl az mmenstyle"><a data-toggle="tab" href="#az">A-Z<span class="glyphicon glyphicon-menu-hamburger ghb"></span></a></li>
					  <li class="nl"><img src="images/navborder.jpg"></li>
				  </ul>
			  </div>
				<div>
					 <form class="sform" role="search">
					<!-- Define a button to toggle the search area -->
					<button id='search-button' class='btn btn-primary '><span class='glyphicon glyphicon-search'></span></button>
					<!-- Create your entire search form -->
					<div id='search-form' class="form-group">
					  <div class="input-group">
						<span id='search-icon' class="input-group-addon"><span class='glyphicon glyphicon-triangle-right'></span></span>
						<input type="text" class="form-control search-form-input" placeholder="Search" onkeyup="showResult(this.value)">
					  </div>
					</div>
				</div>
			</div>
			
			</form>
		
	</div>
	
	<div class="container-fluid">
		<div id="livesearch" class="livesearchresults row"></div>
	</div>	
	
	<div class="tab-content">
		
		<div id="featured" class="tab-pane fade in active">
			<div class="container-fluid">
				<div class="row gamecontainer" >
					
					<?php 
						$sourceFile = "xml/featured_games.xml";
						$hplink = "";
						makeGames($sourceFile, $hplink);
					?>
									
				</div>
			</div>
		</div>	
		
		<div id="allg" class="tab-pane fade">
			<div class="container-fluid">
				<div class="row gamecontainer" >
					
					<?php //include 'include/gamesGen.php'; 
						$sourceFile = "xml/all_games.xml";
						$hplink = "";
						makeGames($sourceFile, $hplink);
					?>
					
				</div>
			</div>
		</div>	
		
		<div id="az" class="tab-pane fade">
			<div class="container-fluid">
				<div class="row gamelist" id="container">
					<ul>
						<?php 					
							$sourceFile = "xml/all_games.xml";
							$hplink = "";
							gamesA2Z($sourceFile, $hplink);
						?>
					</ul>
				</div>
			</div>
		</div>
			
	</div>	

	<div class="botborder gradient3"></div>
	
	<?php include_once 'include/footer.php'; ?>
	
	<?php include_once 'include/footer_scripts.php'; ?>
	
	
  </body>
</html>
