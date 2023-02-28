import Page from "classes/Page";
import t from 'components/Canvas/index.js'

export default class Home extends Page {

    constructor() {
        super({
            id: 'home',
            element: '.home',
            elements: {
                navigation: document.querySelector('.navigation'),
                blue: '.home__rect__blue',
                white: '.home__rect__white',
                green: '.home__rect__green',
                black: '.home__rect__black',
                pink: '.home__pink',
                // wrapper:'.home__wrapper'

            }
        })
        new t()
    }

    create() {
        super.create()

        // this.elements.links[0].addEventListener('click', _ => console.log('OH YOU CLICKED'))
    }
}