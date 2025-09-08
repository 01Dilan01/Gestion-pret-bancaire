<?php
session_start();
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: POST, GET, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    if ($data['login'] === 'admin' && $data['password'] === 'admin123') {
        $_SESSION['user'] = $data['login'];
        echo json_encode(['success' => true, 'user' => $data['login']]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Identifiants invalides']);
    }
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    echo json_encode(['user' => $_SESSION['user'] ?? null]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    session_destroy();
    echo json_encode(['success' => true]);
    exit;
}
