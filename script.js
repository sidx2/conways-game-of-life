const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerHeight;
canvas.height = window.innerHeight;

let currentState = []
const SIZE = 25

for (let i = 0; i < SIZE; i++) {
    let a = []
    for (let j = 0; j < SIZE; j++) a.push(Math.round(Math.random()));
    currentState.push(a);
}

const isAlive = (state, i, j) => {
    return state[(i + SIZE) % SIZE][(j + SIZE) % SIZE];
}

const computeNextState = (state) => {
    let ns = [];

    const dirs = [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, -1],
        [0, 1],
        [1, -1],
        [1, 0],
        [1, 1]
    ];

    for (let i = 0; i < SIZE; i++) {
        let x = [];
        for (let j = 0; j < SIZE; j++) {
            let neighbours = 0;
            for (let d of dirs) neighbours += isAlive(state, i + d[0], j + d[1]);

            if ((state[i][j] == 1) && (neighbours < 2 || neighbours > 3)) x.push(0);
            else if ((state[i][j] == 0) && (neighbours == 3)) x.push(1);
            else x.push(state[i][j]);
        }
        ns.push(x);
    }

    return ns;
}

const w = canvas.height / SIZE;
const h = canvas.height / SIZE;

const block = (x, y, w, h, fs) => {
    ctx.fillStyle = fs;
    ctx.fillRect(x, y, w, h);
    ctx.fill();
}

const draw = (state) => {
    for (let i = 0; i < SIZE; i++)
        for (let j = 0; j < SIZE; j++)
            block(i * w, j * h, h, h, state[i][j] == 1 ? "white" : "black");
}

let deltaTime = 0;
const loop = () => {
    draw(currentState);
    if (++deltaTime % 10 == 0) currentState = computeNextState(currentState);

    window.requestAnimationFrame(loop);
}

loop();