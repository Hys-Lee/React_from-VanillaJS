// const oldstate = [
//   { content: '첫번째', active: false },
//   { content: '2번째', active: true },
// ];
// const newState = [
//   { content: '첫번째', active: true },
//   { content: '2번째', active: true },
//   { content: '3번째', active: true },
// ];

// export const myrender = (state) => {
//   return `
//     <ul>
//         ${state
//           .map((info) => (
//             <li>
//               <input type="checkbox" checked="${info.active}" />
//               <p>${info.content}</p>
//             </li>
//           ))
//           .join('')}
//     </ul>
//   `;
// };

// const oldNode = document.createElement('div');
// oldNode.innerHTML = myrender(oldstate);

// const newNode = document.createElement('div');
// newNode.innerHTML = myrender(newState);

export function updateElement(parent, newNode, oldNode) {
  // parent랑 oldNode가 실제 document에 메달린 노드들이 됨.

  // 1. oldNode만 => 얘 제거
  if (!newNode && oldNode) {
    oldNode.remove();
    return;
  }
  // 2. newNode만 => 얘 추가
  if (newNode && !oldNode) {
    parent.appendChild(newNode);
    return;
  }
  // 3. 모두 text타입 => nodeValue보고 판단
  if (newNode instanceof Text && oldNode instanceof Text) {
    if (oldNode.nodeValue === newNode.nodeValue) return;
    oldNode.nodeValue = newNode.nodeValue;
    return;
  }

  // 4. old와 new 태그이름이 다를 경우
  if (newNode.nodeName !== oldNode.nodeName) {
    const idx = [...parent.childNodes].indexOf(oldNode);
    oldNode.remove();
    parent.insertBefore(newNode, parent.children[idx] || null);
    return;
  }

  // 5. 태그 이름은 같은 경우.=>속성 비교해야 함.
  updateAttributes(oldNode, newNode);

  // 6. 자식들에 대해 1~5과정 반복
  const newChildren = [...newNode.childNodes];
  const oldChildren = [...oldNode.childNodes];
  const maxLength = Math.max(newChildren.length, oldChildren.length);
  for (let i = 0; i < maxLength; i++) {
    updateElement(oldNode, newChildren[i], oldChildren[i]);
  }
}

function updateAttributes(oldNode, newNode) {
  const oldProps = [...oldNode.attributes];
  const newProps = [...newNode.attributes];

  for (const { name, value } of newProps) {
    if (value === oldNode.getAttribute(name)) continue;
    oldNode.setAttribute(name, value);
  }

  for (const { name, value } of oldProps) {
    if (newNode.getAttribute(name) !== undefined) continue;
    oldNode.removeAttribute(name);
  }
}
