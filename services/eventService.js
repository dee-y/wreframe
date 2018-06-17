var evtService = (function () {

    var sr = this;
    
    sr.isResizable = true;
    sr.isSelectable = true;

    sr.windowResizer = function (dom, callback) {
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

        var maxWidth = (wdhDragger.offsetLeft) + (wdhDragger.clientWidth);
        var maxHeight = (hgtDragger.offsetTop) + (hgtDragger.clientHeight);


        //Assign Flags
        var slideWidth = false;
        var slideHeight = false;

        document.addEventListener("mousemove", function (evt) {
            evt.stopPropagation();
            if (evt.buttons === 1) {
                if (slideWidth === true) {
                    var left = evt.clientX - paddingLeft;
                    if (left <= maxWidth) {
                        wdhDragger.style.left = dom.style.width = left + "px";
                    } else {
                        wdhDragger.style.left = dom.style.width = maxWidth + "px";
                    }
                }

                if (slideHeight === true) {
                    var top = evt.clientY - paddingTop;
                    if (top <= maxHeight) {
                        hgtDragger.style.top = dom.style.height = top + "px";
                    } else {
                        hgtDragger.style.top = dom.style.height = maxHeight + "px";
                    }
                }
            }

            if (evt.buttons === 0) {
                if (slideWidth === true || slideHeight === true) {
                    slideWidth = slideHeight = false;
                    callback("Document Resized - "+dom.style.width+" x "+dom.style.height);
                }
            }
        });

        wdhDragger.addEventListener("mousedown", function (evt) {
                evt.stopPropagation();
            if (sr.isResizable === true) {
                slideWidth = true;
            }
        });

        hgtDragger.addEventListener("mousedown", function (evt) {
            evt.stopPropagation();
            if (sr.isResizable === true) {
                slideHeight = true;
            }
        });


    };
    
    sr.drawRect = function (dom, callback) {
        var mouseCors = {X: 0, Y: 0, active: false};
        var drawAreaSelection = document.getElementById("drawAreaSelection");

        //Offset
        var offsetMargin=3;
        var paddingLeft = parseFloat(dom.offsetLeft) - offsetMargin;
        var paddingTop = parseFloat(dom.offsetTop) - offsetMargin;

        dom.addEventListener("mousedown", function (evt) {
            evt.stopPropagation();
            mouseCors.X = parseFloat(evt.offsetX) + paddingLeft;
            mouseCors.Y = parseFloat(evt.offsetY) + paddingTop;
            mouseCors.active = true;
            drawAreaSelection.style.top = mouseCors.Y + 'px';
            drawAreaSelection.style.left = mouseCors.X + 'px';
            drawAreaSelection.style.display = 'block';
        });

        dom.addEventListener('mousemove', function (evt) {

            if (mouseCors.active === true && evt.buttons === 1) {
                var offsetX = parseFloat(evt.offsetX) + paddingLeft;
                var offsetY = parseFloat(evt.offsetY) + paddingTop;
                var width = findDiff(mouseCors.X, offsetX);
                var height = findDiff(mouseCors.Y, offsetY);
                if (mouseCors.X > offsetX) {
                    drawAreaSelection.style.left = offsetX + 'px';
                }

                if (mouseCors.Y > offsetY) {
                    drawAreaSelection.style.top = offsetY + 'px';
                }

                drawAreaSelection.style.width = width + 'px';
                drawAreaSelection.style.height = height + 'px';
            }
        });

        document.addEventListener('mouseup', function (evt) {
            if (mouseCors.active === true) {
                drawAreaSelection.style.width = drawAreaSelection.style.height = '0px';
                drawAreaSelection.style.top = drawAreaSelection.style.left = '0px';
                mouseCors.X = mouseCors.Y = 0;
                drawAreaSelection.style.display = 'none';
                mouseCors.active = false;
                callback("Area Selected");
            }
        });

        var findDiff = function (num1, num2) {
            var diff = (num1 > num2) ? (num1 - num2) : (num2 - num1);
            return diff;
        };


    };

    return {
        windowResizer: function (dom, callback) {
            sr.windowResizer(dom, callback);
        },
        windowSelector: function (dom, callback) {
            sr.drawRect(dom, callback);
        }
    };

})();
