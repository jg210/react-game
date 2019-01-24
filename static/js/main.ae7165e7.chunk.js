(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{37:function(e,t,n){e.exports=n(68)},42:function(e,t,n){},56:function(e,t,n){},65:function(e,t){},68:function(e,t,n){"use strict";n.r(t);var i=n(2),r=n.n(i),a=n(27),s=n.n(a),o=(n(42),n(7)),l=n(6),c=n(15),h=n(14),u=n(16),d=n(9),p=n(34),f=n.n(p),v=n(13),g=n(24),b=n(10),m="START_GAME",y="LEVEL_COMPLETE",E="GAME_COMPLETE",w="START_LEVEL",k={wireframe:!1},O={current:1,last:5},x={current:0},j={current:"start"},C=Object(v.c)({debug:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:k,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_WIREFRAME_MODE":return Object(b.a)({},e,{wireframe:t.payload.enabled});default:return e}},level:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:O,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"LEVEL_CHANGE":var n=t.payload.level;if(null===n&&(n=e.current+1),n<1||n>e.last)throw new Error("level out of range: ".concat(n));return Object(b.a)({},e,{current:n});default:return e}},score:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:x,t=arguments.length>1?arguments[1]:void 0,n=e.current;switch(t.type){case"SCORE_UPDATE":return n+=t.payload.points,Object(b.a)({},e,{current:n});default:return e}},screen:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:j,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SCREEN_CHANGE":var n=t.payload.screen;return Object(b.a)({},e,{current:n});default:return e}}}),_=n(4),S=n.n(_),T=n(5),W=n(19),A=n.n(W),P=["INFO","DEBUG"].map(function(e){return e.length}),B=A.a.max(P),L=function(){function e(){Object(o.a)(this,e)}return Object(l.a)(e,null,[{key:"info",value:function(e){this.log("INFO",e)}},{key:"debug",value:function(e){this.log("DEBUG",e)}},{key:"log",value:function(e,t){var n=new Date,i="function"===typeof t?t():t;console.log("".concat(n.toISOString()," ").concat(e.padStart(B)," ").concat(i))}}]),e}(),R=S.a.mark(H),N=S.a.mark(I);function H(e){return S.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:L.info("Action: ".concat(e.type));case 1:case"end":return t.stop()}},R,this)}function I(){return S.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(T.d)("*",H);case 2:case"end":return e.stop()}},N,this)}var U=function(){return{type:E}},M=function(){return{type:"LEVEL_CHANGE",payload:{level:arguments.length>0&&void 0!==arguments[0]?arguments[0]:null}}},G=function(){return{type:w}},D=function(e){return{type:"SCREEN_CHANGE",payload:{screen:e}}},X=S.a.mark(K),F=S.a.mark(V);function K(){return S.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(T.b)(D("gameComplete"));case 2:case"end":return e.stop()}},X,this)}function V(){return S.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(T.d)(E,K);case 2:case"end":return e.stop()}},F,this)}var z=n(35),J=Object(z.a)([function(e){return e.level.current},function(e){return e.level.last}],function(e,t){return e===t}),Y=S.a.mark(Q),q=S.a.mark(Z);function Q(){return S.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(T.c)(J);case 2:if(!e.sent){e.next=7;break}return e.next=5,Object(T.b)(U());case 5:e.next=11;break;case 7:return e.next=9,Object(T.b)(M());case 9:return e.next=11,Object(T.b)(G());case 11:case"end":return e.stop()}},Y,this)}function Z(){return S.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(T.d)(y,Q);case 2:case"end":return e.stop()}},q,this)}var $=S.a.mark(te),ee=S.a.mark(ne);function te(){return S.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(T.b)(D("startLevel"));case 2:return e.next=4,Object(T.a)(g.b,2500);case 4:return e.next=6,Object(T.b)(D("game"));case 6:case"end":return e.stop()}},$,this)}function ne(){return S.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(T.d)(w,te);case 2:case"end":return e.stop()}},ee,this)}var ie=S.a.mark(ae),re=S.a.mark(se);function ae(){return S.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(T.b)(G());case 2:case"end":return e.stop()}},ie,this)}function se(){return S.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(T.d)(m,ae);case 2:case"end":return e.stop()}},re,this)}var oe=[I,V,Z,ne,se],le=function(){var e=Object(g.a)(),t=Object(v.d)(C,Object(v.a)(e));return oe.forEach(function(t){e.run(t)}),t},ce=(n(56),n(30)),he=n(3),ue=n(36),de=n.n(ue),pe=function(){function e(){Object(o.a)(this,e)}return Object(l.a)(e,null,[{key:"clamp",value:function(e,t,n){if(n<t)throw new Error("max of ".concat(n," is less than min ").concat(t," (with value of ").concat(e,")"));return e<t&&(e=t),e>n&&(e=n),e}},{key:"nonNull",value:function(e){if(null===e)throw new Error("null value.");if(void 0===e)throw new Error("undefined value.");return e}}]),e}(),fe=function(){function e(t){Object(o.a)(this,e),this.constraints=[],this.acceleration=0,this.enabled=!0,this.speed=0,this.dragging=!1;var n=t.x,i=t.y;this.minX=t.minX,this.maxX=t.maxX,this.width=t.width,this.height=t.height,this.world=t.world,this.maxAcceleration=void 0===t.maxAcceleration?.005:t.maxAcceleration,this.maxSpeed=void 0===t.maxSpeed?1.3:t.maxSpeed;var r=.2*this.height,a=[{x:-this.width/2,y:-this.height/2},{x:0,y:-this.height/2-r},{x:this.width/2,y:-this.height/2},{x:this.width/2,y:this.height/2},{x:-this.width/2,y:this.height/2}];this.body=he.Bodies.fromVertices(n,i,a,{label:"magnet",isStatic:!0,render:{fillStyle:"Grey"}})}return Object(l.a)(e,[{key:"attachmentPosition",value:function(){return{x:this.body.position.x,y:this.body.position.y+this.height/2}}},{key:"addToWorld",value:function(){he.World.add(this.world,this.body)}},{key:"attachToMagnet",value:function(e){var t=he.Constraint.create({bodyA:this.body,bodyB:e,render:{visible:!1}});this.constraints.push(t),this.enabled&&he.World.add(this.world,t)}},{key:"leftButtonPressed",value:function(e){return 1&e.buttons}},{key:"handlePointerEvent",value:function(e,t){if(t.isPrimary)if(0===t.button&&("pointerup"===t.type&&this.setEnabled(!1),"pointerdown"===t.type&&this.setEnabled(!0)),this.leftButtonPressed(t)){var n={x:t.clientX-e.left,y:t.clientY-e.top};he.Bounds.contains(this.body.bounds,n)&&(this.dragging=!0),this.dragging&&(this.stop(),he.Body.setPosition(this.body,{x:n.x,y:this.body.position.y}))}else this.dragging=!1}},{key:"left",value:function(){this.speed>0&&(this.speed=0),this.acceleration=-this.maxAcceleration}},{key:"right",value:function(){this.speed<0&&(this.speed=0),this.acceleration=this.maxAcceleration}},{key:"stop",value:function(){this.acceleration=0,this.speed=0}},{key:"update",value:function(e){this.speed=pe.clamp(this.speed+this.acceleration*e,-this.maxSpeed,this.maxSpeed);var t=this.speed*e,n=pe.clamp(this.body.position.x+t,this.minX,this.maxX),i=this.body.position.y;he.Body.setPosition(this.body,{x:n,y:i})}},{key:"toggle",value:function(){this.setEnabled(!this.enabled)}},{key:"setEnabled",value:function(e){e?this.enabled||he.World.add(this.world,this.constraints):this.enabled&&he.World.remove(this.world,this.constraints),this.enabled=e}},{key:"getSpeed",value:function(){return this.speed}}]),e}(),ve=function(){function e(t,n,i,r,a){var s=this;Object(o.a)(this,e),this.ballImageSize=64,this.magnetHeight=15,this.magnetWidth=50,this.wallThickness=50,this.lastUpdateTimestamp=null,this.started=!1,this.stopped=!1,this._handleCollision=function(e){var t=s;e.pairs.forEach(function(e){[e.bodyA,e.bodyB].forEach(function(e){if(he.Sleeping.set(e,!1),t.remainingObjectIds.delete(e.id)){t.scoreUpdate(1)}})})},this._handlePointerEvent=function(e){var t=s.renderer.canvas.getBoundingClientRect();s.magnet.handlePointerEvent(t,e)},this._handleKeyPress=function(e){if(!e.repeat)if("keydown"===e.type&&" "===e.key&&s.magnet.toggle(),"keydown"===e.type)"ArrowLeft"===e.key?s.magnet.left():"ArrowRight"===e.key&&s.magnet.right();else{if("keyup"!==e.type)throw new Error(e);s.magnet.stop()}},this._handleBeforeUpdate=function(e){if(void 0===s.lastUpdateTimestamp)throw new Error;if(null!==s.lastUpdateTimestamp){var t=e.timestamp-s.lastUpdateTimestamp;s.magnet.update(t)}s._isEverythingSleeping()&&(0===s.remainingObjectIds.size?s.levelComplete():s.magnet.setEnabled(!0)),s.lastUpdateTimestamp=e.timestamp},this.levelComplete=r,this.scoreUpdate=a,this.level=n,this.wireframe=i,this.container=t,this.boxHeight=t.clientHeight,this.boxWidth=t.clientWidth,this.engine=he.Engine.create(),this.engine.world.gravity.y=.2,this.engine.enableSleeping=!0,this.ballRadius=1.025*this.ballImageSize/2,this.ballHeight=this.ballRadius,this.ballWidth=this.ballRadius,this.magnet=this._createMagnet(),this.ball=this._createBall(this.magnet);var l=this._createWalls(),c=this._createObjects(),h=A.a.map(c,function(e){return e.id});this.remainingObjectIds=new Set(h),this.magnet.attachToMagnet(this.ball),he.World.add(this.engine.world,[].concat(Object(ce.a)(l),[this.ball],Object(ce.a)(c))),this.magnet.addToWorld(),L.info("Body ids:"),he.Composite.allBodies(this.engine.world).forEach(function(e){L.info("".concat(e.id," - ").concat(e.label))}),this.renderer=he.Render.create({element:this.container,engine:this.engine,options:{background:"#fafafa",width:this.boxWidth,height:this.boxHeight}}),this.setWireframe(this.wireframe)}return Object(l.a)(e,[{key:"start",value:function(){if(this.started)throw new Error("already started.");if(this.stopped)throw new Error("cannot restart.");he.Events.on(this.engine,"collisionStart",this._handleCollision),he.Events.on(this.engine,"beforeUpdate",this._handleBeforeUpdate),he.Engine.run(this.engine),he.Render.run(this.renderer),document.addEventListener("keydown",this._handleKeyPress),document.addEventListener("keyup",this._handleKeyPress),this.renderer.canvas.addEventListener("pointerdown",this._handlePointerEvent),this.renderer.canvas.addEventListener("pointermove",this._handlePointerEvent),this.renderer.canvas.addEventListener("pointerup",this._handlePointerEvent),this.renderer.canvas["touch-action"]="none",this.container.focus(),this.started=!0}},{key:"stop",value:function(){if(!this.started)throw new Error("not started.");if(this.stopped)throw new Error("already stopped");this.renderer.canvas.removeEventListener("pointerup",this._handlePointerEvent),this.renderer.canvas.removeEventListener("pointerdown",this._handlePointerEvent),this.renderer.canvas.removeEventListener("pointermove",this._handlePointerEvent),document.removeEventListener("keydown",this._handleKeyPress),document.removeEventListener("keyup",this._handleKeyPress),he.Render.stop(this.renderer),he.Events.off(this.engine,"collisionStart"),he.Events.off(this.engine,"beforeUpdate"),this.renderer.canvas.remove(),this.started=!1,this.stopped=!0}},{key:"_isEverythingSleeping",value:function(){return A.a.every(this.engine.world.bodies,function(e){return e.isSleeping})}},{key:"_createWalls",value:function(){var e={isStatic:!0,render:{fillStyle:"LightGrey"}};return[he.Bodies.rectangle(this.boxWidth/2,0,this.boxWidth,this.wallThickness,Object(b.a)({},e,{label:"wall - T"})),he.Bodies.rectangle(this.boxWidth/2,this.boxHeight,this.boxWidth,this.wallThickness,Object(b.a)({},e,{label:"wall - B"})),he.Bodies.rectangle(this.boxWidth,this.boxHeight/2,this.wallThickness,this.boxHeight,Object(b.a)({},e,{label:"wall - R"})),he.Bodies.rectangle(0,this.boxHeight/2,this.wallThickness,this.boxHeight,Object(b.a)({},e,{label:"wall - L"}))]}},{key:"_initialX",value:function(){return.68*(this.boxWidth-this.wallThickness/2)+this.wallThickness/2}},{key:"_createMagnet",value:function(){var e=this.wallThickness/2+Math.max(this.magnetWidth/2,this.ballWidth/2)+.01*this.boxWidth;return new fe({x:this._initialX(),y:this.wallThickness/2+.01*this.boxHeight+this.magnetHeight/2,minX:e,maxX:this.boxWidth-e,width:this.magnetWidth,height:this.magnetHeight,world:this.engine.world})}},{key:"_createBall",value:function(e){var t=e.attachmentPosition().x,n=e.attachmentPosition().y+this.ballRadius;return he.Bodies.circle(t,n,this.ballRadius,{label:"ball",render:{sprite:{texture:"ball.png"}},restitution:.5,frictionAir:0,frictionStatic:0})}},{key:"_createObjects",value:function(){var e=this,t=de()(this.level+484726723),n=[];return A.a.range(0,this.level).forEach(function(i){var r=10+15*t(),a=e.wallThickness/2+r,s=a+t()*(e.boxWidth-2*a),o=a+e.magnetHeight+e.ballHeight+t()*(e.boxHeight-2*a-e.magnetHeight-e.ballHeight),l=he.Bodies.circle(s,o,r,{label:"object ".concat(i),isStatic:!1,isSleeping:!0});n.push(l)}),n}},{key:"setWireframe",value:function(e){this.wireframe=e,this.renderer.options.wireframes=e,this.renderer.options.showSleeping=e,this.renderer.options.showAngleIndicator=e}},{key:"getBodyCount",value:function(){return he.Composite.allBodies(this.engine.world).length}},{key:"getConstraintCount",value:function(){return he.Composite.allConstraints(this.engine.world).length}}]),e}(),ge=function(e){function t(e){var n;return Object(o.a)(this,t),(n=Object(c.a)(this,Object(h.a)(t).call(this,e))).gameEngine=null,n}return Object(u.a)(t,e),Object(l.a)(t,null,[{key:"getContainer",value:function(){return document.getElementById(t.CONTAINER_ID)}},{key:"focus",value:function(){var e=t.getContainer();e&&e.focus()}}]),Object(l.a)(t,[{key:"render",value:function(){return this.gameEngine&&this.gameEngine.setWireframe(this.props.wireframe),r.a.createElement("div",{className:"Game",id:t.CONTAINER_ID,tabIndex:"0"})}},{key:"_startEngine",value:function(){var e=pe.nonNull(t.getContainer());this.gameEngine=new ve(e,this.props.level,this.props.wireframe,this.props.levelComplete,this.props.scoreUpdate),this.gameEngine.start()}},{key:"_stopEngine",value:function(){this.gameEngine&&(this.gameEngine.stop(),this.gameEngine=null)}},{key:"componentDidMount",value:function(){this._startEngine()}},{key:"componentWillUnmount",value:function(){this._stopEngine()}},{key:"componentDidUpdate",value:function(e,t){this.props.level!==e.level&&(this._stopEngine(),this._startEngine())}}]),t}(i.Component);ge.CONTAINER_ID="matter_js_container";var be={levelComplete:function(){return{type:y}},scoreUpdate:function(e){return{type:"SCORE_UPDATE",payload:{points:e}}}},me=Object(d.b)(function(e){return{level:e.level.current,wireframe:e.debug.wireframe}},be)(ge),ye=function(e){function t(){var e,n;Object(o.a)(this,t);for(var i=arguments.length,r=new Array(i),a=0;a<i;a++)r[a]=arguments[a];return(n=Object(c.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(r)))).handleClick=function(e){var t=e.currentTarget;if(t){var i=parseInt(t.value);n.props.levelChange(i)}},n}return Object(u.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return r.a.createElement("select",{value:this.props.level,onChange:this.handleClick},A.a.range(1,this.props.numberOfLevels+1).map(function(e){return r.a.createElement("option",{key:e,value:e},e)}))}}]),t}(i.Component),Ee={levelChange:M},we=Object(d.b)(function(e){return{level:e.level.current,numberOfLevels:e.level.last}},Ee)(ye),ke=Object(d.b)(function(e){return{score:e.score.current}})(function(e){return r.a.createElement("div",{className:"Scores"},r.a.createElement("div",null,e.score))}),Oe=function(e){function t(){var e,n;Object(o.a)(this,t);for(var i=arguments.length,r=new Array(i),a=0;a<i;a++)r[a]=arguments[a];return(n=Object(c.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(r)))).handleClick=function(e){ge.focus();var t=e.currentTarget;n.props.setWireframeMode(t.checked)},n}return Object(u.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("span",null,r.a.createElement("input",{type:"checkbox",checked:this.props.enabled,onChange:this.handleClick}),"debug"))}}]),t}(i.Component),xe={setWireframeMode:function(e){return{type:"SET_WIREFRAME_MODE",payload:{enabled:e}}}},je=Object(d.b)(function(e){return{enabled:e.debug.wireframe}},xe)(Oe),Ce=Object(d.b)(function(e){return{level:e.level.current}},{})(function(e){return r.a.createElement("div",null,"Level ",e.level)}),_e=n(23),Se=function(e){function t(e){var n;return Object(o.a)(this,t),(n=Object(c.a)(this,Object(h.a)(t).call(this,e))).ref=r.a.createRef(),n.handleClick=n.handleClick.bind(Object(_e.a)(Object(_e.a)(n))),n}return Object(u.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{ref:this.ref,tabIndex:"0",onClick:this.handleClick,onKeyPress:this.handleClick,className:"StartScreen"},r.a.createElement("p",null,"Press any key to start game."),r.a.createElement("p",null,"Use left and right arrow keys or the mouse to position the magnet."),r.a.createElement("p",null,"Press space to turn the magnet on or off."),r.a.createElement("p",null,"You move to the next level when all objects have been dislodged."))}},{key:"handleClick",value:function(){this.props.toggleFullscreen(),this.props.startGame()}},{key:"componentDidMount",value:function(){this.ref.current.focus()}}]),t}(i.Component),Te={startGame:function(){return{type:m}}},We={game:function(e){return r.a.createElement("div",{className:"GameScreen"},r.a.createElement(ke,null),r.a.createElement(me,null),r.a.createElement(we,null),r.a.createElement(je,null))},gameComplete:function(e){return r.a.createElement("div",null,"Game Complete")},startLevel:Ce,start:Object(d.b)(null,Te)(Se)},Ae=Object(d.b)(function(e){return{screen:e.screen.current}},{})(function(e){var t=We[e.screen];return r.a.createElement(t,{toggleFullscreen:e.toggleFullscreen},null)}),Pe=function(e){function t(e){var n;return Object(o.a)(this,t),(n=Object(c.a)(this,Object(h.a)(t).call(this,e))).store=le(),n}return Object(u.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return r.a.createElement(d.a,{store:this.store},r.a.createElement("div",{className:"App"},r.a.createElement("header",{className:"App-header"},r.a.createElement(Ae,{toggleFullscreen:this.props.toggleFullscreen}))))}}]),t}(i.Component),Be=f()()(Pe);n(66);window.decomp=n(67);var Le=pe.nonNull(document.getElementById("root"));s.a.render(r.a.createElement(Be,null),Le)}},[[37,2,1]]]);
//# sourceMappingURL=main.ae7165e7.chunk.js.map