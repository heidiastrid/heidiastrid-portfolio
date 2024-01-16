<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];
    
    $to = "aberdeinheidiastrid@gmail.com";
    $email_subject = "New message from $name: $subject";
    $email_body = "Name: $name\nEmail: $email\nSubject: $subject\nMessage:\n$message";
    
    $headers = "From: $email" . "\r\n" .
               "Reply-To: $email" . "\r\n" .
               "X-Mailer: PHP/" . phpversion();
    
    if (mail($to, $email_subject, $email_body, $headers)) {
        echo "Your message has been sent. Thank you!";
    } else {
        echo "Failed to send your message. Please try again later.";
    }
} else {
    echo "Error: Method not allowed.";
}
?>
