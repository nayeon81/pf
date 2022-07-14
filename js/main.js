$(function(){
    var decoLeft=0;
    var menuWidth=0;

    var laptopsInner = document.querySelectorAll('div.laptop-inner');

    for (const laptopInner of laptopsInner) {
        laptopInner.addEventListener('mouseover', (e) => {
            var imageHeight = e.target.offsetHeight;
            var laptopHeight = e.currentTarget.offsetHeight;
            var scrollHeight = imageHeight-laptopHeight;
            console.log(`${imageHeight} | ${laptopHeight} | ${scrollHeight}`);  
            e.target.style.transform = "translate3d(0, -"+scrollHeight+"px, 0)";
        });
        laptopInner.addEventListener('mouseout', (e) => {
            e.target.style.transform = "translate3d(0, 0, 0)";
        });
        
    }
    //fullpage
    $('#fullpage').fullpage({
        //options here
        navigation: true,
        anchors:['HOME','PROFILE','WEB','','','','DESIGN','CONTACT'],
        navigationPosition: 'right',
        navigationTooltips: ['HOME', 'PROFILE','WEB1','WEB2','WEB3','WEB4','DESIGN','CONTACT'],
        afterLoad:function(origin,index){
            if(index==2){
                skillfn();
            }else{
                skillfn2();
            }
        }
    });

    //윈도우의 가로길이를 win_width변수에 저장
    var win_width=$(window).width();
    //만약 win_width값이 1024이상이면 
    if(win_width>=1024){
        // pc버전
        $('nav').hover(function(){
            $('.deco').addClass('active');
        },
        function(){
            $('.deco').removeClass('active');
        });
    
        $('nav ul li a').hover(function(){
            decoLeft=$(this).position().left;
            menuWidth=$(this).width()/2;
            var result=decoLeft+menuWidth;
            $('.deco').css('left',result);
        });        

            
    //모바일 버전
    }else{
        $('.menu_icon').click(function(){
            $('nav').animate({
                right:0
            });
        });
        $('.close_btn').click(function(){
            $('nav').animate({
                right:'-100%'
            });
        });
        $('nav ul li a').click(function(){
            $('nav').animate({
                right:'-100%'
            },100);
        }); 
    }
   
    // 팝업
    var img_num=0;
    var img_total=$('.tab div').lenght;
    $('.popup').hide();
    $('.tab div').click(function(e){
        e.preventDefault();
        //클릭한 이미지의 인덱스 번호를 img_num에 저장
        img_num=$(this).index();
        //클릭한 이미지의 a 태그의 href 속성을 img_attr변수에 저장
        var img_attr=$(this).find('a').attr('href');
        var img_addr='<img src="'+img_attr+'">'
        $('.graphic').empty();
        $('.graphic').append(img_addr);
        $('.popup').show();
        $('html, body').css('overflow-y','hidden');

        
	
    });
    $('.popup .close').click(function(e){
        e.preventDefault();
        $('.popup').hide();
        $('html, body').css('overflow-y','visible');
    });


    
   
    $('button').click(function(e){
        e.stopPropagation();
    });

    // 컨텍 창
    $('.trigger').on('click', function() {
        $('.modal-wrapper').toggleClass('open');
        $('.page-wrapper').toggleClass('blur-it');
        return false;
    });
   

    //header
    function minimize_header() { 
        var $window = $(window); 
        var $header = $('header'); 
        var did_scroll = null;
        var current_scroll = 0; 
        var last_scroll = 0; 
        var move_scroll = 10; 
        $window.on('scroll', function() { 
            did_scroll = true; 
            if ($window.scrollTop() > $header.height()) { 
                $header.addClass('minimize'); 
            } else { 
                $header.removeClass('minimize'); 
            } 
        }); 
        setInterval(function() { 
            if (did_scroll && !$('body').hasClass('open-menu')) { 
                has_scrolled(); did_scroll = false; 
            } 
        }, 50); 
        function has_scrolled(){ 
            current_scroll = $(this).scrollTop(); 
            // Make sure they scroll more than move_scroll
        if(Math.abs(last_scroll - current_scroll) <= move_scroll) return;

        if(current_scroll > last_scroll){ // ScrollDown
            if(current_scroll > $(window).height()){
                gsap.to( $header, 0.4, { autoAlpha:0, y: -$header.outerHeight(), ease: Power3.easeOut });
            }
        }
        else { // ScrollUp
            gsap.to( $header, 0.4, { autoAlpha:1, y: 0, ease: Power3.easeOut });
        }

        last_scroll = current_scroll;
        }
    }

    minimize_header();

    //홈페이지 화면을 클릭할 때마다 다른 아이콘 나옴
    var arr=[
        'img/click1.png',
        'img/click2.png',
        'img/click3.png',
        'img/click4.png',
        'img/click5.png',
        'img/click6.png'

    ];
    var ran=0;
    var mouseX=0;
    var mouseY=0;
    $('body').on('click',function(e){
        mouseX=e.pageX;
        mouseY=e.pageY;
        ran=Math.floor(Math.random()*arr.length);
        $('#icon').empty();
        $('#icon').append('<img src="'+arr[ran]+'">');
        $('#icon').css({'left':mouseX+10,'top':mouseY+10});
        gsap.from('#icon img',0.3, {
            width:'70%',
            height:'70%',
            opacity:0,
            rotation:30,
            transforOrigin:'center'
        });
        gsap.to('#icon img',0.3, {
            width:'100%',
            height:'100%',
            opacity:1,
            rotation:-30,
            ease:Back.easeOut,
            transforOrigin:'center',
            onComplete:onCom
        });
        function onCom(){
            gsap.to('#icon img',1, {
                width:'70%',
                height:'70%',
                opacity:0,
                rotation:-30,
                delay:0.2,
                transforOrigin:'center'
            });
        }
    });
    $('button').click(function(e){
        e.stopPropagation();
    });
    var _old = jQuery.Event.prototype.stopPropagation;

    jQuery.Event.prototype.stopPropagation = function() {
        this.target.nodeName !== 'SPAN' && _old.apply( this, arguments );
    };
    
   //skillbar
	function skillfn(){
        jQuery('.skillbar').each(function(){
            jQuery(this).find('.skillbar-bar').animate({
                width:jQuery(this).attr('data-percent')
            },1000);
        });      
    }
    function skillfn2(){
        jQuery('.skillbar').each(function(){
            jQuery(this).find('.skillbar-bar').animate({
                width:0
            },1000);
        });      
    }


    jQuery('.Count').each(function () {
    var $this = $(this);
    jQuery({ Counter: 0 }).animate({ Counter: $this.text() }, {
            duration: 6000,
            easing: 'swing',
            step: function () {
            $this.text(Math.ceil(this.Counter));
            }
        });
 
    });
}); 