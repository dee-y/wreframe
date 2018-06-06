var evtService = (function () {

    var sr = this;

    sr.resizable = function (dom) {
        // Create DOM
        var wdhDragger = document.createElement("div");
        wdhDragger.id = "wdhDragger";
        wdhDragger.classList.add("ui-resizable-e");
        wdhDragger.classList.add("ui-resizable-handle");
        var hgtDragger = document.createElement("div");
        hgtDragger.id = "hgtDragger";
        hgtDragger.classList.add("ui-resizable-s");
        hgtDragger.classList.add("ui-resizable-handle");
        dom.appendChild(wdhDragger);
        dom.appendChild(hgtDragger);

        //Offset
        var paddingLeft = dom.offsetLeft;
        var paddingTop = dom.offsetTop;
        
        var maxWidth = (wdhDragger.offsetLeft)+(wdhDragger.clientWidth);
        var maxHeight = (hgtDragger.offsetTop)+(hgtDragger.clientHeight);


        //Assign Flags 
        var slideWidth = false;
        var slideHeight = false;

        document.addEventListener("mousemove", function (evt) {
            if (evt.buttons === 1) {
                if (slideWidth === true) {
                    var left = evt.clientX - paddingLeft;
                    if (left <= maxWidth) {
                        wdhDragger.style.left = left + "px";
                        dom.style.width = left + "px";
                    }
                }

                if (slideHeight === true) {
                    var top = evt.clientY - paddingTop;
                    if (top <= maxHeight) {
                        hgtDragger.style.top = top + "px";
                        dom.style.height = top + "px";
                    }
                }
            }

            if (evt.buttons === 0) {
                slideWidth = slideHeight = false;
            }
        });

        wdhDragger.addEventListener("mousedown", function (evt) {
            slideWidth = true;
        });

        hgtDragger.addEventListener("mousedown", function (evt) {
            slideHeight = true;
        });


    };

    return {
        resize: function (dom) {
            sr.resizable(dom);
        }
    };

})();