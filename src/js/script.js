window.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('.menu'),
    menuItem = document.querySelectorAll('.menu_item'),
    hamburger = document.querySelector('.hamburger');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('hamburger_active');
        menu.classList.toggle('menu_active');
    });

    menuItem.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.toggle('hamburger_active');
            menu.classList.toggle('menu_active');
        })
    })

    const links = document.querySelectorAll('[href^="#"]');
    const speed = 0.3;
    
    for (let i = 0; i < links.length; i++) {
        const link = links[i];
        
        link.addEventListener('click', function(event) {
            event.preventDefault();

            let widthTop = document.documentElement.scrollTop;
            let hash = this.hash;
            let toBlock = document.querySelector(hash).getBoundingClientRect().top;
            let start = null;

            requestAnimationFrame(step);

            function step(time) {
                if (start === null) {
                    start = time;
                }

                let progress = time - start;
                let r = (toBlock < 0 ? Math.max(widthTop - progress/speed, widthTop + toBlock) : Math.min(widthTop + progress/speed, widthTop + toBlock));
                
                document.documentElement.scrollTo(0, r);

                if (r != widthTop + toBlock) {
                    requestAnimationFrame(step);
                } else {
                    location.hash = hash;
                }
            }
        });
    };

    //! Модальне вікно
    const triggers = document.querySelectorAll('[data-popup]'); // кнопки, котрі активують модальне вікно
    const popup = document.querySelector('.popup'); // модальне вікно
    const close = document.querySelector('[data-close]'); // кнопка, котра закриває модальне вікно
    const header = document.querySelector('nav');
    const submitBtn = document.querySelector('.submit__btn');
    const inputs = document.querySelectorAll('.popup__input');

    for (let i = 0; i < triggers.length; i++) {
        const trigger = triggers[i];
        trigger.addEventListener('click', (e) => {
    
            if (e.target) {
                e.preventDefault();
            }
            btnPressed = true;
            openPopup('.popup');
        });
    };

    close.addEventListener('click', () => {
        closePopup('.popup');
    });

    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            closePopup('.popup');
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && popup.style.display == "flex") { 
            closePopup('.popup');
        }
    });

    function openPopup(selector) {
        const scroll = calcScroll();

        document.querySelector(selector).style.display = "flex";
        document.body.style.overflow = "hidden";
        document.body.style.paddingRight = `${scroll}px`;
        header.style.paddingRight = `${scroll}px`;
    }

    function closePopup(selector) {
        document.querySelector(selector).style.display = "none";
        document.body.style.overflow = "";
        document.body.style.paddingRight = `0px`;
        header.style.paddingRight = `0px`;
    }

    function calcScroll() {
        let div = document.createElement('div');
        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';
        document.body.appendChild(div);
        
        let scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();

        return scrollWidth;
    }

    submitBtn.addEventListener('click', function(e) {
        let goNextPopup = true;
        inputs.forEach(input => {
            if (input.value == '') {
                goNextPopup = false;
            }
        });
        if (goNextPopup) {
            e.preventDefault();
            document.querySelector('.popup__dialog').innerHTML = `
                <div class="popup__close" data-close>&times;</div>
                <div class="popup__title">Мы свяжемся с вами через несколько минут</div>
                <br>
                <button class="exit__btn btn">Спасибо!</button>
            `;
            document.querySelector('.exit__btn').addEventListener('click', () => {
                closePopup('.popup');
            });
            document.querySelector('[data-close]').addEventListener('click', () => {
                closePopup('.popup');
            });
        }
    });
})