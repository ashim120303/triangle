<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Треугольник из чисел</title>
    <link rel="stylesheet" href="css/main.css">
</head>
<body>

<h1>Построить треугольник из чисел</h1>

<form id="triangleForm" method="post" action="/triangle.php" class="container">
    <input type="number" id="numberInput" required placeholder="Напр. 9" class="input">
    <button type="submit" class="button">Построить</button>
</form>

<div class="container">
    <pre id="result" class="result"></pre>
    <br>
    <button id="downloadBtn" class="button hidden">Скачать PNG</button>
</div>
<div class="info">
    <h3 class="info__title">Как построить треугольник в консоли?</h3>
    <p class="info__text">Прожмите комбинацию клавишь CTRL+SHIFT+C -> Перейдите во вкладку Console -> напишите там функцию triangle(n), например triangle(9) -> Нажмите Enter.</p>
</div>

<script src="js/app.js"></script>
</body>
</html>
