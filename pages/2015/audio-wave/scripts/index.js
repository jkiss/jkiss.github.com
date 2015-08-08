/* 
* @Author: Nokey
* @Date:   2015-03-18 13:40:57
* @Last Modified by:   Nokey
* @Last Modified time: 2015-03-20 16:30:13
*/

// 'use strict';

// requestAnimationFrame polyfill
// QUOTE：http://www.paulirish.com/2011/requestanimationframe-for-smart-animating

(function() {
    var lastTime = 0;
    var vendors = ['webkit'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame =
          window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if(!window.requestAnimationFrame){
        window.requestAnimationFrame = function(callback) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }
    if(!window.cancelAnimationFrame){
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }
}());

// register a ready func
var Nokey = Nokey || function(x){
    switch(typeof x){
        case 'function':
            document.addEventListener('DOMContentLoaded', function(){
                document.removeEventListener('DOMContentLoaded', arguments.callee, false);
                x();
            }, false);
            break;
        case 'string':
            var 
                isID = /^\#/.test(x),
                isClass = /^\./.test(x);
            if(isID){
                return document.getElementById(x.split('#')[1]);
            }
            if(isClass){
                return document.getElementsByClassName(x.split('.')[1]);
            }
            break;
        default:
            break;
    }
}

// logger
function alog(text){
    switch(typeof text){
        case 'string':
            document.getElementById('debug').innerHTML = text;
            break;
        case 'number':
            document.getElementById('debug').innerHTML = text;
            break;
        default:
            document.getElementById('debug').innerHTML = typeof text;
            break;
    }
}
alog('audio start...');

// console.log(Nokey);
Nokey(function(){
    var ctt_list = Nokey('.content-list')[0];
    ctt_list.addEventListener('touchmove', function(e){
        e.preventDefault();
        e.stopPropagation();
    }, false);
    ctt_list.addEventListener('touchstart', function(e){
        e.preventDefault();
        e.stopPropagation();
    }, false);
    ctt_list.addEventListener('touchend', function(e){
        e.preventDefault();
        e.stopPropagation();
    }, false);
    console.log('%cNokey', 'text-shadow: 1px 1px 1px #007130; font-size: 32px; font-family: courier;');
});
console.log(typeof Nokey('.container'));

// start audio visualizer
window.onload = function(){
    // start sound visualizer
    (new Visualizer()).init();
};

// Visualizer Object
var Visualizer = function(){
    this.file = null;
    this.filename = null;
    this.audioContext = null;
    this.source = null;
};
Visualizer.prototype = {
    init: function(){
        var _me = this;
        // unify API
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        try{
            _me.audioContext = new AudioContext();
        }catch(e){
            alog("Don't support AudioContext...");
        }
        // load music
        var request = new XMLHttpRequest(),
            url = 'http://blog.nokey.me/pages/2015/audio-wave/music/forget_it.mp3';
        request.open('GET', url, true);
        request.responseType = 'blob';
        request.onload = function(){
            _me.file = request.response;
            alog('music load success...');
            _me._start();
        };
        request.send();
        alog('music load begin...');
    },
    _start: function(){
        var _me = this,
            file = this.file,
            fr = new FileReader();
        fr.onload = function(e){
            var fileResult = e.target.result,
                audioContext = _me.audioContext;
            audioContext.decodeAudioData(fileResult, function(buffer){
                _me._visualize(audioContext, buffer);
            }, function(e){
                alog('decode failed...');
            });
        };
        fr.readAsArrayBuffer(file);
    },
    _visualize: function(audioContext, buffer){
        var 
            audioBufferSouceNode = audioContext.createBufferSource(),
            analyser = audioContext.createAnalyser();

        audioBufferSouceNode.connect(analyser);
        analyser.connect(audioContext.destination);
        audioBufferSouceNode.buffer = buffer;
        audioBufferSouceNode.start(0);

        this._draw(analyser);
    },
    _draw: function(analyser){
        var p0_3 = Nokey('.p0-3')[0],
            p0_1 = Nokey('.p0-1')[0];
        var drawSound = function(){
            var output = new Uint8Array(analyser.frequencyBinCount);
            analyser.getByteFrequencyData(output);
            alog(output[50]);
            p0_3.style.webkitTransform = 'scale('+ output[0]/150 +')';
            p0_1.style.webkitTransform = 'scale('+ output[100]/200 +')';
            requestAnimationFrame(drawSound);
        }
        requestAnimationFrame(drawSound);
    }
}






