<?php

// Функция строит числовой треугольник, если число n — это полный квадрат
function buildTriangle(int $n): ?array {
    $k = (int)sqrt($n); // Находим сторону квадрата (кол-во строк в треугольнике)

    // Если n не является полным квадратом — вернуть null
    if ($k * $k !== $n) {
        return null;
    }

    $triangle = []; // Массив строк треугольника
    $current = 1;   // Начальное число

    // Строим строки треугольника: 1 число, 3, 5, и т.д.
    for ($row = 0; $row < $k; $row++) {
        $length = 2 * $row + 1; // Кол-во чисел в текущей строке
        $triangle[] = range($current, $current + $length - 1);
        $current += $length;
    }

    return $triangle;
}

// Функция форматирует треугольник в строку с ровным центрированием
function formatTriangle(array $triangle): string {
    // Определяем ширину каждой ячейки по самому большому числу
    $maxNumber = max(array_map('max', $triangle));
    $cellWidth = strlen((string)$maxNumber);
    $lines = [];

    // Формируем строки с выравниванием чисел
    foreach ($triangle as $row) {
        $formatted = array_map(
            fn($n) => str_pad((string)$n, $cellWidth, ' ', STR_PAD_LEFT),
            $row
        );
        $lines[] = implode(' ', $formatted);
    }

    // Центрируем строки по самой длинной
    $maxLineWidth = max(array_map('strlen', $lines));
    $centeredLines = [];

    foreach ($lines as $line) {
        $leftPadding = (int)(($maxLineWidth - strlen($line)) / 2);
        $centeredLines[] = str_repeat(' ', $leftPadding) . $line;
    }

    return implode("\n", $centeredLines);
}

// Получаем значение из POST-запроса
$n = filter_input(INPUT_POST, 'n', FILTER_VALIDATE_INT);

// Проверка на корректность ввода
if ($n === false || $n < 1) {
    echo "Введите корректное положительное число.";
    exit;
}

// Пытаемся построить треугольник
$triangle = buildTriangle($n);

// Если не удалось — выводим сообщение
if ($triangle === null) {
    echo "Невозможно построить треугольник.";
    exit;
}

// Если запрошен формат JSON (для JS-функции triangle(n) → консоль браузера)
if (isset($_GET['format']) && $_GET['format'] === 'json') {
    // Форматируем каждую строку
    $maxNumber = max(array_map('max', $triangle));
    $cellWidth = strlen((string)$maxNumber);

    $lines = array_map(function ($row) use ($cellWidth) {
        $formatted = array_map(
            fn($n) => str_pad((string)$n, $cellWidth, ' ', STR_PAD_LEFT),
            $row
        );
        return implode(' ', $formatted);
    }, $triangle);

    // Центрирование
    $maxLen = max(array_map('strlen', $lines));
    $centered = array_map(function ($line) use ($maxLen) {
        $pad = floor(($maxLen - strlen($line)) / 2);
        return str_repeat(' ', $pad) . $line;
    }, $lines);

    // Возвращаем JSON
    header('Content-Type: application/json');
    echo json_encode($centered);
    exit;
}

// Иначе выводим обычный текст для <pre>
echo formatTriangle($triangle);
