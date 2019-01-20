(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{35:function(e,t,n){e.exports=n(60)},40:function(e,t,n){},48:function(e,t,n){},57:function(e,t){},60:function(e,t,n){"use strict";n.r(t);var i=n(2),r=n.n(i),a=n(30),s=n.n(a),o=(n(40),n(7)),c=n(6),l=n(15),h=n(14),u=n(16),d=n(9),p=n(13),f=n(23),v=n(10),g="START_GAME",m="LEVEL_COMPLETE",b="GAME_COMPLETE",y="START_LEVEL",E={wireframe:!1},w={current:1,last:5},O={current:0},k={current:"start"},x=Object(p.c)({debug:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:E,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_WIREFRAME_MODE":return Object(v.a)({},e,{wireframe:t.payload.enabled});default:return e}},level:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:w,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"LEVEL_CHANGE":var n=t.payload.level;if(null===n&&(n=e.current+1),n<1||n>e.last)throw new Error("level out of range: ".concat(n));return Object(v.a)({},e,{current:n});default:return e}},score:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:O,t=arguments.length>1?arguments[1]:void 0,n=e.current;switch(t.type){case"SCORE_UPDATE":return n+=t.payload.points,Object(v.a)({},e,{current:n});default:return e}},screen:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:k,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SCREEN_CHANGE":var n=t.payload.screen;return Object(v.a)({},e,{current:n});default:return e}}}),j=n(4),_=n.n(j),C=n(5),S=n(19),T=n.n(S),W=["INFO","DEBUG"].map(function(e){return e.length}),A=T.a.max(W),B=function(){function e(){Object(o.a)(this,e)}return Object(c.a)(e,null,[{key:"info",value:function(e){this.log("INFO",e)}},{key:"debug",value:function(e){this.log("DEBUG",e)}},{key:"log",value:function(e,t){var n=new Date,i="function"===typeof t?t():t;console.log("".concat(n.toISOString()," ").concat(e.padStart(A)," ").concat(i))}}]),e}(),L=_.a.mark(R),P=_.a.mark(I);function R(e){return _.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:B.info("Action: ".concat(e.type));case 1:case"end":return t.stop()}},L,this)}function I(){return _.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(C.d)("*",R);case 2:case"end":return e.stop()}},P,this)}var N=function(){return{type:b}},H=function(){return{type:"LEVEL_CHANGE",payload:{level:arguments.length>0&&void 0!==arguments[0]?arguments[0]:null}}},U=function(){return{type:y}},M=function(e){return{type:"SCREEN_CHANGE",payload:{screen:e}}},G=_.a.mark(X),D=_.a.mark(K);function X(){return _.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(C.b)(M("gameComplete"));case 2:case"end":return e.stop()}},G,this)}function K(){return _.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(C.d)(b,X);case 2:case"end":return e.stop()}},D,this)}var V=n(33),F=Object(V.a)([function(e){return e.level.current},function(e){return e.level.last}],function(e,t){return e===t}),z=_.a.mark(Y),J=_.a.mark(q);function Y(){return _.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(C.c)(F);case 2:if(!e.sent){e.next=7;break}return e.next=5,Object(C.b)(N());case 5:e.next=11;break;case 7:return e.next=9,Object(C.b)(H());case 9:return e.next=11,Object(C.b)(U());case 11:case"end":return e.stop()}},z,this)}function q(){return _.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(C.d)(m,Y);case 2:case"end":return e.stop()}},J,this)}var Q=_.a.mark($),Z=_.a.mark(ee);function $(){return _.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(C.b)(M("startLevel"));case 2:return e.next=4,Object(C.a)(f.b,2500);case 4:return e.next=6,Object(C.b)(M("game"));case 6:case"end":return e.stop()}},Q,this)}function ee(){return _.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(C.d)(y,$);case 2:case"end":return e.stop()}},Z,this)}var te=_.a.mark(ie),ne=_.a.mark(re);function ie(){return _.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(C.b)(U());case 2:case"end":return e.stop()}},te,this)}function re(){return _.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(C.d)(g,ie);case 2:case"end":return e.stop()}},ne,this)}var ae=[I,K,q,ee,re],se=function(){var e=Object(f.a)(),t=Object(p.d)(x,Object(p.a)(e));return ae.forEach(function(t){e.run(t)}),t},oe=(n(48),n(28)),ce=n(3),le=n(34),he=n.n(le),ue=function(){function e(){Object(o.a)(this,e)}return Object(c.a)(e,null,[{key:"clamp",value:function(e,t,n){if(n<t)throw new Error("max of ".concat(n," is less than min ").concat(t," (with value of ").concat(e,")"));return e<t&&(e=t),e>n&&(e=n),e}},{key:"nonNull",value:function(e){if(null===e)throw new Error("null value.");if(void 0===e)throw new Error("undefined value.");return e}}]),e}(),de=function(){function e(t){Object(o.a)(this,e),this.constraints=[],this.acceleration=0,this.enabled=!0,this.speed=0,this.dragging=!1;var n=t.x,i=t.y;this.minX=t.minX,this.maxX=t.maxX,this.width=t.width,this.height=t.height,this.world=t.world,this.maxAcceleration=void 0===t.maxAcceleration?.005:t.maxAcceleration,this.maxSpeed=void 0===t.maxSpeed?1.3:t.maxSpeed;var r=.2*this.height,a=[{x:-this.width/2,y:-this.height/2},{x:0,y:-this.height/2-r},{x:this.width/2,y:-this.height/2},{x:this.width/2,y:this.height/2},{x:-this.width/2,y:this.height/2}];this.body=ce.Bodies.fromVertices(n,i,a,{label:"magnet",isStatic:!0,render:{fillStyle:"Grey"}})}return Object(c.a)(e,[{key:"attachmentPosition",value:function(){return{x:this.body.position.x,y:this.body.position.y+this.height/2}}},{key:"addToWorld",value:function(){ce.World.add(this.world,this.body)}},{key:"attachToMagnet",value:function(e){var t=ce.Constraint.create({bodyA:this.body,bodyB:e,render:{visible:!1}});this.constraints.push(t),this.enabled&&ce.World.add(this.world,t)}},{key:"leftButtonPressed",value:function(e){return 1&e.buttons}},{key:"handlePointerEvent",value:function(e,t){if("pointerup"===t.type&&0===t.button&&this.dragging&&this.toggle(),this.leftButtonPressed(t)){var n={x:t.clientX-e.left,y:t.clientY-e.top};ce.Bounds.contains(this.body.bounds,n)&&(this.dragging=!0),this.dragging&&(this.stop(),ce.Body.setPosition(this.body,{x:n.x,y:this.body.position.y}))}else this.dragging=!1}},{key:"left",value:function(){this.speed>0&&(this.speed=0),this.acceleration=-this.maxAcceleration}},{key:"right",value:function(){this.speed<0&&(this.speed=0),this.acceleration=this.maxAcceleration}},{key:"stop",value:function(){this.acceleration=0,this.speed=0}},{key:"update",value:function(e){this.speed=ue.clamp(this.speed+this.acceleration*e,-this.maxSpeed,this.maxSpeed);var t=this.speed*e,n=ue.clamp(this.body.position.x+t,this.minX,this.maxX),i=this.body.position.y;ce.Body.setPosition(this.body,{x:n,y:i})}},{key:"toggle",value:function(){this.setEnabled(!this.enabled),this.dragging=!1}},{key:"setEnabled",value:function(e){e?this.enabled||ce.World.add(this.world,this.constraints):this.enabled&&ce.World.remove(this.world,this.constraints),this.enabled=e}},{key:"getSpeed",value:function(){return this.speed}}]),e}(),pe=function(){function e(t,n,i,r,a){var s=this;Object(o.a)(this,e),this.ballImageSize=64,this.boxHeight=600,this.boxWidth=800,this.magnetHeight=15,this.magnetWidth=50,this.wallThickness=50,this.lastUpdateTimestamp=null,this.started=!1,this.stopped=!1,this._handleCollision=function(e){var t=s;e.pairs.forEach(function(e){[e.bodyA,e.bodyB].forEach(function(e){if(ce.Sleeping.set(e,!1),t.remainingObjectIds.delete(e.id)){t.scoreUpdate(1)}})})},this._handlePointerEvent=function(e){var t=s.renderer.canvas.getBoundingClientRect();s.magnet.handlePointerEvent(t,e)},this._handleKeyPress=function(e){if(!e.repeat)if("keydown"===e.type&&" "===e.key&&s.magnet.toggle(),"keydown"===e.type)"ArrowLeft"===e.key?s.magnet.left():"ArrowRight"===e.key&&s.magnet.right();else{if("keyup"!==e.type)throw new Error(e);s.magnet.stop()}},this._handleBeforeUpdate=function(e){if(void 0===s.lastUpdateTimestamp)throw new Error;if(null!==s.lastUpdateTimestamp){var t=e.timestamp-s.lastUpdateTimestamp;s.magnet.update(t)}s._isEverythingSleeping()&&(0===s.remainingObjectIds.size?s.levelComplete():s.magnet.setEnabled(!0)),s.lastUpdateTimestamp=e.timestamp},this.levelComplete=r,this.scoreUpdate=a,this.level=n,this.wireframe=i,this.container=t,this.engine=ce.Engine.create(),this.engine.world.gravity.y=.2,this.engine.enableSleeping=!0,this.ballRadius=1.025*this.ballImageSize/2,this.ballHeight=this.ballRadius,this.ballWidth=this.ballRadius,this.magnet=this._createMagnet(),this.ball=this._createBall(this.magnet);var c=this._createWalls(),l=this._createObjects(),h=T.a.map(l,function(e){return e.id});this.remainingObjectIds=new Set(h),this.magnet.attachToMagnet(this.ball),ce.World.add(this.engine.world,[].concat(Object(oe.a)(c),[this.ball],Object(oe.a)(l))),this.magnet.addToWorld(),B.info("Body ids:"),ce.Composite.allBodies(this.engine.world).forEach(function(e){B.info("".concat(e.id," - ").concat(e.label))}),this.renderer=ce.Render.create({element:this.container,engine:this.engine,options:{background:"#fafafa",width:this.boxWidth,height:this.boxHeight}}),this.setWireframe(this.wireframe)}return Object(c.a)(e,[{key:"start",value:function(){if(this.started)throw new Error("already started.");if(this.stopped)throw new Error("cannot restart.");ce.Events.on(this.engine,"collisionStart",this._handleCollision),ce.Events.on(this.engine,"beforeUpdate",this._handleBeforeUpdate),ce.Engine.run(this.engine),ce.Render.run(this.renderer),document.addEventListener("keydown",this._handleKeyPress),document.addEventListener("keyup",this._handleKeyPress),this.renderer.canvas.addEventListener("pointerdown",this._handlePointerEvent),this.renderer.canvas.addEventListener("pointermove",this._handlePointerEvent),this.renderer.canvas.addEventListener("pointerup",this._handlePointerEvent),this.renderer.canvas["touch-action"]="none",this.container.focus(),this.started=!0}},{key:"stop",value:function(){if(!this.started)throw new Error("not started.");if(this.stopped)throw new Error("already stopped");this.renderer.canvas.removeEventListener("pointerup",this._handlePointerEvent),this.renderer.canvas.removeEventListener("pointerdown",this._handlePointerEvent),this.renderer.canvas.removeEventListener("pointermove",this._handlePointerEvent),document.removeEventListener("keydown",this._handleKeyPress),document.removeEventListener("keyup",this._handleKeyPress),ce.Render.stop(this.renderer),ce.Events.off(this.engine,"collisionStart"),ce.Events.off(this.engine,"beforeUpdate"),this.renderer.canvas.remove(),this.started=!1,this.stopped=!0}},{key:"_isEverythingSleeping",value:function(){return T.a.every(this.engine.world.bodies,function(e){return e.isSleeping})}},{key:"_createWalls",value:function(){var e={isStatic:!0,render:{fillStyle:"LightGrey"}};return[ce.Bodies.rectangle(this.boxWidth/2,0,this.boxWidth,this.wallThickness,Object(v.a)({},e,{label:"wall - T"})),ce.Bodies.rectangle(this.boxWidth/2,this.boxHeight,this.boxWidth,this.wallThickness,Object(v.a)({},e,{label:"wall - B"})),ce.Bodies.rectangle(this.boxWidth,this.boxHeight/2,this.wallThickness,this.boxHeight,Object(v.a)({},e,{label:"wall - R"})),ce.Bodies.rectangle(0,this.boxHeight/2,this.wallThickness,this.boxHeight,Object(v.a)({},e,{label:"wall - L"}))]}},{key:"_initialX",value:function(){return.68*(this.boxWidth-this.wallThickness/2)+this.wallThickness/2}},{key:"_createMagnet",value:function(){var e=this.wallThickness/2+Math.max(this.magnetWidth/2,this.ballWidth/2)+.01*this.boxWidth;return new de({x:this._initialX(),y:this.wallThickness/2+.01*this.boxHeight+this.magnetHeight/2,minX:e,maxX:this.boxWidth-e,width:this.magnetWidth,height:this.magnetHeight,world:this.engine.world})}},{key:"_createBall",value:function(e){var t=e.attachmentPosition().x,n=e.attachmentPosition().y+this.ballRadius;return ce.Bodies.circle(t,n,this.ballRadius,{label:"ball",render:{sprite:{texture:"ball.png"}},restitution:.5,frictionAir:0,frictionStatic:0})}},{key:"_createObjects",value:function(){var e=this,t=he()(this.level+484726723),n=[];return T.a.range(0,this.level).forEach(function(i){var r=10+15*t(),a=e.wallThickness/2+r,s=a+t()*(e.boxWidth-2*a),o=a+e.magnetHeight+e.ballHeight+t()*(e.boxHeight-2*a-e.magnetHeight-e.ballHeight),c=ce.Bodies.circle(s,o,r,{label:"object ".concat(i),isStatic:!1,isSleeping:!0});n.push(c)}),n}},{key:"setWireframe",value:function(e){this.wireframe=e,this.renderer.options.wireframes=e,this.renderer.options.showSleeping=e,this.renderer.options.showAngleIndicator=e}},{key:"getBodyCount",value:function(){return ce.Composite.allBodies(this.engine.world).length}},{key:"getConstraintCount",value:function(){return ce.Composite.allConstraints(this.engine.world).length}}]),e}(),fe=function(e){function t(e){var n;return Object(o.a)(this,t),(n=Object(l.a)(this,Object(h.a)(t).call(this,e))).gameEngine=null,n}return Object(u.a)(t,e),Object(c.a)(t,null,[{key:"getContainer",value:function(){return document.getElementById(t.CONTAINER_ID)}},{key:"focus",value:function(){var e=t.getContainer();e&&e.focus()}}]),Object(c.a)(t,[{key:"render",value:function(){return this.gameEngine&&this.gameEngine.setWireframe(this.props.wireframe),r.a.createElement("div",{className:"Game",id:t.CONTAINER_ID,tabIndex:"0"})}},{key:"_startEngine",value:function(){var e=ue.nonNull(t.getContainer());this.gameEngine=new pe(e,this.props.level,this.props.wireframe,this.props.levelComplete,this.props.scoreUpdate),this.gameEngine.start()}},{key:"_stopEngine",value:function(){this.gameEngine&&(this.gameEngine.stop(),this.gameEngine=null)}},{key:"componentDidMount",value:function(){this._startEngine()}},{key:"componentWillUnmount",value:function(){this._stopEngine()}},{key:"componentDidUpdate",value:function(e,t){this.props.level!==e.level&&(this._stopEngine(),this._startEngine())}}]),t}(i.Component);fe.CONTAINER_ID="matter_js_container";var ve={levelComplete:function(){return{type:m}},scoreUpdate:function(e){return{type:"SCORE_UPDATE",payload:{points:e}}}},ge=Object(d.b)(function(e){return{level:e.level.current,wireframe:e.debug.wireframe}},ve)(fe),me=function(e){function t(){var e,n;Object(o.a)(this,t);for(var i=arguments.length,r=new Array(i),a=0;a<i;a++)r[a]=arguments[a];return(n=Object(l.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(r)))).handleClick=function(e){var t=e.currentTarget;if(t){var i=parseInt(t.value);n.props.levelChange(i)}},n}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return r.a.createElement("select",{value:this.props.level,onChange:this.handleClick},T.a.range(1,this.props.numberOfLevels+1).map(function(e){return r.a.createElement("option",{key:e,value:e},e)}))}}]),t}(i.Component),be={levelChange:H},ye=Object(d.b)(function(e){return{level:e.level.current,numberOfLevels:e.level.last}},be)(me),Ee=Object(d.b)(function(e){return{score:e.score.current}})(function(e){return r.a.createElement("div",{className:"Scores"},r.a.createElement("div",null,e.score))}),we=function(e){function t(){var e,n;Object(o.a)(this,t);for(var i=arguments.length,r=new Array(i),a=0;a<i;a++)r[a]=arguments[a];return(n=Object(l.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(r)))).handleClick=function(e){fe.focus();var t=e.currentTarget;n.props.setWireframeMode(t.checked)},n}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("span",null,r.a.createElement("input",{type:"checkbox",checked:this.props.enabled,onChange:this.handleClick}),"debug"))}}]),t}(i.Component),Oe={setWireframeMode:function(e){return{type:"SET_WIREFRAME_MODE",payload:{enabled:e}}}},ke=Object(d.b)(function(e){return{enabled:e.debug.wireframe}},Oe)(we),xe=Object(d.b)(function(e){return{level:e.level.current}},{})(function(e){return r.a.createElement("div",null,"Level ",e.level)}),je=function(e){function t(){var e,n;Object(o.a)(this,t);for(var i=arguments.length,a=new Array(i),s=0;s<i;s++)a[s]=arguments[s];return(n=Object(l.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(a)))).ref=r.a.createRef(),n}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{ref:this.ref,tabIndex:"0",onClick:this.props.startGame,onKeyPress:this.props.startGame,className:"StartScreen"},r.a.createElement("p",null,"Press any key to start game."),r.a.createElement("p",null,"Use left and right arrow keys or the mouse to position the magnet."),r.a.createElement("p",null,"Press space to turn the magnet on or off."),r.a.createElement("p",null,"You move to the next level when all objects have been dislodged."))}},{key:"componentDidMount",value:function(){this.ref.current.focus()}}]),t}(i.Component),_e={startGame:function(){return{type:g}}},Ce={game:function(e){return r.a.createElement("div",null,r.a.createElement(Ee,null),r.a.createElement(ge,null),r.a.createElement(ye,null),r.a.createElement(ke,null))},gameComplete:function(e){return r.a.createElement("div",null,"Game Complete")},startLevel:xe,start:Object(d.b)(null,_e)(je)},Se=Object(d.b)(function(e){return{screen:e.screen.current}},{})(function(e){var t=Ce[e.screen];return r.a.createElement(t,{},null)}),Te=function(e){function t(e){var n;return Object(o.a)(this,t),(n=Object(l.a)(this,Object(h.a)(t).call(this,e))).store=se(),n}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return r.a.createElement(d.a,{store:this.store},r.a.createElement("div",{className:"App"},r.a.createElement("header",{className:"App-header"},r.a.createElement(Se,null))))}}]),t}(i.Component);n(58);window.decomp=n(59);var We=ue.nonNull(document.getElementById("root"));s.a.render(r.a.createElement(Te,null),We)}},[[35,2,1]]]);
//# sourceMappingURL=main.ef27c4ee.chunk.js.map