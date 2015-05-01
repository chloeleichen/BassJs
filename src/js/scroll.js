(function(){
    'use strict';
    // forEach method

    var scroll = function(options){
        var self = {};
        self.options = options;
        var animation = null;
        var active = 0,
            NodeListEl = document.querySelectorAll('[data-scroll-index]'),
            animating = false,
            lastIndex = NodeListEl[NodeListEl.length-1].dataset.scrollIndex,
            //Last item need to be the same with window height to avoid scroll back, further fix needed, should check if scroll to bottom and distance still > 0, then return
            e = equalHeight(NodeListEl[NodeListEl.length-1]);

        var navigate = function(ndx){
            if(ndx < 0 || ndx > lastIndex) return;    
            var targetTop = document.querySelector('[data-scroll-index="'+ ndx + '"]').offsetTop + self.options.topOffset,
                distance = targetTop - window.scrollY,
                //Define speed to ensure scroll consistancy whether it's scrolling betweem two far away position or two very close position
                scrollSpeed = self.options.speed;
                //requestAnimationFrame(scrollit);
                scrollit();

            function scrollit(){      
                distance = targetTop - window.scrollY; 
                if (distance > 0){
                    animating = true;
                    window.scrollBy(0, scrollSpeed);

                    if(distance < scrollSpeed ) {
                    distance = 0;
                    window.scrollTo(0, targetTop);
                    animating = false;
                    return;
                    }      
                    requestAnimationFrame(scrollit);
                }
                if (distance < 0){
                    animating = true;
                    window.scrollBy(0, -scrollSpeed);
                    if(distance > - scrollSpeed) {
                    distance = 0;
                    window.scrollTo(0, targetTop);
                    animating = false;
                    return;
                    }
                    requestAnimationFrame(scrollit);
                } 
                if (distance == 0){
                    animating = false;     
                    return;
                } 

            };
        };
        self.doScroll = function(e){
                var target = e.target.dataset.scrollNav;
                navigate(target);
            
        };

        function watchActive(){
            var winTop = window.pageYOffset;
            //PADDING at top of the highest element
            var PADDING = 16;

            function isVisible(node){
                return (winTop + PADDING) >= node.offsetTop + self.options.topOffset &&
                (winTop + PADDING) < node.offsetTop + (self.options.topOffset) + node.offsetHeight;
               
            }
            var nodeList = [].slice.call(document.querySelectorAll("[data-scroll-index]")).filter(isVisible);
            if(nodeList.length > 0){
                var newActive = nodeList[0].dataset.scrollIndex;
                updateActive(newActive);

            }
        };

        function updateActive(ndx){
            active = ndx;
            var navItem = document.querySelectorAll('[data-scroll-nav]');
            forEach(navItem, function(key, value){
                value.classList.remove(self.options.activeClass);
            })
            document.querySelector('[data-scroll-nav= "'+ ndx +'"]').classList.add(self.options.activeClass);


        };
         /**
         * keyNavigation
         *
         * sets up keyboard navigation behavior
         */

         //problem
        var keyNavigation = function (e) {
            var key = e.which;
            if((animating == true) && (key == self.options.upKey || key == self.options.downKey)) {
                return false;
            }
            if(key == self.options.upKey && active > 0) {
                navigate(parseInt(active) - 1);
                return false;
            } else if(key == self.options.downKey && active < lastIndex) {
                //console.log(lastIndex);
                navigate(parseInt(active) + 1);
                return false;
            }
            return true;
        };

        window.onscroll = function(){
            watchActive();
        };

        window.onkeydown = function(e){
            keyNavigation(e);
            
        };

        return self;
    }
window.scroll = scroll;

})();

var s = scroll({
        upKey: 38,
        downKey: 40,
        scrollTime: 500,
        activeClass: 'bg-aqua',
        topOffset : 0,
        speed: 10,
}); 


var tar = document.querySelectorAll('[data-scroll-nav]');
forEach(tar, function(key, value){
    value.addEventListener("click", function(e){
        e.preventDefault();
        s.doScroll(e);
    })

});

