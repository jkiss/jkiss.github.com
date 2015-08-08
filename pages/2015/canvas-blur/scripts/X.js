/* 
* @Author: Nokey
* @Date:   2015-06-12 15:39:24
* @Last Modified by:   Nokey
* @Last Modified time: 2015-06-23 22:32:15
*/

var canvas = document.getElementById('mask'),
    ctx = canvas.getContext('2d'),
    img = new Image(),
    isMouseDown = false;

img.src="http://7qnc7c.com1.z0.glb.clouddn.com/blog_avatar.jpg";
img.onload = function(){
    ctx.drawImage(img,0,0);
    ctx.font = '40px Georgia';
    ctx.fillStyle = 'rgba(255,255,255,.5)';
    ctx.fillText('Hello world', 40, 40);
};

canvas.addEventListener('mousedown', function(e){
    isMouseDown = true;
});
canvas.addEventListener('mouseup', function(e){
    isMouseDown = false;
});
canvas.addEventListener('mousemove', function(e){
    // console.log(e);
    if(isMouseDown){
        var x = e.offsetX,
            y = e.offsetY;

        ctx.globalCompositeOperation = 'destination-out';
        ctx.fillStyle = '#fff';
        ctx.shadowBlur = 20;
      
        ctx.beginPath();
        ctx.arc(x, y, 20, 0, Math.PI*2, false);
        ctx.closePath();
        ctx.fill();
    }
});

stackBlurImage('blurimg', 'mask', 50, false);
// TODO: 高斯模糊
function reset(){
    
}

