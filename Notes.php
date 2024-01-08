<?php
$data = json_decode(file_get_contents('php://input'), true);
$lacs = json_decode(file_get_contents('lacs.json'), true);

foreach ($data as $rating) {
    foreach ($lacs['features'] as &$lac) {
        if ($lac['properties']['name'] == $rating['lakeName']) {
            $lac['properties']['total'] += $rating['note'];
            $lac['properties']['Nbnotes'] += 1;
            $lac['properties']['note'] = $lac['properties']['total'] / $lac['properties']['Nbnotes'];
            break;
        }
    }
}

file_put_contents('lacs.json', json_encode($lacs));
echo json_encode(['status' => 'success']);
?>
