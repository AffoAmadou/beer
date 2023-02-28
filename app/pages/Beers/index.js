import Page from "classes/Page";

export default class Home extends Page {

    constructor() {
        super({
            id: 'beers',
            element: '.beers',
            elements: {
                navigation: document.querySelector('.navigation'),
                links: '.beers__gallery__link',
                name: '.beers__name',
                description: '.beers__description',
                // wrapper:'.home__wrapper'

            }
        })
    }

    create() {
        super.create()

        // this.elements.links[0].addEventListener('click', _ => console.log('OH YOU CLICKED'))
    }
}