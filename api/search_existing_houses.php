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
	$i=1;
	
	if($numHouses>0)
	{
		while($Row = mysqli_fetch_assoc($Table)) 
		{
			$houseID[]=$Row["houseID"];
			$houseName[]=$Row["houseName"];
			$numBlinds[]=$Row["numBlinds"];

			$Response[$i]=array("houseID"=>$houseID[$i-1],"houseName"=>$houseName[$i-1],"numBlinds"=>$numBlinds[$i-1]);
			$i=$i+1;
		}
		mysqli_free_result($Table);
	}
	else
	{
		$houseID=null;
		$houseName=null;
		$numBlinds=null;
	}
	
	echo json_encode($Response);

?>