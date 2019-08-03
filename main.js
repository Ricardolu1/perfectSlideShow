let $buttons = $("#buttonsWrapper>button")
let $slides = $("#slides")
let $images = $("#slides>img")
let current = 0
makeFakeSlides()
bindEvents()

function bindEvents() {
  $("#buttonsWrapper").on("click", "button", function(e) {
    let $button = $(e.currentTarget)
    let index = $button.index()
    goToSlide(index)
  })
}
//重要，一旦我们拥有了直接到达某个slide的能力们就可以做左右轮播了
function goToSlide(index) {
  let len = $buttons.length
  if (current === len - 1 && index === 0) {
    //说明是最后一个到第一个
    $slides
      .css({ transform: `translateX(${-(len + 1) * 400}px)` })
      .one("transitionend", function() {
        $slides.hide().offset()
        $slides.css({ transform: `translateX(-400px)` }).show()
      })
    current = index
  } else if (current === 0 && index === $buttons.length - 1) {
    //第一个到最后一个
    $slides
      .css({ transform: `translateX(0px)` })
      .one("transitionend", function() {
        $slides.hide().offset()
        $slides.css({ transform: `translateX(${-len * 400}px)` }).show()
      })
  } else {
    $slides.css({ transform: `translateX(${-(index + 1) * 400}px)` })
    current = index
  }
}















//   $buttons.eq(0).on('click',function() {
//     if (current===2) {
//       console.log('说明你是从最后一张到第一张')
//       $slides.css({transform:'translateX(-1600px)'})
//       .one('transitionend',function() {
//         $slides.hide()
//           .offset()
//         $slides.css({transform:'translateX(-400px)'})
//           .show()
//       })
//     }else{
//       $slides.css({transform:'translateX(-400px)'})
//     }
//     current=0
//   })

//   $buttons.eq(1).on('click',function() {
//     console.log(current)
//     $slides.css({transform:'translateX(-800px)'})
//     current=1
//   })

//   $buttons.eq(2).on('click',function() {
//     if (current===0) {
//       console.log('说明你是从第一张到最后一张')
//       $slides.css({transform:'translateX(0px)'})
//       .one('transitionend',function() {
//         $slides.hide()
//           .offset()
//         $slides.css({transform:'translateX(-1200px)'})
//           .show()
//       })
//     }else{
//       $slides.css({transform:'translateX(-1200px)'})
//     }
//     current=2
//   })
//

function makeFakeSlides() {
  let $firstFake = $images.eq($images.length - 1).clone(true)
  let $lastFake = $images.eq(0).clone(true)

  $slides.append($lastFake) //append要用在父元素里面
  $slides.prepend($firstFake)
}
