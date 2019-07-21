// menu dropdown

(function($) {
    $('.dropdown-menu a.dropdown-toggle').on('click', function(e) {
        if (!$(this).next().hasClass('show')) {
            $(this).parents('.dropdown-menu').first().find('.show').removeClass('show')
        }
        var $subMenu = $(this).next('.dropdown-menu')
        $subMenu.toggleClass('show')

        $(this).parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function(e) {
            $('.dropdown-submenu .show').removeClass('show')
        })

        return false
    })
})

// end menu dropdown

//thêm số lượng sản phẩm mỗi lần click vào add-to-cart
$(document).ready(function() {
    // tạo biến ban đầu
    var counts = 0
    $('.addToCart').click(function() {
        // đánh số và tăng lên 1 đơn vị mỗi lần nhấp
        counts += +1
        $('.cart-counter').animate({
            opacity: 1
        }, 300, function() {
            // viết số lượng vào thẻ
            $(this).text(counts)
        })
    })
})

// end thêm số lượng sản phẩm mỗi lần click vào add-to-cart

//click chọn số lượng sản phẩm
$(document).ready(function() {
    $('.count').prop('disabled', true)
    $(document).on('click', '.plus', function() {
        $('.count').val(parseInt($('.count').val()) + 1)
    })
    $(document).on('click', '.minus', function() {
        $('.count').val(parseInt($('.count').val()) - 1)
        if ($('.count').val() == 0) {
            $('.count').val(1)
        }
    })
});

// lọc sản phẩm
(function(document) {
    'use strict'

    var LightTableFilter = (function(Arr) {
        var _input

        function _onInputEvent(e) {
            _input = e.target
            var tables = document.getElementsByClassName(_input.getAttribute('data-table'))
            Arr.forEach.call(tables, function(table) {
                Arr.forEach.call(table.tBodies, function(tbody) {
                    Arr.forEach.call(tbody.rows, _filter)
                })
            })
        }

        function _filter(row) {
            var text = row.textContent.toLowerCase();
            var val = _input.value.toLowerCase()
            row.style.display = text.indexOf(val) === -1 ? 'none' : 'table-row'
        }

        return {
            init: function() {
                var inputs = document.getElementsByClassName('light-table-filter')
                Arr.forEach.call(inputs, function(input) {
                    input.oninput = _onInputEvent
                })
            }
        }
    })(Array.prototype)

    document.addEventListener('readystatechange', function() {
        if (document.readyState === 'complete') {
            LightTableFilter.init()
        }
    })

})(document)
//end lọc sản phẩm
// slider
$('#myCarousel').carousel({
        interval: 3000
    })
    // range slider
    // phần tìm sản phẩm qua thao tác kéo thả thanh trượt
var sliderLeft = document.getElementById('slider0to50')
var sliderRight = document.getElementById('slider51to100')
var inputMin = document.getElementById('min')
var inputMax = document.getElementById('max')

/// cập nhật giá trị từ đầu vào sang thanh trượt
/// cập nhật chức năng nhập vào thanh trượt
function sliderLeftInput() { // update đầu vào ô bên trái
    sliderLeft.value = inputMin.value
}

function sliderRightInput() { // update đầu vào ô bên phải
    sliderRight.value = (inputMax.value) //thay đổi tối đa đầu vào được cập nhật trong thanh trượt bên phải
}

// chức năng gọi thay đổi đầu vào để cập nhật trong thanh trượt
inputMin.addEventListener('change', sliderLeftInput)
inputMax.addEventListener('change', sliderRightInput)


/// cập nhật giá trị từ thanh trượt đến đầu vào
/// các chức năng để cập nhật từ thanh trượt đến đầu vào
function inputMinSliderLeft() { // thanh trượt update giá trị đầu vào
    inputMin.value = sliderLeft.value
}

function inputMaxSliderRight() { // thanh trượt update giá trị đầu vào
    inputMax.value = sliderRight.value
}
sliderLeft.addEventListener('change', inputMinSliderLeft)
sliderRight.addEventListener('change', inputMaxSliderRight)