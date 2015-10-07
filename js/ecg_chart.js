$.fn.ecgChart = function(data, options) {

	this.empty();

	var options = $.extend({
		width: 400,
		height: 200,
		margins: {
			top: 0,
			right: 0,
			bottom: 0,
			left: 0
		},
		ticks: {
			x: 10,
			y: 5
		},
		scales: {
			x: {
				
			},
			y: {
				autoScale: false,
				minVal: -0.003,
				maxVal: 0.002
			}
		}
	}, options );

	propertyNames = [];
	for (var property in data[0]) {
		propertyNames.push(property);
	}
	var x = propertyNames[0];
	var y = propertyNames[1];

	var ecg = data;
	
	WIDTH = options.width;
	HEIGHT = options.height;
	
	MARGINS = {
		top: options.margins.top,
		right: options.margins.right,
		bottom: options.margins.bottom,
		left: options.margins.left
	};

	XTICKS = options.ticks.x;
	YTICKS = options.ticks.y;

	var className = this.attr('class');

	var datacontainer = d3.select("."+className)
						.append('svg')
						.attr('height', HEIGHT)
						.attr('width', WIDTH);

	
	InitChart();
	function InitChart() {

		var xScale = d3.scale.linear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([d3.min(ecg, function (d) {
				return d[x];
			}),
			d3.max(ecg, function (d) {
				return d[x];
			})
		]);

		if (options.scales.y.autoScale) {
			var yScale = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([d3.min(ecg, function (d) {
					return d[y];
				}),
				d3.max(ecg, function (d) {
					return d[y];
				})
			]);
		} else {
			var yScale = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([options.scales.y.minVal,options.scales.y.maxVal]);
		}

		var xAxis = function() {
			return d3.svg.axis()
			.scale(xScale)
			.ticks(XTICKS)
			.innerTickSize(-HEIGHT + MARGINS.top + MARGINS.bottom)
			.outerTickSize(0)
			.tickFormat("");
		};

		var yAxis = function() {
			return d3.svg.axis()
			.scale(yScale)
			.ticks(YTICKS)
			.orient("left")
			.innerTickSize(-WIDTH + MARGINS.left + MARGINS.right)
			.outerTickSize(0)
			.tickFormat("");
		};

		datacontainer.append('rect')
					.attr('width', WIDTH - MARGINS.left - MARGINS.right)
					.attr('height', HEIGHT - MARGINS.top - MARGINS.bottom)
					.classed('grid-bg',true)
					.attr("transform", "translate(" + (MARGINS.left) + "," + (MARGINS.top) + ")");


		datacontainer.append("svg:g")
			.attr("class", "grid")
			.attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
			.call(xAxis().ticks(XTICKS * 5));

		datacontainer.append("svg:g")
			.attr("class", "x axis")
			.attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
			.call(xAxis());



		datacontainer.append("svg:g")
			.attr("class", "grid")
			.attr("transform", "translate(" + (MARGINS.left) + ",0)")
			.call(yAxis()
					.tickFormat("")
					.ticks(YTICKS * 5)
			);

		datacontainer.append("svg:g")
			.attr("class", "y axis")
			.attr("transform", "translate(" + (MARGINS.left) + ",0)")
			.call(yAxis());

		
		var lineFunc = d3.svg.line()
			.x(function (d) {
				return xScale(d[propertyNames[0]]);
			})
			.y(function (d) {
				return yScale(d[propertyNames[1]]);
			})
			.interpolate('linear');


		datacontainer.append("svg:path")
			.attr("d", lineFunc(ecg))
			.attr("stroke", "blue")
			.attr("stroke-width", 1)
			.attr("fill", "none");

	}

}