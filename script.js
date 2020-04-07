
const KEYBOARD = {
    
    wrapper: {
        keyboard: null,
        keyboard__keys: null,
        keys: []
    },

    eventHandlers: {
        oninput: null,
    },

    properties: {
        value: '',
        capsLock: false,
        shift: false
    },
    
    init() {
        
        const textarea = document.createElement('textarea');
        textarea.classList.add('textarea'); 

        this.wrapper.keyboard = document.createElement('div');
        this.wrapper.keyboard.classList.add('keyboard'); 

        this.wrapper.keyboard__keys = document.createElement('div');
        this.wrapper.keyboard__keys.classList.add('keyboard__keys'); 
        this.wrapper.keyboard__keys.appendChild(this.createKeys()); 

        this.wrapper.keys = this.wrapper.keyboard__keys.querySelectorAll('.key_button');
        
        const information = document.createElement('div');
        information.classList.add('info');
        information.innerHTML = '<span>Переключения на другой язык нет.<br> При нажатии физ.клавиатуры подсветки кнопки тоже нет. <br> Всё остальное есть. <br><br> Я просто не успел всё сделать :(</span>'
        
        this.wrapper.keyboard.appendChild(this.wrapper.keyboard__keys);
        document.body.appendChild(textarea);
        document.body.appendChild(this.wrapper.keyboard);
        document.body.appendChild(information);

        document.querySelectorAll('.textarea').forEach(el => {
            el.addEventListener('focus', () => {
                this.open(el.value, currentValue => {
                    el.value = currentValue;
                });
            });
        });

    },

    deleteCharacter(text, offset) {
        if (text.selectionStart === text.selectionEnd) {
          const start = Math.min(text.selectionStart, Math.max(0, text.selectionStart + offset));
          const end = Math.max(text.selectionEnd, text.selectionEnd + offset);
          text.setRangeText('', start, end, 'end');
        } else {
          text.setRangeText('', text.selectionStart, text.selectionEnd, 'end');
        }
        text.focus();
    },

    createKeys() {
        const fragment = document.createDocumentFragment();
        const keyEng = [
            '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace',
            'tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', 'delete', 
            'capsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', '\\', 'enter',
            'leftShift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'arrowUp', 'rightShift', 
            'leftCtrl', 'win', 'leftAlt', 'space', 'rightAlt', 'arrowLeft', 'arrowDown', 'arrowRight', 'rightCtrl'
        ];
       
        keyEng.forEach(key => {
            const KEY = document.createElement('button');  
            KEY.setAttribute('type', 'button');
            const createLineBreak = ["backspace", "delete", "enter", "rightShift"].includes(key) !== false;

            switch (key) {
                case 'backspace':
                    KEY.classList.add('key_button-wide');     
                    KEY.innerHTML = 'Backspace';
                    KEY.setAttribute('data', 8);
                     
                    
                    KEY.addEventListener('click', () => {
                        this.deleteCharacter(document.querySelector('.textarea'), -1);
                        this.triggerEvent('oninput'); 
                    });

                    KEY.addEventListener('mousedown', () => {
                        KEY.classList.remove('key_button-wide');
                        KEY.classList.add('key_button-wide-active');
                    });

                    KEY.addEventListener('mouseup', () => {
                        KEY.classList.remove('key_button-wide-active');
                        KEY.classList.add('key_button-wide');
                    });

                    break;

                case 'tab':    
                    KEY.innerHTML = 'Tab';
                    KEY.classList.add('key_button-func'); 
                    KEY.setAttribute('data', 9);

                    KEY.addEventListener('click', () => {
                        document.querySelector('.textarea').focus();
                        this.properties.value += '    ';
                        this.triggerEvent('oninput');
                    });

                    KEY.addEventListener('mousedown', () => {
                        KEY.classList.remove('key_button-func');
                        KEY.classList.add('key_button-func-active');
                    });

                    KEY.addEventListener('mouseup', () => {
                        KEY.classList.remove('key_button-func-active');
                        KEY.classList.add('key_button-func');
                    });

                    break;

                case 'delete':    
                    KEY.innerHTML = 'Del';
                    KEY.classList.add('key_button-func'); 
                    KEY.setAttribute('data', 46);

                    KEY.addEventListener('click', () => {
                        this.deleteCharacter(document.querySelector('.textarea'), 1);
                        this.triggerEvent('oninput'); 
                    });

                    KEY.addEventListener('mousedown', () => {
                        KEY.classList.remove('key_button-func');
                        KEY.classList.add('key_button-func-active');
                    });

                    KEY.addEventListener('mouseup', () => {
                        KEY.classList.remove('key_button-func-active');
                        KEY.classList.add('key_button-func');
                    });
                    
                    break;

                case 'capsLock':
                    KEY.classList.add('key_button-wide');
                    KEY.innerHTML = 'CapsLock';
                    KEY.setAttribute('data', 20);

                    KEY.addEventListener("click", () => {
                        this.toggleCapsLock();
                        KEY.classList.toggle("keyboard__key", this.properties.capsLock); 
                    });

                    KEY.addEventListener('mousedown', () => {
                        KEY.classList.remove('key_button-wide');
                        KEY.classList.add('key_button-wide-active');
                    });

                    KEY.addEventListener('mouseup', () => {
                        KEY.classList.remove('key_button-wide-active');
                        KEY.classList.add('key_button-wide');
                    });

                    break;
                case 'enter':
                    KEY.classList.add('key_button-wide');   
                    KEY.innerHTML = 'Enter';
                    KEY.setAttribute('data', 13);

                    KEY.addEventListener("click", () => {
                        this.properties.value += '\n';
                        this.triggerEvent('oninput');
                    });

                    KEY.addEventListener('mousedown', () => {
                        KEY.classList.remove('key_button-wide');
                        KEY.classList.add('key_button-wide-active');
                    });

                    KEY.addEventListener('mouseup', () => {
                        KEY.classList.remove('key_button-wide-active');
                        KEY.classList.add('key_button-wide');
                    });

                    break;
                case 'space':
                    KEY.classList.add('key_button-wide-spaceBar');
                    KEY.setAttribute('data', 32);   

                    KEY.addEventListener("click", () => {
                        this.properties.value += ' ';
                        this.triggerEvent('oninput');
                    });

                    KEY.addEventListener('mousedown', () => {
                        KEY.classList.remove('key_button-wide-spaceBar');
                        KEY.classList.add('key_button-wide-spaceBar-active');
                    });

                    KEY.addEventListener('mouseup', () => {
                        KEY.classList.remove('key_button-wide-spaceBar-active');
                        KEY.classList.add('key_button-wide-spaceBar');
                    });

                    break;
                case 'leftShift': 
                    KEY.classList.add('key_button-wide');   
                    KEY.innerHTML = 'Shift'; 
                    KEY.setAttribute('data', 16);

                    KEY.addEventListener('mousedown', () => {
                        KEY.classList.remove('key_button-wide');
                        KEY.classList.add('key_button-wide-active');
                    });

                    KEY.addEventListener('mouseup', () => {
                        KEY.classList.remove('key_button-wide-active');
                        KEY.classList.add('key_button-wide');
                    });

                    break;

                case 'rightShift': 
                    KEY.classList.add('key_button-wide');   
                    KEY.innerHTML = 'Shift';
                    KEY.setAttribute('data', 16); 

                    KEY.addEventListener('mousedown', () => {
                        KEY.classList.remove('key_button-wide');
                        KEY.classList.add('key_button-wide-active');
                    });

                    KEY.addEventListener('mouseup', () => {
                        KEY.classList.remove('key_button-wide-active');
                        KEY.classList.add('key_button-wide');
                    });

                    break;

                case 'leftCtrl': 
                    KEY.classList.add('key_button-func');    
                    KEY.innerHTML = 'Ctrl'; 
                    KEY.setAttribute('data', 17);

                    KEY.addEventListener('mousedown', () => {
                        KEY.classList.remove('key_button-func');
                        KEY.classList.add('key_button-func-active');
                    });

                    KEY.addEventListener('mouseup', () => {
                        KEY.classList.remove('key_button-func-active');
                        KEY.classList.add('key_button-func');
                    });

                    break;

                case 'rightCtrl': 
                    KEY.classList.add('key_button-func');   
                    KEY.innerHTML = 'Ctrl'; 
                    KEY.setAttribute('data', 17);

                    KEY.addEventListener('mousedown', () => {
                        KEY.classList.remove('key_button-func');
                        KEY.classList.add('key_button-func-active');
                    });

                    KEY.addEventListener('mouseup', () => {
                        KEY.classList.remove('key_button-func-active');
                        KEY.classList.add('key_button-func');
                    });

                    break;
                
                case 'win': 
                    KEY.classList.add('key_button-func');   
                    KEY.innerHTML = 'Win'; 
                    KEY.setAttribute('data', 91);

                    KEY.addEventListener('mousedown', () => {
                        KEY.classList.remove('key_button-func');
                        KEY.classList.add('key_button-func-active');
                    });

                    KEY.addEventListener('mouseup', () => {
                        KEY.classList.remove('key_button-func-active');
                        KEY.classList.add('key_button-func');
                    });

                    break;

                case 'leftAlt': 
                    KEY.classList.add('key_button-func');   
                    KEY.innerHTML = 'Alt'; 
                    KEY.setAttribute('data', 18);

                    KEY.addEventListener('mousedown', () => {
                        KEY.classList.remove('key_button-func');
                        KEY.classList.add('key_button-func-active');
                    });

                    KEY.addEventListener('mouseup', () => {
                        KEY.classList.remove('key_button-func-active');
                        KEY.classList.add('key_button-func');
                    });

                    break;

                case 'rightAlt': 
                    KEY.classList.add('key_button-func');   
                    KEY.innerHTML = 'Alt';
                    KEY.setAttribute('data', 18); 

                    KEY.addEventListener('mousedown', () => {
                        KEY.classList.remove('key_button-func');
                        KEY.classList.add('key_button-func-active');
                    });

                    KEY.addEventListener('mouseup', () => {
                        KEY.classList.remove('key_button-func-active');
                        KEY.classList.add('key_button-func');
                    });

                    break;

                case 'arrowUp': 
                    KEY.classList.add('key_button-func');   
                    KEY.innerHTML = ' ↑ '; 
                    KEY.setAttribute('data', 38);

                    KEY.addEventListener("click", () => {
                        this.properties.value += '↑';
                        this.triggerEvent('oninput');
                    });

                    KEY.addEventListener('mousedown', () => {
                        KEY.classList.remove('key_button-func');
                        KEY.classList.add('key_button-func-active');
                    });

                    KEY.addEventListener('mouseup', () => {
                        KEY.classList.remove('key_button-func-active');
                        KEY.classList.add('key_button-func');
                    });

                    break;

                case 'arrowLeft': 
                    KEY.classList.add('key_button-func');   
                    KEY.innerHTML = ' ← '; 
                    KEY.setAttribute('data', 37);

                    KEY.addEventListener("click", () => {
                        this.properties.value += '←';
                        this.triggerEvent('oninput');
                    });

                    KEY.addEventListener('mousedown', () => {
                        KEY.classList.remove('key_button-func');
                        KEY.classList.add('key_button-func-active');
                    });

                    KEY.addEventListener('mouseup', () => {
                        KEY.classList.remove('key_button-func-active');
                        KEY.classList.add('key_button-func');
                    });

                    break;

                case 'arrowDown': 
                    KEY.classList.add('key_button-func');   
                    KEY.innerHTML = ' ↓ '; 
                    KEY.setAttribute('data', 40);

                    KEY.addEventListener("click", () => {
                        this.properties.value += '↓';
                        this.triggerEvent('oninput');
                    });

                    KEY.addEventListener('mousedown', () => {
                        KEY.classList.remove('key_button-func');
                        KEY.classList.add('key_button-func-active');
                    });

                    KEY.addEventListener('mouseup', () => {
                        KEY.classList.remove('key_button-func-active');
                        KEY.classList.add('key_button-func');
                    });

                    break;

                case 'arrowRight': 
                    KEY.classList.add('key_button-func');   
                    KEY.innerHTML = ' → '; 
                    KEY.setAttribute('data', 39);

                    KEY.addEventListener("click", () => {
                        this.properties.value += '→';
                        this.triggerEvent('oninput');
                    });

                    KEY.addEventListener('mousedown', () => {
                        KEY.classList.remove('key_button-func');
                        KEY.classList.add('key_button-func-active');
                    });

                    KEY.addEventListener('mouseup', () => {
                        KEY.classList.remove('key_button-func-active');
                        KEY.classList.add('key_button-func');
                    });

                    break;

                default: 
                    
                    KEY.classList.add('key_button'); 
                    KEY.textContent = key.toLowerCase(); 

                    KEY.addEventListener("click", () => {
                        document.querySelector('.textarea').focus();
                        this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
                        this.triggerEvent('oninput');
                    });

                    KEY.addEventListener('mousedown', () => {
                        KEY.classList.remove('key_button');
                        KEY.classList.add('key_button-active');
                    });

                    KEY.addEventListener('mouseup', () => {
                        KEY.classList.remove('key_button-active');
                        KEY.classList.add('key_button');
                    });

                    break;
            }

            fragment.appendChild(KEY);
            if (createLineBreak) {
                fragment.appendChild(document.createElement('span'));
            }
        });  
        
        return fragment;
    },
    
    triggerEvent(handlerName) {
        if (typeof this.eventHandlers[handlerName] == "function") {
            this.eventHandlers[handlerName](this.properties.value);
        }
    },

    toggleCapsLock() {
        this.properties.capsLock = !this.properties.capsLock;

        for (let key of this.wrapper.keys) {
            key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            
        }
    },

    open(initialValue, oninput) {
        this.properties.value = initialValue || '';
        this.eventHandlers.oninput = oninput;
    },

}; 

window.onload = () => {
    KEYBOARD.init();
    document.querySelector('.textarea').focus();
};
   
