/**
 * Creates an element with the given tag and properties
 * @param {string} tag - The tag name of the element
 * @param {Properties} [props={}] - The properties of the element
 * @returns {HTMLElement} - The newly created element
 */
export default function createElement(tag, properties) {
	if (tag == 'toggle') {
		let div = createElement('div', { className: 'toggleSwitch' });
		let input = createElement('input', {
			className: 'toggle',
			id: properties['id'],
			type: 'checkbox',
		});
		let label = createElement('label', {
			htmlFor: properties['id'],
			className: 'check-trail',
		});
		let span = createElement('span', {
			className: 'check-handler',
		});
		label.append(span);
		div.append(input, label);
		return div;
	} else if (tag == 'checkbox') {
		let div = createElement('div', { className: 'checkBoxDiv' });
		let input = createElement('input', {
			className: 'chkBox',
			id: properties['id'],
			type: 'checkbox',
		});
		let label = createElement('label', {
			htmlFor: properties['id'],
			className: 'checkBox',
		});
		div.append(input, label);
		if (properties['innerHTML']) {
			let label = createElement('label', {
				className: 'text',
				innerHTML: properties['innerHTML'],
				htmlFor: properties['id'],
			});
			div.append(label);
		}
		return div;
	} else {
		let element = document.createElement(tag);
		for (let prop in properties) {
			if (prop == 'style') {
				for (let css in properties[prop]) {
					let key = css;
					let val = properties[prop][css];
					console.log(css);
					console.log();
				}
			} else {
				element[prop] = properties[prop];
			}
		}
		return element;
	}
}

// 예시
//   let newDiv = createElement('div', {
//     innerHTML: 'Hello World!',
//     className: 'greeting',
//     style: {
//       backgroundColor: 'lightblue',
//       padding: '10px'
//     }
//   });

//   document.body.appendChild(newDiv);
