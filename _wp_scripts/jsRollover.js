rolls = []; numRolls=0;

function PPFindObj(n, d)
{
	var p,i,x;
	if( !d ) { d=document; } 
	if((p=n.indexOf("?"))>0&&parent.frames.length) { d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p); }
	if( !(x=d[n])&&d.all ) { x=d.all[n]; } 
	for( i=0;!x&&i<d.forms.length;i++ ) { x=d.forms[i][n]; }
	for( i=0;!x&&d.layers&&i<d.layers.length;i++ ) { x=PPFindObj(n,d.layers[i].document); } 
	return x;
}

function PPImgFind(name) {
	if (document.images) {
		for(var i=0;i<numRolls;i++) {
			if( name == rolls[i].name ) {
				return rolls[i]; 
			}
		}
	}
	return null;
}

function PPImgAction( action, name, roll ) {
	if( !roll ) { 
		roll = PPImgFind(name);
	}
	var obj = PPFindObj(name);
	if (roll && obj) {
		if( action == 'over' ) { obj.src = roll.down ? roll.imgDownOver.src : roll.imgOver.src; }
		else if( action == 'out' ) { 
			obj.src = roll.down ? (roll.radio ? roll.imgDown.src : roll.imgNormal.src) : roll.imgNormal.src;
			if(!roll.radio) { roll.down = false;} 
		}
		else if( action == 'down') {
			roll.down = true; PPImgAction('over',name,roll);
			if( roll.radio ) {
				for( var i=0;i<numRolls;i++ ) {
					if( rolls[i].radio && rolls[i].name != name ) { 
						rolls[i].down=false; PPImgAction('out',rolls[i].name,rolls[i]);
					}
				}
			}
		}
		else if(action =='up') { if(!roll.radio) {roll.down = false; PPImgAction('over',name,roll);}}
	}
}

function PPImg( name,normal,over,down,downover,initDown,radio ) {
	this.name = name;
	this.imgNormal = new Image(); this.imgNormal.src	= normal; 
	this.imgOver = new Image(); this.imgOver.src	= over; 
	this.imgDown = new Image(); this.imgDown.src	= down; 
	this.imgDownOver = new Image(); this.imgDownOver.src = downover; 
	this.down = initDown; this.over = false; this.radio = radio;
}

function PPImgInit( name,normal,over,down,downover,initDown,radio ) {
	if (document.images) {
		rolls[numRolls++] = new PPImg(name,normal,over,down,downover,initDown,radio);
	}
}
