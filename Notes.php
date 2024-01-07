<?php
// Connexion à la base de données
$db = $db = new PDO('mysql:host=localhost;dbname=form', 'root', 'root');


$data = json_decode(file_get_contents('php://input'), true);

foreach ($data as $rating) {
    // Vérifiez si les notes ont déjà été validées pour ce lac
    $check = $db->prepare("SELECT is_validated FROM ratings WHERE lake_name = ?");
    $check->execute([$rating['lakeName']]);
    $result = $check->fetch(PDO::FETCH_ASSOC);

    // Si les notes n'ont pas encore été validées, les insérer ou mettre à jour
    if ($result && $result['is_validated'] == 0) {
        $stmt = $db->prepare("UPDATE ratings SET note = ?, is_validated = 1 WHERE lake_name = ?");
        $stmt->execute([$rating['note'], $rating['lakeName']]);
    } elseif (!$result) {
        $stmt = $db->prepare("INSERT INTO ratings (lake_name, note, is_validated) VALUES (?, ?, 1)");
        $stmt->execute([$rating['lakeName'], $rating['note']]);
    }
}

echo json_encode(['status' => 'success']);
?>
