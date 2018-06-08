(function(){
	var canvas,
		ctx,
		cw,
		ch,
		vertices = [],
		startV,  // starting point
		endV,  // end point
		spT = [], // distance tree!
		tD = [], // tentative distance! for djiksta
		step = 1, // must be global for a step by step
		lowest_dis = Infinity, // needs to be a global for the re-assignment
                log;
	document.addEventListener("DOMContentLoaded",init,false);
	
	function init(){
                log = document.querySelector('aside');
		var vertex; 
		canvas = document.querySelector("canvas");
		ctx = canvas.getContext('2d');
		cw = canvas.width;
		cl = canvas.height;
		for(var i = 0; i < 10; i++ ){
			var v = { size : 3,
					  hue : getRandomNumber(1, 359),
					  xPos : getRandomNumber(50, cw-50),
					  yPos : getRandomNumber(50, cl-50),
					  connected_to : [],
					  d : [],
					  vertex_count:getRandomNumber(1,2)
					  };
					for (var g = 0,glen = v.vertex_count; g < glen; g++) {
						vertex = getRandomNumber(0,9); // list indexes
						if (vertex === i) {
							while (vertex === i ) {
								vertex = getRandomNumber(0,9);
								if (!(vertex === i )){
									break;
									}
								}
							}
						if (v.connected_to.indexOf(vertex) === - 1) { 
						v.connected_to.push(vertex);
							}
						}
			vertices.push(v);
			vertices[i].vertex_count = vertices[i].connected_to.length;
			}
		startV = getRandomNumber(0,9);
		endV = getRandomNumber(0,9);
		if (startV === endV) {
			while (startV ===endV) {
				startV = getRandomNumber(0,9)}
			}
		console.log(startV + " This is startV");
                log.innerHTML += "<p>" + startV + " is the starting point! </p>" 
		console.log(endV + " This is endV");
                log.innerHTML += "<p>" + endV + " is  our destination! </p>"
		graphConnector();
		canvas.addEventListener("click", Djikstra);
		}

	function graphConnector() {
		console.log('New connected to arrays');
		var selected; // for the vertex in the connected_to array
		for (var f = 0,max = vertices.length; f < max;f++) {
			for (var r = 0;r < vertices[f].connected_to.length; r++) {
				selected = vertices[f].connected_to[r];
				if (vertices[selected].connected_to.indexOf(f) === -1) {
					vertices[selected].connected_to.push(f);
					}
				}
			}
			Distance();
		}
		
	function Distance() {
		var distance;
		var ver;
		console.log('Distance function');
		for (var i = 0,max = vertices.length; i < max; i++) {
			for (var j = 0; j < vertices[i].connected_to.length; j++) {
				ver = vertices[i].connected_to[j];
				distance = Math.sqrt(Math.pow(vertices[i].xPos - vertices[ver].xPos,2) + Math.pow(vertices[i].yPos - vertices[ver].yPos,2));
				vertices[i].d.push(Math.floor(distance/30));
				}
			console.log(i,vertices[i].connected_to);
			console.log(vertices[i].d);
			}
		drawGraph();
		}
	function drawGraph() {
		ctx.clearRect(0,0,cw,cl);
		var sel;
		for (var i = 0, max = vertices.length; i < max; i++){
			ctx.beginPath();
			ctx.arc(vertices[i].xPos, vertices[i].yPos, vertices[i].size, 0, 2 * Math.PI, false);
			ctx.fillStyle = 'hsl(' + vertices[i].hue + ',100%,50%)';
			ctx.fill();
			ctx.font = "15px Arial";
			ctx.fillText(i,vertices[i].xPos + 20,vertices[i].yPos);
			for (var g = 0; g < vertices[i].connected_to.length; g++){
				sel = vertices[i].connected_to[g];
				ctx.strokeStyle = 'white';
				ctx.beginPath();
				ctx.moveTo(vertices[i].xPos,vertices[i].yPos);
				ctx.lineTo(vertices[sel].xPos,vertices[sel].yPos);
				ctx.closePath();
				ctx.stroke();
				}
			}
		Setup();
		}
		
	function Setup() {
		// setups the spT array
		tD.push(0);
		for (var h = 0, max = (vertices.length - 1); h < max; h++ ) {
			tD.push(Infinity);
			}
		spT.push(startV);
		//Djikstra();
		}
	
	function Djikstra() {
		var	newV, // for adding to spT.
			sP, // only for the drawing!!!
			cd, // current distance.
			meme,
			lowest_dis = Infinity;
		if (step < vertices.length) {
			for (var j = 0, max = spT.length; j < max; j++) {
				meme = spT[j];
				for (var e = 0; e < vertices[meme].connected_to.length; e++) { 	
					cd = vertices[meme].d[e];
					if ( cd < lowest_dis && (spT.indexOf(vertices[meme].connected_to[e]) === -1)) {
						newV = vertices[meme].connected_to[e]; // what vertex is chosen and going to be entered into the spT
						lowest_dis = cd;
						sP = meme; // "Where did the vertex come from?" for further drawings
						}
					}
				}
			spT.push(newV);
                        tD[step] = lowest_dis;
			// for loop to update the distance (tentative distance mode!)
			for (var f = 0,fLen = vertices[newV].connected_to.length; f < fLen; f++) {
				if (spT.indexOf(vertices[newV].connected_to[f]) === -1) {
					vertices[newV].d[f] = vertices[newV].d[f] + lowest_dis;
					}
				}
			ctx.strokeStyle = 'green';
			ctx.beginPath();
			ctx.moveTo(vertices[sP].xPos,vertices[sP].yPos);
			ctx.lineTo(vertices[newV].xPos,vertices[newV].yPos);
                        log.innerHTML += "<p>" + sP + " --> " + newV + " total cost from origin: " + lowest_dis + "</p>"
			ctx.closePath();
			ctx.stroke();
			step += 1;
			}
		else {
			console.log("algorithm complete,congrats!");
                        log.innerHTML += "<p>Shortest Distance from origin to destination: " + tD[spT.indexOf(endV)] + "</p>";
                        canvas.removeEventListener("click",Djikstra)
			}
		}
	
function getRandomNumber(min, max) {
	return Math.round(Math.random() * (max - min)) + min;
    }
	}());