$(function() {

	ecg = [];

	for(i=0; i<data.length; i++) {
		
		ecg.push({
			x: i,
			y: data[i]
		});
		
	}

	options = {
		ticks: {
			x: 22,
			y: 8
		},
		width: 400,
		height: 150
	}

	$('.ecg_container').ecgChart(ecg, options);

});