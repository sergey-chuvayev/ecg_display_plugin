$(function() {

	ecg_lead_ii = [];

	for(i=0; i<data.ecg.length; i++) {
		
		ecg_lead_ii.push({
			measured: data.ecg[i].measured,
			lead_ii: data.ecg[i].lead_ii
		});
		
	}

	options = {
		ticks: {
			x: 20,
			y: 10
		},
		width: 400,
		height: 200
	}

	$('.ecg_container_2').ecgChart(ecg_lead_ii, options);

});