<?php

$url = "https://cat-fact.herokuapp.com/facts";
$response = file_get_contents($url);
if ($response === false) {
    die('Failed to retrieve data.');
}

$catFacts = json_decode($response, true);
if ($catFacts === null) {
    die('Failed to decode JSON data.');
}

echo "<h1>Cat Facts</h1>";
echo "<ul>";
foreach ($catFacts as $fact) {
    echo "<li>" . htmlspecialchars($fact['text']) . "</li>";
}
echo "</ul>";

?>