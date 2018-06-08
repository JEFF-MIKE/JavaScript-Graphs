(function(){
    var vertexLabelList = ["a","b","c","d","e"]; // 5 vertices
    var k = vertexLabelList.length;
    var edgeLabelList = ["1","2","3","4","5","6","7"]; // 7 edges
    var p = edgeLabelList.length;
    var vertexContainer = [] // holds the Vertices
    var edgeContainer = [] // holds the Edges.
    // General function create a vertex. can be used both inside
    // and outside the graph object 
    function createVertex(iLabel,iX,iY){
        var vertex = {
            label: iLabel,
            x: iX,
            y: iY,
            printVertex: function() {
                console.log("Label: "+this.label + "\n" + "x co-ordinate :" + this.x + "\n" + "y co-ordinate :" + this.y);
            } 
        }
        return vertex;
    }
    // for loop to push into vertex array.
    for (var i = 0;i<k;i++){
        vertexContainer.push(createVertex(vertexLabelList[i],getRandomNumber(0,500),getRandomNumber(0,500))) // pushes the objects in order
    }

    function createEdge(name,vertex1,vertex2,value=0){
        var edge = {
            label:name,
            v1:vertex1,
            v2:vertex2,
            weight: value,
            getOpposite: function(someVertex){
                if (someVertex===v1){
                    return v1;
                }
                else{
                    return v2;
                }
            },
            printEdge: function(){
                console.log("Label: " + this.label + "\n" + "1st Vertex: " + this.v1 + "\n" + "2nd Vertex: " + this.v2 + "\n" + "Distance: " + this.weight);
            }

        };
        return edge;
    };
    // for loop to make the edge objects
    for (var i = 0;i<p;i++){
        edgeContainer.push(createEdge(edgeLabelList[i],vertexLabelList[getRandomNumber(1,7)],vertexLabelList[getRandomNumber(1,7)],getRandomNumber(1,200)))
    }
    /*
    **WIP**
    var mapGraph = {
        vertexCount: 0,
        edgeCount: 0,
    }
    */
   function test(){
       // "It just works"~Todd Howard
        var test1 = createVertex("Test Vertex",69,69);
        test1.printVertex();
        var test2 = createEdge("Test Edge","vertex 1","vertex 2",96);
        test2.printEdge();
    };
    function createGraph(){
        // will create a graph by using javascript dictionary
        var graph = {
            vertices:{},
            references:{},
            addVertex:function(elt,xC,yC){
                if (typeof this.vertices.elt === "undefined") {
                    var newV = createVertex(elt,xC,yC);
                    this.references.elt = newV; // O(1) reference
                    this.vertices.elt = {}; // new empty object
                    console.log('Success');
                    return newV;
                } else {
                    console.log("This vertex already exists!");
                    return null; // just return something
                }
            },
            addEdge:function(name,v1,v2,value){
                if (typeof this.vertices.elt !== "undefine"){
                    var newE = createEdge(name,v1,v2,value);
                    this.vertices.v1.v2 = newE;
                    this.vertices.v2.v1 = newE;
                    return;
                } else {
                    console.log("Error! vertices do not exist in the graph!")
                    return null;
                }
            },
            removeVertex: function(x){
                var name = x;
                var array = [];
                //push all connected vertices into the
                for (var key in this.vertices.x){
                    array.push(this.vertices.x[key]);
                }
                for (var item in array){
                    delete this.vertices[item][x] // remove opposite vertices
                }
                delete this.vertices[x] // finally remove x
                console.log("Successfully removed ", x)// confirm removal
            },
            getEdge: function(x,y){
                return this.vertices[x][y];
            },
            getEdges: function(v){
                var lst = [];
                var objectList = [];
                for (var key in Object.keys(this.vertices[v]){
                    lst.push(this.vertices[v][key]);
                }
                return lst;
                
            }

        }
    }
    function getRandomNumber(min, max) {
        return Math.round(Math.random() * (max - min)) + min;
    };


})();