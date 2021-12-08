<?php

if (isset($_GET["code"])) {

    $ch = curl_init();
 
    $bodyStr = "InterfaceID=AUC369&UserIP=". $_GET["uip"] ."&FwCode=" . $_GET["code"];
    curl_setopt($ch, CURLOPT_URL, "http://www.cn9365.org/FwQuery.asmx/FwQueryVerifyZongHe");
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt(
        $ch,
        CURLOPT_POSTFIELDS,
        $bodyStr
    );

    // Receive server response ...
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $server_output = curl_exec($ch);
    curl_close($ch);

    echo $server_output;
    
} else {
    echo "Something went wrong.";
}
