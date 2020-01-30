var multiItemSlider = (function () {
    return function (selector, config) {
      var
        mainElement = document.querySelector(selector), // основный элемент блока
        sliderWrapper = mainElement.querySelector('.weather-day-list'), // обертка для .weather-day
        sliderItems = mainElement.querySelectorAll('.weather-day'), // элементы (.weather-day)
        sliderControls = mainElement.querySelectorAll('.weather-day-list-arrow'), // элементы управления
        sliderControlLeft = mainElement.querySelector('.arrow-left'), // стрелка влево
        sliderControlRight = mainElement.querySelector('.arrow-right'), // стрелка вправо
        sliderControlShow = 'arrow-show' //класс для отобажения стрелки
        wrapperWidth = parseFloat(getComputedStyle(sliderWrapper).width), // ширина обёртки
        itemWidth = parseFloat(getComputedStyle(sliderItems[0]).width), // ширина одного элемента    
        html = mainElement.innerHTML,
        positionLeftItem = 0, // позиция левого активного элемента
        transform = 0, // значение трансформации .weather-day-list
        step = itemWidth / wrapperWidth * 100, // величина шага (для трансформации)
        items = []; // массив элементов
      
      sliderItems.forEach(function (item, index) {
        items.push({ item: item, position: index, transform: 0 });
      });

      var position = {
        getMin: 0,
        getMax: items.length - 1,
      }

      var transformItem = function (direction) {
        if (direction === 'right') {
          if ((positionLeftItem + wrapperWidth / itemWidth - 1) >= position.getMax) {
            return;
          }
          if (!sliderControlLeft.classList.contains(sliderControlShow)) {
            sliderControlLeft.classList.add(sliderControlShow);
          }
          if (sliderControlRight.classList.contains(sliderControlShow) && (positionLeftItem + wrapperWidth / itemWidth) >= position.getMax) {
            sliderControlRight.classList.remove(sliderControlShow);
          }
          positionLeftItem++;
          transform -= step;
        }
        if (direction === 'left') {
          if (positionLeftItem <= position.getMin) {
            return;
          }
          if (!sliderControlRight.classList.contains(sliderControlShow)) {
            sliderControlRight.classList.add(sliderControlShow);
          }
          if (sliderControlLeft.classList.contains(sliderControlShow) && positionLeftItem - 1 <= position.getMin) {
            sliderControlLeft.classList.remove(sliderControlShow);
          }
          positionLeftItem--;
          transform += step;
        }
        sliderWrapper.style.transform = 'translateX(' + transform + '%)';
      }

      // обработчик события click для кнопок "назад" и "вперед"
      var controlClick = function (e) {
        if (e.target.classList.contains('weather-day-list-arrow')) {
          e.preventDefault();
          var direction = e.target.classList.contains('arrow-right') ? 'right' : 'left';
          transformItem(direction);
        }
      };

      var setUpListeners = function () {
        // добавление к кнопкам "назад" и "вперед" обработчика controlClick для событя click
        sliderControls.forEach(function (item) {
          item.addEventListener('click', controlClick);
        });
      }

      // инициализация
      setUpListeners();

      return {
        right: function () { // метод right
          transformItem('right');
        },
        left: function () { // метод left
          transformItem('left');
        }
      }
    }
  }());

  let weatherSlider = document.querySelector('.weather-slider');

  //добавляет на страницу стрелку влево для управления слайдером
  let leftArrow = makeElement('a','weather-day-list-arrow');
  leftArrow.href = '#';
  
  leftArrow.classList.add('arrow-left');
  weatherSlider.appendChild(leftArrow);
  
  //добавляет на страницу стрелку справо для управления слайдером
  let rightArrow = makeElement('a','weather-day-list-arrow');
  rightArrow.href = '#';
  
  rightArrow.classList.add('arrow-right', 'arrow-show');
  weatherSlider.appendChild(rightArrow);

  var slider = multiItemSlider('.weather-slider');