$(window).load(function() {
	$.getJSON('./output.json', function (data) {
		
		
		var epoch = parseInt(data.RTPPMDataMsgV1.timestamp)
		var myDate = new Date(epoch);
				
		var timestamp_information = '<p align="center">';
		timestamp_information += 'UK Real Time PPM - Last update : ' + myDate.toGMTString();
		timestamp_information += '</p>';
		// load the content into timestamp_placeholder div
		$("#timestamp_placeholder").html(timestamp_information);
		
		
		var placeholder_output = '<table cellspacing="0" width="99%">';
		placeholder_output += '<thead>';
		placeholder_output += '<tr>';
		placeholder_output += '<th>Region</th>';
		placeholder_output += '<th>PPM</th>';
		placeholder_output += '<th>PPM (2 hours)</th>';
		placeholder_output += '<th>Total Trains</th>';
		placeholder_output += '<th>Trains on Time</th>';
		placeholder_output += '<th>Late Trains</th>';
		placeholder_output += '<th>Cancelled or significantly late</th>';
		placeholder_output += '</tr>';
		placeholder_output += '</thead>';
		
		placeholder_output += '<tbody>';
		placeholder_output += '<tr class="highlight">';
		placeholder_output += '<td>National</td>';
		placeholder_output += '<td>' + data.RTPPMDataMsgV1.RTPPMData.NationalPage.NationalPPM.PPM.text + '</td>';
		placeholder_output += '<td>' + data.RTPPMDataMsgV1.RTPPMData.NationalPage.NationalPPM.RollingPPM.text + '</td>';
		placeholder_output += '<td>' + data.RTPPMDataMsgV1.RTPPMData.NationalPage.NationalPPM.Total + '</td>';
		placeholder_output += '<td>' + data.RTPPMDataMsgV1.RTPPMData.NationalPage.NationalPPM.OnTime + '</td>';
		placeholder_output += '<td>' + data.RTPPMDataMsgV1.RTPPMData.NationalPage.NationalPPM.Late + '</td>';
		placeholder_output += '<td>' + data.RTPPMDataMsgV1.RTPPMData.NationalPage.NationalPPM.CancelVeryLate + '</td>';
		placeholder_output += '</tr>';
		
		for (var i in data.RTPPMDataMsgV1.RTPPMData.NationalPage.Sector) {
		placeholder_output += '<tr>';
		placeholder_output += '<td>' + data.RTPPMDataMsgV1.RTPPMData.NationalPage.Sector[i].sectorDesc + '</td>';
		placeholder_output += '<td>' + data.RTPPMDataMsgV1.RTPPMData.NationalPage.Sector[i].SectorPPM.PPM.text + '</td>';
		placeholder_output += '<td>' + data.RTPPMDataMsgV1.RTPPMData.NationalPage.Sector[i].SectorPPM.RollingPPM.text + '</td>';
		placeholder_output += '<td>' + data.RTPPMDataMsgV1.RTPPMData.NationalPage.Sector[i].SectorPPM.Total + '</td>';
		placeholder_output += '<td>' + data.RTPPMDataMsgV1.RTPPMData.NationalPage.Sector[i].SectorPPM.OnTime + '</td>';
		placeholder_output += '<td>' + data.RTPPMDataMsgV1.RTPPMData.NationalPage.Sector[i].SectorPPM.Late + '</td>';
		placeholder_output += '<td>' + data.RTPPMDataMsgV1.RTPPMData.NationalPage.Sector[i].SectorPPM.CancelVeryLate + '</td>';
		placeholder_output += '</tr>';
		}
		placeholder_output += '</tbody>';
		placeholder_output += '</table>';
		$("#placeholder1").html(placeholder_output);
	
		var placeholder1_output = '<table cellspacing="0" width="99%">';
		placeholder1_output += "<thead>";
		placeholder1_output += "<tr>";
		placeholder1_output += "<th>Operator</th>";
		placeholder1_output += "<th width='13%'>PPM</th>";
		placeholder1_output += "<th width='13%'>PPM (2 hours)</th>";
		placeholder1_output += "<th>Operator</th>";
		placeholder1_output += "<th width='13%'>PPM</th>";
		placeholder1_output += "<th width='13%'>PPM (2 hours)</th>";
		placeholder1_output += "</tr>";
		placeholder1_output += "</thead>";
		placeholder1_output += "<tbody>";
	
		// Start loop of operators, loopcount is used to allocate 2 operators per line //
		placeholder1_output += "<tr>";
		var loopcount = 0;
		
		for (var i in data.RTPPMDataMsgV1.RTPPMData.NationalPage.Operator) {
			loopcount ++; // increment loopcount by 1
			var operatorcolorppm = 'red';
			var operatorcolorrppm = 'red';
			
			if (data.RTPPMDataMsgV1.RTPPMData.NationalPage.Operator[i].PPM.rag == 'G') {
				operatorcolorppm = 'green';
			}
			
			if (data.RTPPMDataMsgV1.RTPPMData.NationalPage.Operator[i].PPM.rag == 'A') {
				operatorcolorppm = 'yellow';
			}
			
			if (data.RTPPMDataMsgV1.RTPPMData.NationalPage.Operator[i].RollingPPM.rag == 'G') {
				operatorcolorrppm = 'green';
			}
			
			if (data.RTPPMDataMsgV1.RTPPMData.NationalPage.Operator[i].RollingPPM.rag == 'A') {
				operatorcolorrppm = 'yellow';
			}
			
			
			placeholder1_output += '<td>';
			if (data.RTPPMDataMsgV1.RTPPMData.NationalPage.Operator[i].code == '25') {
				placeholder1_output += '<span style="font-weight:bold; color:blue; text-transform:uppercase;">';
			}

			placeholder1_output += data.RTPPMDataMsgV1.RTPPMData.NationalPage.Operator[i].name + ' ' + data.RTPPMDataMsgV1.RTPPMData.NationalPage.Operator[i].keySymbol;

			if (data.RTPPMDataMsgV1.RTPPMData.NationalPage.Operator[i].code == '25') {
				placeholder1_output += '</span>';
			}

			
			placeholder1_output += '</td>';
			placeholder1_output += '<td class="cell' + operatorcolorppm + '">' + data.RTPPMDataMsgV1.RTPPMData.NationalPage.Operator[i].PPM.text + '</td>';
			placeholder1_output += '<td class="cell' + operatorcolorrppm + '">' + data.RTPPMDataMsgV1.RTPPMData.NationalPage.Operator[i].RollingPPM.text + '</td>';
			if (loopcount % 2 ==0) {
				placeholder1_output += '</tr>';
				placeholder1_output += '<tr>';
			}
		}
		placeholder1_output += "</tbody>";
		placeholder1_output += "</table>";
		
		// load the content into placeholder2 div
		$("#placeholder2").html(placeholder1_output);
		
		var placeholder3_output = '<table cellspacing="0" width="99%">';
		placeholder3_output += '<tr>';
		placeholder3_output += '<td>' + data.RTPPMDataMsgV1.RTPPMData.NationalPage.WebFixedMsg2 + '. ';
		placeholder3_output +=  data.RTPPMDataMsgV1.RTPPMData.NationalPage.WebFixedMsg1 + '</td>';
		placeholder3_output += '</tr>';
		
		placeholder3_output += '</tbody>';
		placeholder3_output += '</table>';
		$("#placeholder3").html(placeholder3_output);	
		
		var placeholder4_output = '<table cellspacing="0" width="99%">';
		placeholder4_output += "<tr>";
		placeholder4_output += "<td colspan='3'>" + data.RTPPMDataMsgV1.RTPPMData.NationalPage.WebMsgOfMoment + "</td>";
		placeholder4_output += "</tr>";
		
		placeholder4_output += "</tbody>";
		placeholder4_output += "</table>";
		$("#placeholder4").html(placeholder4_output);	
		
	});
});