<?php
	$CN=mysqli_connect("localhost","root","");
	
	$DB=mysqli_select_db($CN,"aishading");
	
	$EncodedData=file_get_contents('php://input');
	$DecodedData=json_decode($EncodedData,true);
	
	$FindHouseID=$DecodedData["FindHouseID"];
	
	$SQ="select * from blinds where houseID='$FindHouseID'";
	$SQ1="select * from houses where houseID='$FindHouseID'";
	
	$Table=mysqli_query($CN,$SQ);
	$Table1=mysqli_query($CN,$SQ1);
	
	$numBlinds=mysqli_num_rows($Table);
	$Response[0]=array("numBlinds"=>$numBlinds);
	$Row1=mysqli_fetch_assoc($Table1);
	$houseName=$Row1["houseName"];
	$Response[1]=array("houseName"=>$houseName);
	
	$i=2;
	
	if($numBlinds>0)
	{
		while($Row = mysqli_fetch_assoc($Table)) 
		{
			$unitID[]=$Row["unitID"];
			$groupName[]=$Row["groupName"];
			$blindsName[]=$Row["blindsName"];
			$openPercentage[]=$Row["openPercentage"];
			$battery[]=$Row["battery"];
			$scheduleID=$Row["scheduleID"];
			
			$SQ2="select * from schedules where scheduleID='$scheduleID'";
			$Table2=mysqli_query($CN,$SQ2);
			
			if(mysqli_num_rows($Table2)>0)
			{
				$Row2 = mysqli_fetch_assoc($Table2);
				$scheduleName[]=$Row2["scheduleName"];
			}
			else
			{
				$scheduleName[]="None";
			}

			$Response[$i]=array("unitID"=>$unitID[$i-2],"groupName"=>$groupName[$i-2],"blindsName"=>$blindsName[$i-2],"openPercentage"=>$openPercentage[$i-2],"battery"=>$battery[$i-2],"scheduleName"=>$scheduleName[$i-2]);
			$i=$i+1;
		}
		mysqli_free_result($Table);
	}
	else
	{
		$unitID=null;
		$groupName="";
		$blindsName="";
		$openPercentage=null;
		$battery=null;
		$scheduleName="";
		$Response[$i]=array("unitID"=>$unitID,"groupName"=>$groupName,"blindsName"=>$blindsName, "openPercentage"=>$openPercentage, "battery"=>$battery, "scheduleName"=>$scheduleName);
	}
	
	echo json_encode($Response);

?>