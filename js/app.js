// Получаем ссылки на элементы формы, блока с результатом и кнопки "Скачать PNG"
const form = document.getElementById('triangleForm');
const resultPre = document.getElementById('result');
const downloadBtn = document.getElementById('downloadBtn');

// Обработка отправки формы (построение треугольника)
form.addEventListener('submit', async function (e) {
    e.preventDefault(); // Предотвращаем стандартную отправку формы (перезагрузку страницы)

    const number = document.getElementById('numberInput').value; // Получаем значение из input

    // Отправляем POST-запрос на triangle.php с числом
    const response = await fetch('triangle.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'n=' + encodeURIComponent(number), // Кодируем данные формы
    });

    // Получаем ответ в виде текста (треугольник или сообщение об ошибке)
    const text = await response.text();

    resultPre.textContent = text; // Показываем результат в <pre>

    // Показываем или скрываем кнопку "Скачать PNG" в зависимости от наличия текста
    downloadBtn.classList.toggle('hidden', !text.trim());
});

// Обработка клика по кнопке "Скачать PNG"
downloadBtn.addEventListener('click', function () {
    const lines = resultPre.textContent.split('\n'); // Разбиваем текст на строки

    // Создаём canvas — элемент для рисования
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d'); // Получаем 2D-контекст для рисования

    // Настройки текста
    const fontSize = 16; // Размер шрифта в пикселях
    const lineHeight = fontSize * 1.2; // Высота строки
    const padding = 20; // Отступы вокруг текста

    // Вычисляем максимальную длину строки и размеры canvas
    const maxLineLength = Math.max(...lines.map(line => line.length)); // Самая длинная строка (в символах)
    canvas.width = Math.ceil(maxLineLength * fontSize * 0.6 + padding * 2); // Ширина холста
    canvas.height = Math.ceil(lines.length * lineHeight + padding * 2); // Высота холста

    // Заливаем фон белым цветом
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Настраиваем шрифт и цвет текста
    ctx.font = `${fontSize}px monospace`; // Моноширинный шрифт
    ctx.fillStyle = '#000000'; // Чёрный цвет текста
    ctx.textBaseline = 'top'; // Выравнивание текста по верхнему краю строки

    // Рисуем каждую строку текста на canvas
    lines.forEach((line, i) => {
        ctx.fillText(line, padding, padding + i * lineHeight); // x = padding, y = padding + i * lineHeight
    });

    // Создаём временную ссылку и эмулируем нажатие для скачивания PNG
    const link = document.createElement('a');
    link.download = 'triangle.png'; // Имя файла при сохранении
    link.href = canvas.toDataURL('image/png'); // Получаем PNG в виде data URI
    link.click(); // Автоматически нажимаем на ссылку
});

window.triangle = function(n) {
    if (!Number.isInteger(n) || n < 1) {
        console.error('Введите положительное целое число.');
        return;
    }

    const k = Math.floor(Math.sqrt(n));
    if (k * k !== n) {
        console.error('Невозможно построить треугольник: число не является полным квадратом.');
        return;
    }

    // Генерация строк треугольника
    const triangle = [];
    let current = 1;

    for (let row = 0; row < k; row++) {
        const length = 2 * row + 1;
        const line = [];
        for (let i = 0; i < length; i++) {
            line.push(current++);
        }
        triangle.push(line);
    }

    // Найдём ширину ячейки (по самому большому числу)
    const maxNumber = n;
    const cellWidth = String(maxNumber).length;

    // Форматируем строки и центрируем
    const formatted = triangle.map(row => {
        const paddedNumbers = row.map(num =>
            String(num).padStart(cellWidth, ' ')
        );
        return paddedNumbers.join(' ');
    });

    const maxLineLength = Math.max(...formatted.map(line => line.length));

    const centered = formatted.map(line => {
        const padding = Math.floor((maxLineLength - line.length) / 2);
        return ' '.repeat(padding) + line;
    });

    // Выводим в консоль
    console.clear();
    centered.forEach(line => console.log(line));
};
