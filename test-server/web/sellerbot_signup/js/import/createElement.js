/**
 * Creates an element with the given tag and properties
 * @param {string} tag - The tag name of the element
 * @param {Properties} [props={}] - The properties of the element
 * @returns {HTMLElement} - The newly created element
 */
// |이 코드는 createElement라는 함수를 정의하는 코드입니다. 이 함수는 HTML 요소를 생성하는 역할을 합니다.
// |
// |좋은 점:
// |- 함수 내부에서는 조건문을 사용하여 'toggle'과 'checkbox' 태그에 대한 처리를 따로 구현하고 있습니다. 이를 통해 코드의 가독성과 유지보수성이 높아집니다.
// |- 함수 내부에서는 for...in 반복문을 사용하여 객체의 속성을 순회하고 있습니다. 이를 통해 코드의 재사용성이 높아집니다.
// |
// |나쁜 점:
// |- 함수 내부에서는 createElement 함수를 재귀적으로 호출하고 있습니다. 이는 함수 호출 스택을 쌓아 메모리를 많이 사용할 수 있습니다. 또한, 재귀 호출이 깊어질 경우 브라우저가 더 이상 처리하지 못하고 멈출 수 있습니다. 따라서, 이를 개선하기 위해 반복문을 사용하는 것이 좋습니다.
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
				let styleText = '';
				for (let css in properties[prop]) {
					let key = css;
					let val = properties[prop][css];
					styleText += `${key}:${val};`;
				}
				element[prop] = styleText;
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
//       background-color: 'lightblue',
//       padding: '10px'
//     }
//   });

//   document.body.appendChild(newDiv);
