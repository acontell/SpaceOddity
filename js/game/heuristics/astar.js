(function (HEURISTICS) {
    var world,
            canWalkHere,
            abs = Math.abs,
            max = Math.max,
            worldWidth,
            worldHeight,
            worldSize,
            distanceFunction = DiagonalDistance,
            findNeighbours = DiagonalNeighbours;

    // Initialize object or retrieve previously initialized one.
    HEURISTICS.astar = HEURISTICS.astar || {};

    /* private functions */
    function DiagonalDistance(Point, Goal) {
        return max(abs(Point.x - Goal.x), abs(Point.y - Goal.y));
    }

    function Neighbours(x, y) {
        var N = y - 1,
                S = y + 1,
                E = x + 1,
                W = x - 1,
                myN = N > -1 && canWalkHere(x, N),
                myS = S < worldHeight && canWalkHere(x, S),
                myE = E < worldWidth && canWalkHere(E, y),
                myW = W > -1 && canWalkHere(W, y),
                result = [];
        if (myN)
            result.push({x: x, y: N});
        if (myE)
            result.push({x: E, y: y});
        if (myS)
            result.push({x: x, y: S});
        if (myW)
            result.push({x: W, y: y});
        findNeighbours(myN, myS, myE, myW, N, S, E, W, result);
        return result;
    }

    function DiagonalNeighbours(myN, myS, myE, myW, N, S, E, W, result) {
        if (myN) {
            if (myE && canWalkHere(E, N))
                result.push({x: E, y: N});
            if (myW && canWalkHere(W, N))
                result.push({x: W, y: N});
        }
        if (myS) {
            if (myE && canWalkHere(E, S))
                result.push({x: E, y: S});
            if (myW && canWalkHere(W, S))
                result.push({x: W, y: S});
        }
    }

    function Node(Parent, Point) {
        var newNode = {
            Parent: Parent,
            value: Point.x + (Point.y * worldWidth),
            x: Point.x,
            y: Point.y,
            f: 0,
            g: 0
        };

        return newNode;
    }

    function calculatePath(pathStart, pathEnd) {
        var mypathStart = Node(null, {x: pathStart[0], y: pathStart[1]}),
                mypathEnd = Node(null, {x: pathEnd[0], y: pathEnd[1]}),
                AStar = new Array(worldSize),
                Open = [mypathStart],
                Closed = [],
                result = [],
                myNeighbours,
                myNode,
                myPath,
                length, max, min, i, j;

        while (length = Open.length) {
            max = worldSize;
            min = -1;
            for (i = 0; i < length; i++) {
                if (Open[i].f < max) {
                    max = Open[i].f;
                    min = i;
                }
            }
            myNode = Open.splice(min, 1)[0];
            if (myNode.value === mypathEnd.value) {
                myPath = Closed[Closed.push(myNode) - 1];
                do {
                    result.push([myPath.x, myPath.y]);
                } while (myPath = myPath.Parent);
                AStar = Closed = Open = [];
                result.reverse();
            } else {
                myNeighbours = Neighbours(myNode.x, myNode.y);
                for (i = 0, j = myNeighbours.length; i < j; i++) {
                    myPath = Node(myNode, myNeighbours[i]);
                    if (!AStar[myPath.value]) {
                        myPath.g = myNode.g + distanceFunction(myNeighbours[i], myNode);
                        myPath.f = myPath.g + distanceFunction(myNeighbours[i], mypathEnd);
                        Open.push(myPath);
                        AStar[myPath.value] = true;
                    }
                }
                Closed.push(myNode);
            }
        }
        return result;
    }

    /* public functions */
    HEURISTICS.astar.init = function (worldMatrix) {
        world = worldMatrix;
        worldWidth = world[0].length;
        worldHeight = world.length;
        worldSize = worldWidth * worldHeight;
    };

    HEURISTICS.astar.getPath = function (pathStart, pathEnd, canWalkHereFnc) {
        canWalkHere = canWalkHereFnc;
        return calculatePath(pathStart, pathEnd);
    };

})(window.HEURISTICS = window.HEURISTICS || {});
