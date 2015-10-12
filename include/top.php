<?php // add redirect to desktop if not mobile device  js might be ok for this - based on screen size?? ( as its not as if it is
// a desktop with a small window ) //

	$protocol = "http://";

// Auto define
if($_SERVER['SERVER_NAME'] == 'localhost'){
	//define('ENVIRO', 'local');
	} else {
		//define('ENVIRO', 'prod');
	}

// manual definition	
define('ENVIRO', 'local');
	
if (defined('ENVIRO'))
{
	switch (ENVIRO)
	{
		case 'local':
			error_reporting(E_ALL);
			//$basehref = "http://localhost/Slotwebsitemobile/";
			$basehref = "http://localhost/slotwebsitemobile21/";
			$urllink = "http://localhost/slotwebsitemobile21/";
		break;
		case 'prod':
			error_reporting(0);
			$basehref = $protocol."www.m.slotwebsite.co.uk/";
			$urllink = $protocol."www.m.slotwebsite.co.uk/";
		break;
		default:
			exit('The application environment is not set correctly.');
	}
}

 if(ENVIRO == "prod")
{
	/* MOBILE DETECTION SCRIPT 	*/	
	include 'include/mobiledetect.php';
	$detect = new Mobile_Detect;
	$deviceType = ($detect->isMobile() ? ($detect->isTablet() ? 'tablet' : 'phone') : 'computer'); 

		if($deviceType == 'computer')
		{
			$url = "http://www.Slotwebsite.com";
			
			//header('Location: ' . $url, true, 302);
			//exit();
		}
		else if($deviceType == 'tablet' || $deviceType == 'phone')
		{
			
		}
}		

$loggedin = 0;

 ?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
   
    <meta name="description" content="">
    <meta name="author" content="United Web Development">
    <!--<link rel="icon" href="favicon.ico">-->

    <title>Slot Attack Mobile Website : <?php echo $thispage; ?></title>
    
    
<?php if(ENVIRO == "local"): ?>  
    <!-- Bootstrap core CSS -->

    <link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.css" rel="stylesheet">

    <!-- Custom styles for this template -->
    <link rel="stylesheet" href="<?php echo $urllink;?>dev/css/sa.css">
    
<?php //elseif(ENVIRO == "prod"): ?>
<?php else: ?>
	<!--<link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.css" rel="stylesheet">-->
	
	<link rel="stylesheet" href="css/build/production.min.css">


<?php endif; ?>
    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
