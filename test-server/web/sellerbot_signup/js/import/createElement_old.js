export default function createElement(type, attributes) {
	if (type == 'toggle') {
		let div = createElement('div', { class: 'toggleDiv' });
		let input = createElement('input', {
			class: 'toggle',
			id: attributes['id'],
			type: 'checkbox',
		});
		let label = createElement('label', {
			for: attributes['id'],
			class: 'check-trail',
		});
		let span = createElement('span', {
			class: 'check-handler',
		});
		label.append(span);
		div.append(input, label);
		return div;
	} else if (type == 'checkbox') {
		let div = createElement('div', { class: 'checkBoxDiv' });
		let input = createElement('input', {
			class: 'chkBox',
			id: attributes['id'],
			type: 'checkbox',
		});
		let label = createElement('label', {
			for: attributes['id'],
			class: 'checkBox',
		});
		div.append(input, label);
		if (attributes['html']) {
			let span = createElement('span', {
				html: attributes['html'],
			});
			div.append(span);
		}
		return div;
	} else {
		var element = document.createElement(type);
		for (var key in attributes) {
			if (key == 'class') {
				element.className = attributes[key];
			} else if (key == 'data') {
				for (var dataKey in attributes[key]) {
					element.setAttribute(`data-${dataKey}`, attributes[key][dataKey]);
				}
			} else if (key == 'html') {
				element.innerHTML = attributes[key];
			} else if (key == 'for') {
				element.htmlFor = attributes[key];
			} else {
				// element[key] = attributes[key];
				element.setAttribute(key, attributes[key]);
			}
		}
		return element;
	}
}
