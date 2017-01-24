var CDP = {
    init: function() {
        intro.init();
        hovers.init();
    }
};
$(function() {
    CDP.init()
});

var hovers = {


    sideHover: function(){
        var $anchors = $("h3.project__title a");

        $anchors.hover(function(e){
            console.log("hoverrr", this);
            var projName =  $(this).data("proj");
            // hide all items
            $(".items_view").hide();

            if(projName === "espn"){
                $(".right_project .projects_view").hide();
            }else{
                 $(".left_project .projects_view").hide();
            }
            
            
            $(".items_view."+projName).show();
        }, function(){});
    },

    resetProjs: function(){
        $(".items_view").hide();
        $(".projects_view").show();
    },

    projectHover: function(){

        var $tags = $(".content__tag-wrapper");
        $tags.hover( 
            function(e){
                hovers.resetProjs();
                var projType = $(this).data("type");
                var showClass = projType.replace("content__tag-wrapper content--", "");
                //hide all arrows, show for this one
                $(".content__arrow").hide();
                $(this).find(".content__arrow").show();

                //hide the content, except this one
                $(".block--bottom .content__inner").hide();
                $(".block--bottom .content__inner."+projType).show();

                
            },
            function(){

            }
        )
    },
    init: function(){
        hovers.projectHover();
        //hovers.sideHover();
        $(".block--mid").hover(function(){
                hovers.resetProjs();
            },
             function(){}
        )
    }
};
var intro = {


    getElements: function() {
        $blockTop = $(".block--top"),
        $blockTopBackground = $blockTop.find(".block__bgi"),
        $blockTopCtaWrapper = $blockTop.find(".block__cta"),
        $blockTopCta = $blockTop.find(".block__cta a"),
        blockLeftCtaWidth = $blockTopCta.width(),
        $blockTopTitle = $blockTop.find(".block__title:eq(0) span"),
        $blockTopSocialIcon = $blockTop.find(".block__social__link"),
        $blockTopSub = $blockTop.find(".block__title:eq(1) span"),
        $blockMid = $(".block--mid"),
        $blockBot = $(".block--bottom")
        $content = $(".content")
    },
    setElements: function() {
        TweenMax.set($blockTop, {
            xPercent: -100
        }),
        TweenMax.set($blockTopBackground, {
            xPercent: 90
        }),
        TweenMax.set($blockTopCta, {
            x: 2 * -blockLeftCtaWidth
        }),
        TweenMax.set($blockTopTitle, {
            xPercent: -100,
            autoAlpha: 0
        }),
        TweenMax.set($blockTopSub, {
            xPercent: -100,
            autoAlpha: 0
        }),
        TweenMax.set($blockTopSocialIcon, {
            autoAlpha: 0
        }),
        TweenMax.set($content, {
            y: 5,
            autoAlpha: 0
        })
        TweenMax.set($blockBot, {
            y: 10,
            autoAlpha: 0
        })
    },
    slideIn: function() {
        console.log($blockBot);
        var a = new TimelineMax;
        a.to($blockTop, .1, {
            autoAlpha: 1
        }).to($blockTop, 1.2, {
            xPercent: 0,
            ease: Power4.easeInOut
        }).to($blockTopBackground, 0, {
            autoAlpha: 1
        }, "-= 1.2").to($blockTopBackground, 1.2, {
            autoAlpha: 1,
            xPercent: 0,
            ease: Power4.easeInOut
        }, "-= 1.2").to($blockTopTitle, .7, {
            xPercent: 0,
            autoAlpha: 1,
            ease: Power4.easeInOut,
            delay: .5
        }, "-= 1.2").to($blockTopSub, .7, {
            xPercent: 0,
            autoAlpha: 1,
            ease: Power4.easeInOut,
            delay: .55
        }, "-= 1.15").to($blockTopCta, .7, {
            x: 0,
            ease: Power4.easeInOut,
            autoAlpha: 1,
            delay: .55,
            onCompleteScope: $blockTopCta,
            onComplete: intro.setEndState
        }, "-= 1.1").staggerTo($blockTopSocialIcon, .3, {
            autoAlpha: 1
        }, .05, "-= 0.1").staggerTo($content, .35, {
            y: 0,
            autoAlpha: 1,
        }, .1, "-= 0.05").staggerTo($blockBot, .35, {
            y: 0,
            autoAlpha: 1,
            ease: Sine.easeOut
        }, .1, "-= 0.05")

        intro.afterSlideIn();
    },
    afterSlideIn: function(){
       $(".content__inner.who").show();
        $(".content--who .content__arrow").show(); 

    },
    setEndState: function() {
        TweenMax.set($blockTopCtaWrapper, {
            css: {
                overflow: "visible"
            }
        })
    },


    init: function() {
        intro.getElements(),
        intro.setElements(),
        intro.slideIn()
        
    }
};


