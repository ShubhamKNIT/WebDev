i = 1 + Math.floor(Math.random() * 6);
j = 1 + Math.floor(Math.random() * 6);

img_path_1 = `./images/dice${i}.png`
img_path_2 = `./images/dice${j}.png`

document.getElementsByTagName('img')[0].src = img_path_1;
document.getElementsByTagName('img')[1].src = img_path_2;

if (i == 6 && j == 6) {
    document.querySelector('h1').innerHTML = `It's draw 😂`;
}
else if (i == 6) {
    document.querySelector('h1').innerHTML = `Player 1 wins 🎉`;
}
else if (j == 6) {
    document.querySelector('h1').innerHTML = `Player 2 wins 🎉`;
}