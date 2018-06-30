var evtService = (function () {

    var sr = this;
    
    sr.isResizable = true;
    sr.isSelectable = true;

    var windowResizer = function (dom, callback) {
        // Create DOM
        var wdhDragger = document.getElementById("wdhDragger");
        var hgtDragger = document.getElementById("hgtDragger");

        function resizeMove(evt){
            evt.stopPropagation();
            if (evt.buttons === 1) {
                var movX = evt.movementX;
                wdhDragger.style.left = (parseFloat(wdhDragger.style.left) + movX) + "px";
                dom.style.width = (parseFloat(dom.style.width) + movX) + "px";

                var movY = evt.movementY;
                hgtDragger.style.top = (parseFloat(hgtDragger.style.top) + movY) + "px";
                dom.style.height = (parseFloat(dom.style.height) + movY) + "px";
            }

            if (evt.buttons === 0) {
                deactivateResize();
                callback("Document Re-sized - " + dom.style.width + " x " + dom.style.height);
            }
        };

        function activateResize (){document.addEventListener("mousemove", resizeMove);};

        function deactivateResize (){document.removeEventListener("mousemove", resizeMove);};

        wdhDragger.addEventListener("mousedown", function (evt) {
                evt.stopPropagation();
            if (sr.isResizable === true) {
                activateResize();
            }
        });

        hgtDragger.addEventListener("mousedown", function (evt) {
            evt.stopPropagation();
            if (sr.isResizable === true) {
                activateResize();
            }
        });


    };
    
    sr.fetchData = function (url,callback){
          var lh=this;
        lh.xhr = new XMLHttpRequest();
        lh.xhr.open("GET", url, true);
        lh.xhr.send();
        lh.xhr.onreadystatechange = function () {
            if (lh.xhr.readyState === XMLHttpRequest.DONE) {
                callback(lh.xhr.responseText);
            }
        };
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
            console.log(drawAreaSelection);
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
            windowResizer(dom, callback);
        },
        windowSelector: function (dom, callback) {
            sr.drawRect(dom, callback);
        },
        fetchData: function(url,callback){
            fetchData(url,callback);
        }
    };

})();
