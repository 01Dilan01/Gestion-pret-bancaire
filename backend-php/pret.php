<?php
session_start();
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header("Access-Control-Allow-Origin: *");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require 'db.php';

// Vérifie si l'utilisateur est connecté (optionnel, à activer si tu veux protéger l'API)
// if (!isset($_SESSION['user'])) {
//     http_response_code(401);
//     echo json_encode(['error' => 'Non autorisé']);
//     exit;
// }

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['bilan'])) {
        $stmt = $pdo->query("SELECT montant * (1 + taux_pret/100) AS montant_a_payer FROM pret_bancaire");
        $montants = $stmt->fetchAll(PDO::FETCH_COLUMN);
        $total = array_sum($montants);
        $min = empty($montants) ? 0 : min($montants);
        $max = empty($montants) ? 0 : max($montants);
        echo json_encode([
            'total' => $total,
            'min' => $min,
            'max' => $max,
            'all' => $montants
        ]);
        exit;
    } else {
        $stmt = $pdo->query("SELECT *, montant * (1 + taux_pret/100) AS montant_a_payer FROM pret_bancaire");
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
        exit;
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $sql = "INSERT INTO pret_bancaire (num_compte, nom_client, nom_banque, montant, date_pret, taux_pret)
            VALUES (?, ?, ?, ?, ?, ?)";
    $stmt = $pdo->prepare($sql);
    $ok = $stmt->execute([
        $data['num_compte'],
        $data['nom_client'],
        $data['nom_banque'],
        $data['montant'],
        $data['date_pret'],
        $data['taux_pret']
    ]);
    if ($ok) {
        echo json_encode(['message' => 'Insertion réussie']);
    } else {
        http_response_code(400);
        echo json_encode(['message' => 'Insertion échouée']);
    }
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    
    $data = json_decode(file_get_contents("php://input"), true);
    $sql = "UPDATE pret_bancaire SET num_compte=?, nom_client=?, nom_banque=?, montant=?, date_pret=?, taux_pret=?
            WHERE id=?";
    $stmt = $pdo->prepare($sql);
    $ok = $stmt->execute([
        $data['num_compte'],
        $data['nom_client'],
        $data['nom_banque'],
        $data['montant'],
        $data['date_pret'],
        $data['taux_pret'],
        $data['id']
    ]);
    if ($ok) {
        echo json_encode(['message' => 'Modification réussie']);
    } else {
        http_response_code(400);
        echo json_encode(['message' => 'Modification échouée']);
    }
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    if (isset($_GET['id'])) {
        $stmt = $pdo->prepare('DELETE FROM pret_bancaire WHERE id = ?');
        $ok = $stmt->execute([$_GET['id']]);
        if ($ok) {
            echo json_encode(['message' => 'Suppression réussie']);
        } else {
            http_response_code(400);
            echo json_encode(['message' => 'Suppression échouée']);
        }
        exit;
    }
}

http_response_code(405);
echo json_encode(['error' => 'Méthode non autorisée']);