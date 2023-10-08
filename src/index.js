import {getLocation, doFetch} from './modules/apis.js';
import {renderDom, clearDom, toggleTemp} from './modules/dom.js';

window.addEventListener('load',async() =>{
    let Loc = await getLocation();
    await doFetch(Loc);
    renderDom();
});

const search = document.querySelector('.search-btn');
const input = document.querySelector('.input-txt');
const ToggleDegree = document.querySelector('#toggle-degree');

search.addEventListener('click',(e) => {
    e.preventDefault();
    if(input.value != ''){
        doFetch(input.value).then(() => {
            clearDom();
            renderDom();
        });
    }
});

ToggleDegree.addEventListener('click', () => {
    toggleTemp();
    if(ToggleDegree.innerHTML == 'to F<sup>o</sup>'){
        ToggleDegree.innerHTML = 'to C<sup>o</sup>';
    }
    else {
        ToggleDegree.innerHTML = 'to F<sup>o</sup>';
    }
})


