let $buttons = $("#buttonsWrapper>button")
let $slides = $("#slides")
let $images = $("#slides>img")
let current=0
makeFakeSlides()
bindEvents()
function bindEvents() {
  $("#buttonsWrapper").on("click", "button", function(e) {
    let $button = $(e.currentTarget)
    let index = $button.index()
    goToSlide(index)
  })
}

$(next).on('click',function() {
  goToSlide(current+1)
})

$(previous).on('click',function() {
  goToSlide(current-1)
})

let timeId=setInterval(() => {
  goToSlide(current+1)
}, 2000)

$('.window').on('mouseenter',function() {
  clearInterval(timeId)
}).on('mouseleave',function() {
  timeId=setInterval(() => {
    goToSlide(current+1)
  }, 2000)
})

$('.button-container').on('mouseenter',function() {
  clearInterval(timeId)
}).on('mouseleave',function() {
  timeId=setInterval(() => {
    goToSlide(current+1)
  }, 2000)
})
//监听是否在当前页面
document.addEventListener("visibilitychange", function () {
  if (document.hidden) {   
    clearInterval(timeId)
  }else{
    timeId=setInterval(() => {
      goToSlide(current+1)
    }, 2000)
  }
})

//重要，一旦我们拥有了直接到达某个slide的能力们就可以做上一张和下一张
function goToSlide(index) {

  let len = $buttons.length
  
  if (index>len-1) {
    index=0
  }else if(index<0){
    index=len-1
  }

  if (current === len - 1 && index === 0) {
    //说明是最后一个到第一个
    $slides
      .css({ transform: `translateX(${-(len + 1) * 400}px)` })
      .one("transitionend", function() {
        $slides.hide().offset()
        $slides.css({ transform: `translateX(-400px)` }).show()
      })
    current = index
  } else if (current === 0 && index === len - 1) {
    //第一个到最后一个
    $slides
      .css({ transform: `translateX(0px)` })
      .one("transitionend", function() {
        $slides.hide().offset()
        $slides.css({ transform: `translateX(${-len * 400}px)` }).show()
      })
    current = index
  } else {
    $slides.css({ transform: `translateX(${-(index + 1) * 400}px)` })
    current = index
  }
}


function makeFakeSlides() {
  let $firstFake = $images.eq($images.length - 1).clone(true)
  let $lastFake = $images.eq(0).clone(true)

  $slides.append($lastFake) //append要用在父元素里面
  $slides.prepend($firstFake)
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


