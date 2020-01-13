var buttons = $('.slide>.buttons>button')
var images = $('.slide>.window>.images')
var index = 0
var timerID

autoClickButton()
listenToButton()
listenToMouseOnWindow()
stopClickWhenDocumentHidden()

function listenToButton() {
    for (let i = 0; i < buttons.length; i++) {
        $(buttons[i]).on('click', function (xxx) {
            var index2 = $(xxx.currentTarget).index()
            var n = index2 * -300
            // 切换图片
            images.css({
                transform: 'translateX(' + n + 'px)'
            })
            // 按钮高亮
            $(buttons[index2]).addClass('red')
                .siblings().removeClass('red')
            // 更改 自动点击按钮 的 index 为 被按下按钮的 i
            index = i
        })
    }
}

function autoClickButton() {
    timerID = setInterval(() => {
        var i = index % 5
        $(buttons[i]).trigger('click')
        index++
    }, 1000)
}

function stopClickButton() {
    window.clearInterval(timerID)
}

function listenToMouseOnWindow() {
    $('.window').on('mouseenter', function () {
        stopClickButton()
    }).on('mouseleave', function () {
        autoClickButton()
    })
}

function stopClickWhenDocumentHidden() {
    $(document).on('visibilitychange', function (xxx) {
        if (document.visibilityState === "hidden") {
            stopClickButton()
        } else {
            autoClickButton()
        }
    })
}