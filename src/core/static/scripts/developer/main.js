new TypeIt('#typewriter-desc', {cursor: true, cursorChar: '|'})
.type('ls')
.exec(setTimeout(function () {
    $('#developer-items-list').fadeIn()  
}, 1000))
.go();