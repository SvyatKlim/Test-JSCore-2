$(function () {
    const colorArr = [
        '#0ba899', '#0a8f83', '#1fb66c', '#1b9b5e',
        '#2891e0', '#207ab9', '#9b64b5',
        '#9051ad', '#31485e', '#283d4f', '#f5bd05',
        '#f89b0a', '#ed821b', '#db5c00', '#f25a38',
        '#c84525', '#eaeeef', '#bbc1c4', '#90a2a2',
        '#7c8a8b', '#000000'
    ];
    const imagesArr = [
        'url("https://images3.alphacoders.com/823/thumb-1920-82317.jpg")',
        'url("https://wallpapershome.ru/images/wallpapers/poligon-2560x1440-4k-hd-cvetnoy-zeleniy-fon-225.jpg")',
        'url("https://wallpapercave.com/wp/wp2555730.jpg")',
        'url("https://image.winudf.com/v2/image/Y29tLkFtZXJpY2FuRm94LmFwcDAwNDJfc2NyZWVuc2hvdHNfMTFfYzQ4NWMyNjA/screen-10.jpg?fakeurl=1&type=.jpg")',
        'url("https://wallpapercave.com/wp/wp2570965.jpg")',
        'url("https://wallpapershome.ru/images/wallpapers/lug-3840x2160-4k-hd-pole-rastenie-fon-448.jpg")',
        'url("https://img.wallpapersafari.com/desktop/1600/900/65/80/qdrPKB.jpg")',
        'url("https://lh5.googleusercontent.com/proxy/ECSSKokz-rFnvoJXqProij45tUt65D8rCCOVBuFBUbKM2rVyYSvMYPVrGepTI0RDG03CuGBmHcw0hx_r9JjNrhZvc6xQF_U0ttLywShu49BY0UtRMKusB96FzrJva94mBe9eNFj3RunBVDZDvQBdOrT0QkQ")',
        'url("https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTZB6d-Jwm2DY9d_W9B7f4qwEIoMQizq4Vnd3bBEZsQ0g0SQ5mM&usqp=CAU")',
    ];


    let area = $('.monitor');

    // Поп-Ап
    function popup(item) {
        $('.popup').addClass('visible');
        item.slideDown(400, function () {
            item.addClass('active');
        });
        getColor('.popup_color-box>div')
    }

    // Функція закриття поп-апу
    function close(item) {
        item.slideUp(400, function () {
        });
        setTimeout(function () {
            $('.popup').removeClass('visible');
        }, 400)
    }

    // Присвоєння кольору
    function getColor(container) {
        $(container).each(function (index, item) {
            $(item).css({
                backgroundColor: colorArr[index]
            });
            $(item).click(function (ev) {
                area.css({
                    color: $(item).css('backgroundColor')
                })
            })
        });

    }

    function getBGColor(container) {
        $(container).each(function (index, item) {
            $(item).css({
                backgroundColor: colorArr[index]
            });
            $(item).click(function (ev) {
                console.log((item))
                area.css({
                    backgroundColor: $(item).css('backgroundColor')
                })
                if (area.css('backgroundImage')) {
                    area.css({backgroundImage: 'none'})
                    console.log(area.css)
                }
            })
        });
    }

    function imageBG() {
        $('.bg_img  > div').each(function (index, item) {
            $(item).css({
                backgroundImage: imagesArr[index]
            });
            $(item).click(function (ev) {
                area.css({
                    backgroundImage: $(item).css('backgroundImage')
                })
            })
        });
    }

    function fileBG() {
        $('#file').change(function () {
            let file = this.files[0];
            let reader = new FileReader();
            console.log(file, reader)
            reader.onloadend = function () {
                $(area).css('background', 'url("' + reader.result + '")');
            }
            if (file) {
                reader.readAsDataURL(file);
            } else {
            }
        })
    }

    // Функція закриття на клік по document
    const closeOnClickOutside = (e, container, openBtn) => {
        if (!$(container).is(e.target) // if the target of the click isn't the container.
            && $(container).find(e.target).length < 1 // container doesn't contain target
            && !$(e.target).is(openBtn) //target isn't open button
            && $(openBtn).find(e.target).length < 1) { //open button doesn't contain clicked element
            $(container).removeClass('active');
        }
    };
    // Відкриття DropDown та вішання значення списку на елемент
    const openDropdown = (dropdown, li) => {
        let activeDrop = $('.dropdown.active');
        if (activeDrop.length > 0 && activeDrop !== $(dropdown)) {
            activeDrop.removeClass('active')
        }
        $(dropdown).toggleClass('active')
        $(li).click(function (ev) {
            let text = $(this).text(), size = $(this).text();
            area.css({fontFamily: `${text}`})
            area.css({fontSize: `${size}`})
        })
    };
    const openTab = (tab, btn) => {
        $('.bg_item').each(function (index, el) {
            if ($(el).has(tab)) {
                $(el).removeClass('active');
                $(tab).addClass('active');
            }
        })
        $('.nav-link').each(function (index, el) {
            if ($(el).has(btn)) {
                $(el).removeClass('activeTab');
                $(btn).addClass('activeTab');
            }
        })
    }

    const validation = () => {
        let login = $('#login'),
            password = $('#pass');
        let checkLogin = /^[a-zA-z]{1,5}$/.test(login.val());
        let checkPassword = /^\w{1,5}$/.test(password.val());

        if (checkLogin && checkPassword) {
            login.removeClass('error')
            password.removeClass('error')
            $('.error_empty').removeClass('active')
            $('.error_login').removeClass('active')
            $('.lock > i').removeClass('fa-lock');
            $('.lock > i').addClass('fa-unlock');
            $('.lock').addClass('hidden')
            $('.unlock').addClass('active')
            close($('.popup_login'))
            $('.code').prop("disabled", false)
        } else if (login.val() === '' && password.val() === '') {
            login.addClass('error')
            password.addClass('error')
            $('.error_login').removeClass('active')
            $('.error_empty').addClass('active')
        } else if (checkLogin === false && checkPassword === false) {
            login.addClass('error')
            password.addClass('error')
            $('.error_empty').removeClass('active')
            $('.error_login').addClass('active')
        } else if (checkLogin === false) {
            login.addClass('error')
            $('.error_empty').removeClass('active')
            $('.error_login').addClass('active')
        } else if (checkPassword === false) {
            password.addClass('error')
            $('.error_empty').removeClass('active')
            $('.error_login').addClass('active')
        }
    };

    function tableCreate() {
        let countTr = $('#countTR').val(),
            countTd = $('#countTD').val(),
            widthTd = $('#widthTD').val(),
            heightTd = $('#heightTD').val(),
            borderStyle = $('#styleB').val(),
            borderColor = $('#colorB').val(),
            borderWidth = $('#widthBorder').val(),
            currentVal = $('textarea').val();
        let table = `<table border="1" style="overflow: auto ; border-collapse: collapse"> <tbody class="tbody">`
        for (let i = 1; i <= countTr; i++) {
            table += `<tr>`;
            for (let j = 1; j <= countTd; j++) {
                table += `<td  style="border-width: ${borderWidth}px; border: ${borderStyle}; width:${widthTd}px; height:${heightTd}px; border-color: ${borderColor};">TD</td>`
            }
            table += `</tr>`;
        }
        table += `</tbody></table>`;
        let newVal = table;
        $('#textarea').val(newVal)

    }

    function createList(list, li, mark) {
        let countLi = $(li).val(),
            markLi = $(mark).val();
        let typeList = `<${list} style="list-style:${markLi}">`,
            currentVal = $('textarea').val();
        console.log(markLi)
        for (let i = 1; i <= countLi; i++) {
            typeList += `<li> item ${i}`;
            typeList += `</li>`;
        }
        typeList += `</${list}>`
        $('#textarea').val(currentVal + typeList)
    }

    // На клік по main видаляє активний клас в dropdown
    $(document).click(function (e) {
        closeOnClickOutside(e, '.dropdown_ffamily', '.text_options');
        closeOnClickOutside(e, '.dropdown_fsize', '.text_options-fsize');
    });

    // Вішаємо на кнопки вменю клік
    $('.font_style-b').click(function () {
        area.toggleClass('bold')
    });
    $('.font_style-i').click(function () {
        area.toggleClass('cursive')
    });
    $('.font_style-u').click(function () {
        area.removeClass('strikethrough')
        area.toggleClass('underline')
    });
    $('.font_style-s').click(function () {
        area.removeClass('underline')
        area.toggleClass('strikethrough')
    });
    $('.text_align-left').click(function () {
        area.removeClass('align-center', 'align-right')
        area.toggleClass('align-left')
    });
    $('.text_align-right').click(function () {
        area.removeClass('align-center', 'align-left')
        area.toggleClass('align-right')
    });
    $('.text_align-center').click(function () {
        area.removeClass('align-right', 'align-left')
        area.toggleClass('align-center')
    });
    $('.text_options-ffamily').click(function (event) {
        openDropdown('.dropdown_ffamily', '.dropdown_ffamily li');
    });
    $('.text_options-fsize').click(function () {
        openDropdown('.dropdown_fsize', '.dropdown_fsize li');
    });

    $('.text_options-color').click(function () {
        popup($('.popup_color'));
    });

    $('.text_options-bg').click(function () {
        popup($('.popup_bg'));
        if ($('.bg_colors').hasClass('active')) {
            openTab('.bg_colors', this)
            getBGColor('.bg_colors > div')
        }
    });

    $('.close').click(function () {
        close($('.popup_color'));
        close($('.popup_bg'));
        close($('.popup_login'));
        close($('.popup_grid'));
        close($('.popup_ol '));
        close($('.popup_ul '));
        $('.bg_item').removeClass('active')
        $('.bg_colors').addClass('active')
    });
    $('.nav-colors').click(function (ev) {
        ev.preventDefault();
        openTab('.bg_colors', this)
        getBGColor('.bg_colors > div')
    })
    $('.nav-img').click(function (ev) {
        ev.preventDefault();
        openTab('.bg_img', this)
        imageBG()
    })
    $('.nav-file').click(function (ev) {
        ev.preventDefault();
        openTab('.bg_files', this)
    })
    $('.file-custom').on('click', fileBG())

    $('.lock ').on('click', function () {
        popup($('.popup_login'))
    })
    $('#sign_btn').on('click', function (ev) {
        ev.preventDefault();
        validation()
        $('#login').val(''),
            $('#pass').val('');
    })
    $('.code').on('click', function () {
        $(area).addClass('hidden');
        let content = $(area).html();
        $('#textarea').html(content)
        $('.editor').addClass('active');
        $('.menu_editor').addClass('active_flex');
        $('.menu').addClass('hidden');
        console.log($('#textarea').val)
    })
    $('.btn_save').on('click', function () {
        $(area).html($('#textarea').val());
        $(area).removeClass('hidden');
        $('.editor').removeClass('active');
        $('.menu_editor').removeClass('active_flex');
        $('.menu').removeClass('hidden');
    })
    $('.btn_grid').on('click', function () {
        popup($('.popup_grid'))
    })
    $('.btn_ol').on('click', function () {
        popup($('.popup_ol'))
    })
    $('.btn_ul').on('click', function () {
        popup($('.popup_ul'))
    })
    $('.unlock').on('click', function () {
        popup($('.popup_logout'));
    })
    $('.popup_grid .createTable').on('click', function (ev) {
        ev.preventDefault();


        $('.popup_grid  input').each(function (index, el) {
            let checkInput = /^\d{1,3}$/.test($(el).val());
            if (checkInput) {
                $(el).removeClass('error');
            } else if (checkInput === false || $(el).val() === '') {
                $(el).addClass('error');
            }
        });

        let selects = $('.popup_grid  select'), validSelects = 0;


        selects.each(function (index, el) {
            if (!$(el).val()) {
                $(el).addClass('error');
            } else {
                validSelects++;
                $(el).removeClass('error')
            }
        });

        if(validSelects === selects.length){
            tableCreate();
        }
    });
    $('.resetTable').on('click', function (ev) {
        ev.preventDefault();
        $('.popup_grid  input').val('');
        let firstOption = $('option[value="-1"]').val()
        $('.popup_grid  select').val(firstOption)
        console.log($(firstOption));
    })
    $('.popup_ol .createTable').on('click', function (ev) {
        ev.preventDefault();
        $('.popup_ol  input').each(function (index, el) {
            let checkInput = /^\d{1,3}$/.test($(el).val());
            if (checkInput) {
                $(el).removeClass('error');
            } else if (checkInput === false || $(el).val() === '') {
                $(el).addClass('error');
            }
            $('.popup_ol  select').each(function (index, el) {
                if (!$(el).val()) {
                    $(el).addClass('error');
                    //     //     console.log(item)
                } else if (checkInput && $(el).val()) {
                    createList('ol', $('#countLi'), $('#typeLi'))
                } else {
                    $(el).removeClass('error')
                }
            });
        });
    })
    $('.popup_ul .createTable').on('click', function (ev) {
        ev.preventDefault();
        $('.popup_ul  input').each(function (index, el) {
            let checkInput = /^\d{1,3}$/.test($(el).val());
            if (checkInput) {
                $(el).removeClass('error');
            } else if (checkInput === false || $(el).val() === '') {
                $(el).addClass('error');
            }
            $('.popup_ul  select').each(function (index, el) {
                if (!$(el).val()) {
                    $(el).addClass('error');
                    //     //     console.log(item)
                } else if (checkInput && $(el).val()) {
                    createList('ul', $('#countUlLi'), $('#typeUlLi'))
                } else {
                    $(el).removeClass('error')
                }
            });
        });
    })
    $('.popup_ol .resetTable').on('click', function (ev) {
        ev.preventDefault();
        $('.popup_ol  input').val('');
        let firstOption = $('option[value="-1"]').val()
        $('.popup_ol  select').val(firstOption)
        console.log($(firstOption));
    })
    $('.popup_ul .resetTable').on('click', function (ev) {
        ev.preventDefault();
        $('.popup_ul  input').val('');
        let firstOption = $('option[value="-1"]').val()
        $('.popup_ul  select').val(firstOption)
        console.log($(firstOption));
    })
    $('.popup_logout').on('click', function (ev) {
        ev.preventDefault();
        close($('.popup_logout'))
    })
    $('#sign_out').on('click', function () {
        $('.lock > i').removeClass('fa-unlock');
        $('.lock > i').addClass('fa-lock');
        $('.lock').removeClass('hidden')
        $('.unlock').addClass('hidden')
        close($('.popup_login'))
        $('.code').prop("disabled", true)
    })

})


