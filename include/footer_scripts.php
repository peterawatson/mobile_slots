<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
	<script>window.jQuery || document.write('<script src="js/vendor/jquery-1.11.2.min.js"><\/script>')</script>
	
	
		
<?php if(ENVIRO == "local"): ?>  
    <!-- Bootstrap core JavaScript
    ================================================== -->
    <script src="<?php echo $urllink; ?>bootstrap/dist/js/bootstrap.min.js"></script>
    
    <!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
    <script src="<?php echo $urllink; ?>dev/js/ie10-viewport-bug-workaround.js"></script>
    <script src="<?php echo $urllink; ?>dev/js/uwd.js"></script>
    
    <script src="<?php echo $urllink; ?>dev/js/sso/sso_mob.js"></script>
    
    
<?php //elseif(ENVIRO == "prod"): ?>  
<?php else: ?>  
	<script src="js/build/production.min.js"></script>
<?php endif; ?> 
