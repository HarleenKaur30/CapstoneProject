<?php
	$CN=mysqli_connect("localhost","root","");
	
	$DB=mysqli_select_db($CN,"aishading");
	
	$EncodedData=file_get_contents('php://input');
	$DecodedData=json_decode($EncodedData,true);
	
	$FindUserID=$DecodedData["FindUserID"];
	
	$SQ="select * from houses where userID='$FindUserID'";
	
	$Table=mysqli_query($CN,$SQ);
	$numHouses=mysqli_num_rows($Table);
	$Response[0]=array("numHouses"=>$numHouses);
	
	echo json_encode($Response);

?>