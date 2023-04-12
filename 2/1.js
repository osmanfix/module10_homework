const btn = document.querySelector('.btn');

const heip = window.screen.width;
//console.log(heip);
const whit = window.screen.height;
//console.log(whit);

btn.addEventListener('click', () => {
window.alert( `Разрешение вашего монитора : ширина: ${heip}, высота: ${whit}` );
});
