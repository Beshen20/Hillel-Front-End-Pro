const PROMPT = 'prompt';
const CONFIRM = 'confirm';
const POINT = 10;
const tasks = [{
    question: 'Сколько будет 2+2?',
    answer: '4',
    type: 'prompt',
},
{
    question: 'Солнце встает на востоке?',
    answer: true,
    type: 'confirm',
},
{
    question: 'Сколько будет 5 / 0?',
    answer: 'на ноль делить нельзя',
    type: 'prompt',
},
{
    question: 'Какого цвета небо?',
    answer: 'голубого',
    type: 'prompt',
},
{
    question: 'Как правильный ответ на главный вопрос жизни, вселенной и всего такого.',
    answer: '42',
    type: 'prompt',
},
];

function askQuestion({ type, question }) {
    switch (type) {
        case PROMPT:
            return prompt(question);
        case CONFIRM:
            return confirm(question);
        default:
            return '';
    }
}


function qiz() {
    let score = 0;
    tasks.forEach((task) => {
        if (task.answer === askQuestion(task)) {
            score += POINT
        }
    })
    alert(`Вы набрали ${score} баллов`);
}
qiz();