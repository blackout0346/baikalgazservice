<?php

$max_request = 3;
$period = 60;
$ip = $_SERVER['REMOTE_ADDR'];
$secret = "ysc2_ZKbHttA4kU5VgVygKTmtzfIhDFpIagIXOu7noaSk23921fb9";
$file_dir = sys_get_temp_dir() . '/rate_limit_cache';

if(!is_dir($file_dir)) {

    @mkdir($file_dir, 0755, true);
}

$file = $file_dir . '/' . md5($ip) . '.txt';
$current_time = time();
$requests = array(); 


if(file_exists($file)) {
    $content = file_get_contents($file);
    $data = @unserialize($content);
    if(is_array($data)) {
        foreach($data as $timestamp) {
            if($timestamp > ($current_time - $period)) {
                $requests[] = $timestamp;
            }
        }
    }
}

$requests[] = $current_time;
file_put_contents($file, serialize($requests));


if(count($requests) > $max_request) {
    http_response_code(429);
    echo json_encode(array('error' => 'Too many requests'));
    exit;
}




$token = $_POST['smart-token']?? null;

if (!$token) {
    $input = json_decode(file_get_contents('php://input'), true);
    $token = $input['smart-token'] ?? $input['token'] ?? null;
   
    exit;
}

$secret = 'ysc2_ZKbHttA4kU5VgVygKTmtzfIhDFpIagIXOu7noaSk23921fb9'; 


$ch = curl_init('https://smartcaptcha.cloud.yandex.ru/validate');
$args = array(
    'secret' => $secret,
    'token' => $token,
    'ip' => $ip
);

curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($args));
curl_setopt($ch, CURLOPT_TIMEOUT, 5);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);


if ($httpCode !== 200) {
    http_response_code(500);
    echo json_encode(array('error' => 'External verification error'));
    exit;
}

$result = json_decode($response, true);
if (isset($result['status']) && $result['status'] === 'ok') {
    echo json_encode(array('status' => 'ok'));
} else {
    http_response_code(403);
    echo json_encode(array('error' => 'Invalid captcha', 'details' => $result));
}
?>