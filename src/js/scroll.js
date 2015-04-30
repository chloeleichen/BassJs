(function(){
    'use strict';
    // forEach method

    var scroll = function(options){
        var self = {};
        self.options = options;
        var animation = null;
        var active = 0,
            NodeListEl = document.querySelectorAll('[data-scroll-index]'),
            lastIndex = NodeListEl[NodeListEl.length-1];

        var navigate = function(ndx){
            if(ndx < 0 || ndx > lastIndex) return;    
            var targetTop = document.querySelector('[data-scroll-index="'+ ndx + '"]').offsetTop + self.options.topOffset,
                distance = targetTop - window.scrollY,
                scrollSpeed = Math.ceil(Math.abs(distance/(self.options.scrollTime/10)));
                //requestAnimationFrame(scrollit);
                scrollit();

            //TEMP 
            
            function scrollit(){      
                distance = targetTop - window.scrollY; 
                if (distance > 0){
                    window.scrollBy(0, scrollSpeed);
                    if(distance < scrollSpeed ) {
                    distance = 0;
                    window.scrollTo(0, targetTop);
                    return;
                    }
                    requestAnimationFrame(scrollit);
                }
                if (distance < 0){
                    window.scrollBy(0, -scrollSpeed);
                    if(distance > - scrollSpeed) {
                    distance = 0;
                    window.scrollTo(0, targetTop);
                    return;
                    }
                    requestAnimationFrame(scrollit);
                } 
                if (distance == 0){     
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
            //padding at top of the highest element
            const padding = 16;

            function isVisible(node){
                return (winTop + padding) >= node.offsetTop + self.options.topOffset &&
                (winTop + padding) < node.offsetTop + (self.options.topOffset) + node.offsetHeight;
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
            if(key == self.options.upKey && active > 1) {
                navigate(parseInt(active) - 1);
                return false;
            } else if(key == self.options.downKey && active < lastIndex) {
    
                navigate(parseInt(active) + 1);
                return false;
            }
            return true;
        };

        window.onscroll = function(){
            watchActive();
        };

        window.onkeydown = function(e){
            console.log(e);
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
        topOffset : 0
}); 


var tar = document.querySelectorAll('[data-scroll-nav]');
forEach(tar, function(key, value){
    value.addEventListener("click", function(e){
        e.preventDefault();
        s.doScroll(e);

    })

});


