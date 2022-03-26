<?php

$CN=mysqli_connect("localhost","root","");

$DB=mysqli_select_db($CN,"aishading");

$EncodedData=file_get_contents('php://input');
$DecodedData=json_decode($EncodedData,true);

$FindUserID=$DecodedData["FindUserID"];

$SQ="select * from schedules where userID='$FindUserID'";

$Table=mysqli_query($CN,$SQ);
$numSchedules=mysqli_num_rows($Table);
$Response[0]=array("numSchedules"=>$numSchedules);
$i=1;

if($numSchedules>0)
{
  while($Row = mysqli_fetch_assoc($Table))
  {
    $scheduleID[]=$Row["scheduleID"];
    $scheduleName[]=$Row["scheduleName"];

    $Response[$i]=array("scheduleID"=>$scheduleID[$i-1],"scheduleName"=>$scheduleName[$i-1]);
    $i=$i+1;
  }
  mysqli_free_result($Table);
}
else
{
  $scheduleID=null;
  $scheduleName=null;

}

echo json_encode($Response);

?>
