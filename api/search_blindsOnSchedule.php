<?php
	$CN=mysqli_connect("localhost","root","");
	
	$DB=mysqli_select_db($CN,"aishading");
	
	$EncodedData=file_get_contents('php://input');
	$DecodedData=json_decode($EncodedData,true);
	
	$FindScheduleID=$DecodedData["FindScheduleID"];
	
	$SQ="select * from blinds where scheduleID='$FindScheduleID'";
	
	$Table=mysqli_query($CN,$SQ);
	$numBlinds=mysqli_num_rows($Table);
	$Response[0]=array("numBlinds"=>$numBlinds);
	$i=1;
	
	if($numBlinds>0)
	{
		while($Row = mysqli_fetch_assoc($Table)) 
		{
			$unitID[]=$Row["unitID"];
			$groupName[]=$Row["groupName"];
			$blindsName[]=$Row["blindsName"];
			$houseID=$Row["houseID"];
			
			$SQ2="select * from houses where houseID='$houseID'";
			$Table2=mysqli_query($CN,$SQ2);
			$Row2 = mysqli_fetch_assoc($Table2);
			$houseName[]=$Row2["houseName"];

			$Response[$i]=array("houseName"=>$houseName[$i-1],"unitID"=>$unitID[$i-1],"groupName"=>$groupName[$i-1],"blindsName"=>$blindsName[$i-1]);
			$i=$i+1;
		}
		mysqli_free_result($Table);
	}
	else
	{
		$unitID=null;
		$groupName="";
		$blindsName="";
		$houseName="";
		$Response[$i]=array("houseName"=>$houseName,"unitID"=>$unitID,"groupName"=>$groupName,"blindsName"=>$blindsName);
	}
	
	echo json_encode($Response);

?>