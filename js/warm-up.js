/**
 * Created by sosek108 on 13.04.15.
 */

//TODO: Make it Angular Way
//HOWTO: how to use Angular and Canvas together?
$(document).ready(function() {
    var canvas = document.getElementById("warmUpCanvas");
    var context = canvas.getContext("2d");
    var runAnimation = false;
    var working = false;
    function Circle(context) {
        circle = this;
        circle.x = 5;
        circle.y = 5;
        circle.r = 10;
        circle.fill = function() {
            var grd = context.createRadialGradient(circle.x,circle.y,0,circle.x,circle.y,circle.r);
            grd.addColorStop(0,"red");
            grd.addColorStop(0.75,"white");
            return grd;
        }
        circle.draw = function() {

            context.clearRect(0,0, canvas.width, canvas.height)
            context.beginPath();
            context.fillStyle = circle.fill();
            context.arc(circle.x, circle.y, circle.r, 0, 2*Math.PI);
            context.fill();
        }
    }
    function animate(object, end, stepSize) {
        working = true;
        // window.requestAnimationFrame(animate, object, endX, endY);
        if (circle.x > canvas.width || circle.x < 0){
            working = false;
            return;
        }
        if (circle.y > canvas.height || circle.y < 0){
            working = false;
            return;
        }
        object.x += stepSize.x;
        object.y += stepSize.y;

        object.draw();

        if ((stepSize.x <=0 && object.x <= end.x) || (stepSize.x >0 && object.x >= end.x) )
            if ((stepSize.y <=0 && object.y <= end.y) || (stepSize.y >0 && object.y >= end.y) ){
                working = false;
                return;
            }

//        setTimeout(function() {animate(object,end,stepSize)}, 1000)
        window.requestAnimationFrame(function() {animate(object,end,stepSize)});
    }
    function moveCircle(object) {
        console.log('alfa');
        var startX = object.x;
        var startY = object.y;
        var end = {
            x: Math.floor(Math.random()*canvas.width),
            y: Math.floor(Math.random()*canvas.height)
        }
        console.log(end);
        var steps = 50;
        var stepSize = {
            x: (end.x-startX)/steps,
            y: (end.y-startY)/steps
        }


        object.x = object.x + stepSize.x;
        object.y = object.y + stepSize.y;
        object.draw();
        animate(object, end, stepSize);
        // object.x = endX;
        // object.y = endY;
        // object.draw();
    }

    //init form
    var img = new Circle(context);
    img.x = Math.floor(Math.random()*canvas.width);
    img.y = Math.floor(Math.random()*canvas.height);

    img.draw();

    //button click
    $("#draw").click(function() {
        runAnimation = !runAnimation;
        setInterval(function() {
            if (runAnimation && !working)
                moveCircle(img);
        }, 500)
    });
})