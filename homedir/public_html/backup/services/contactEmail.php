<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

function validateEmail($email)
{
    $fromEmail = filter_var($email, FILTER_SANITIZE_EMAIL);
    if (filter_var($fromEmail, FILTER_VALIDATE_EMAIL)) {
        return true;
    } else {
        return false;
    }
}

function responseMessage($status, $msg)
{
    $res = array("status" => $status, "message" => $msg);
    echo json_encode($res);
}

if (isset($_POST["from"])  && validateEmail($_POST["from"])) {

    $msg = isset($_POST['message']) ? $_POST['message'] : "No comments";

    $msg = $msg . ". Stars: " . $_POST["from"];
    // &&  isset($_POST["message"]) && isset($_POST["star"])
    $from = filter_var($_POST["from"], FILTER_SANITIZE_EMAIL);
    $to = "info@aucvape.com";
    $subject = "Review Email from AUC Vape website";
    $message = $msg;
    $headers = "From:" . $from;
    if (mail($to, $subject, $message, $headers)) {
        responseMessage("success",  "The email message was sent successfully.");
    } else {
        responseMessage("failed",  "The email message was sent successfully.");
    }
} else {
    responseMessage("failed",  "Please add valid email address.");
}
