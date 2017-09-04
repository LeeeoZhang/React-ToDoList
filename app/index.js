import j from 'jquery'
import hello from './foo'

function component() {
	var element = j('<div></div>')

	// lodash is required for the next line to work 
	element.html('@@@')

	return element.get(0)
}

document.body.appendChild(component());