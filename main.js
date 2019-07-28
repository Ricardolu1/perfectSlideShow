let $buttons = $("#buttonsWrapper>button")
let $slides = $("#slides")
let current
let $images=$("#slides>img")
let $firstFake=$images.eq($images.length-1).clone(true)
let $lastFake=$images.eq(0).clone(true)
$slides.append($lastFake)//append要用在父元素里面
$slides.prepend($firstFake)
var $container=$('.container')


$buttons.eq(0).on("click", function(e) {
  let index= $(e.currentTarget).index()
  let len=$buttons.length
  if (current===3&&index===0) {
    $slides.css({ transform: `translateX(${-(len+1)*400}px)` })
    .one('transitionend',function() {
      $slides.hide().offset()
      $slides.css({ transform: `translateX(${-(index+1)*400}px)` })
      .show()
    })
  }else{
    $slides.css({ transform: `translateX(${-(index+1)*400}px)` })
  }
  current =1
  n=0
})

$buttons.eq(1).on("click", function(e) {
  let index= $(e.currentTarget).index()
  $slides.css({ transform: `translateX(${-(index+1)*400}px)`})
  current =2
  n=1
})

$buttons.eq(2).on("click", function(e) {
  let index= $(e.currentTarget).index()
  if (current===1&&index===2) {
    $slides.css({ transform: 'translateX(0)' })
    .one('transitionend',function() {
      $slides.hide().offset()
      $slides.css({ transform: `translateX(${-(index+1)*400}px)` })
      .show()
    })
  }else{
    $slides.css({ transform: `translateX(${-(index+1)*400}px)` })
  }
  current =3
  n=2
})



var n=0
$buttons.eq(n%3).click()
var timer =setInterval(() => {
  n+=1
  $buttons.eq(n%3).click()
}, 1500);

document.addEventListener('visibilitychange', function(e){
  if(document.hidden){
    window.clearInterval(timer)
  }else{
    timer =setInterval(() => {
      n+=1
      $buttons.eq(n%3).click()
    }, 1500);
  }
})

$container.on('mouseenter',function() {
  window.clearInterval(timer)
})
$container.on('mouseleave',function() {
  timer =setInterval(() => {
    n+=1
    $buttons.eq(n%3).click()
  }, 1500);
})





