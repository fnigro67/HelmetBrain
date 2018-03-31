var n = 500,
    random = function () {
        return Math.random()*2 - 1;
    }

    var duration = 50;

function chart(domain, tick) {
    data = d3.range(n).map(d3.randomUniform(-1, 1));

    var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 240 - margin.top - margin.bottom;

    var x = d3.scaleLinear()
        .domain(domain)
        .range([0, width]);

    var y = d3.scaleLinear()
        .domain([-1, 1])
        .range([height, 0]);

    var area = d3.area()
        .x(function(d,i) { return x(i); })
        .y0(height)
        .y1(function(d) { return y(d); });

    var svg = d3.select("#chartImpact").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

    var path = svg.append("path")
        .datum(data)
        .attr("class", "area")
        .attr("d", area);

    svg.append("g")
        .call(d3.axisLeft(y))
        // .attr("transform","translate(" + -10 + ")");;

      tick(path, area, data, x);
}

(function() {

var transition = d3.select({}).transition()
    .duration(duration)
    .ease(d3.easeLinear);

chart([0, n - 1], function tick(path, area, data, x) {
    transition = transition.each(function() {

    // push a new data point onto the back
    data.push(random());

    path
        .attr("d", area)
        // .attr("transform", null)
      // .transition()
        // .attr("transform", "translate(" + x(0) + ")");

    // pop the old data point off the front
    data.shift();

})
.transition().on("end", function() { tick(path, area, data, x); });
});

})();
