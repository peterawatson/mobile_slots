<?php
//($_SERVER['SERVER_NAME'] == 'localhost') ? $prefix = "sta" : $prefix = ""; 

$xmlDoc=new DOMDocument();
$xmlDoc->load("../xml/all_games.xml");

$x=$xmlDoc->getElementsByTagName('Game');

$hint = ""; 

$gamelink = "https://test-slotwebsite.virtuegamesprovider.com/pigames/mobile/html5.do?region=UK&gameType=";

//get the q parameter from URL
isset($_GET["q"]) ? $q=$_GET["q"] : $q = "";

//lookup all links from the xml file if length of q>0
if (strlen($q)>0) {
  //$hint="";
  for($i=0; $i<($x->length); $i++) {
    $y=$x->item($i)->getElementsByTagName('Title');
    $z=$x->item($i)->getElementsByTagName('Link');
    if ($y->item(0)->nodeType==1) {
      //find a link matching the search text
      if (stristr($y->item(0)->childNodes->item(0)->nodeValue,$q)) {
        if ($hint=="") {
          $hint="<a href='" .$gamelink.
          $z->item(0)->childNodes->item(0)->nodeValue .
          "' class='col-sm-6 col-xs-12'>" .
          $y->item(0)->childNodes->item(0)->nodeValue . "</a>";
        } else {
          $hint=$hint . "<a href='" .$gamelink .
          $z->item(0)->childNodes->item(0)->nodeValue .
          "' class='col-sm-6 col-xs-12'>" .
          $y->item(0)->childNodes->item(0)->nodeValue . "</a>";
        }
      }
    }
  }
}

// Set output to "no suggestion" if no hint was found
// or to the correct values
if ($hint=="") {
  $response="<div class='nosuggestion'>No Suggestion</div>";
} else {
  $response=$hint;
}

//output the response
echo $response;
?> 
