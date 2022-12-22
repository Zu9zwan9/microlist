<?php

  $user = 'User start work: ' . htmlspecialchars($_GET["name"]) . '!';
  $email = 'Email: ' . htmlspecialchars($_GET["email"]) . '!';
  $apiToken = "5745733379:AAHFzCFrJ1E2d_TA3Y8DO42aSP2Dnj1nU_M";
  $data = [
      'chat_id' => '-857142274',
      'text' => $user
  ];
  $response = file_get_contents("https://api.telegram.org/bot$apiToken/sendMessage?" .
                                 http_build_query($data) );
?>
