$(window).load(function () {
    $.ajaxSetup({ cache: false });
    $.getJSON(db_server.getItem('server') + 'output.json', function (data) {

        //Gather reusable values
        var NationalPPM = data.RTPPMDataMsgV1.RTPPMData.NationalPage.NationalPPM.PPM.text;
        var NationalRPPM = data.RTPPMDataMsgV1.RTPPMData.NationalPage.NationalPPM.RollingPPM.text;
        var NationalPPMc = data.RTPPMDataMsgV1.RTPPMData.NationalPage.NationalPPM.PPM.rag;
        var NationalRPPMc = data.RTPPMDataMsgV1.RTPPMData.NationalPage.NationalPPM.RollingPPM.rag;

        var NationalPPMttl = data.RTPPMDataMsgV1.RTPPMData.NationalPage.NationalPPM.Total;
        var NationalPPMont = data.RTPPMDataMsgV1.RTPPMData.NationalPage.NationalPPM.OnTime;
        var NationalPPMlte = data.RTPPMDataMsgV1.RTPPMData.NationalPage.NationalPPM.Late;
        var NationalPPMcnc = data.RTPPMDataMsgV1.RTPPMData.NationalPage.NationalPPM.CancelVeryLate;


        // Get timestamp
        var epoch = parseInt(data.RTPPMDataMsgV1.timestamp)
        var myDate = new Date(epoch);

        // Timestamp code
        var timestamp_information = '<div align="center">';
        timestamp_information += 'Updated : ' + myDate.toGMTString();
        timestamp_information += '</div>';
        // load the content into timestamp_placeholder div
        $(".timestamp_placeholder").html(timestamp_information);
        // End timestamp

        // National Summary

        var natsumtrains_output = '<table cellspacing="0" width="99%">';

        var natsum_output = '<table cellspacing="0" width="99%">';
        natsum_output += '<thead>';
        natsum_output += '<tr>';
        natsum_output += '<th></th>';
        natsum_output += '<th width="20%">PPM</th>';
        natsum_output += '<th width="20%">2hrs</th>';
        natsum_output += '</tr>';
        natsum_output += '</thead>';
        natsum_output += '<tbody>';

        var natcolorppm = 'red';
        var natcolorrppm = 'red';

        if (NationalPPMc == 'G') {
            natcolorppm = 'green';
        }

        if (NationalPPMc == 'A') {
            natcolorppm = 'yellow';
        }

        if (NationalRPPMc == 'G') {
            natcolorrppm = 'green';
        }

        if (NationalRPPMc == 'A') {
            natcolorrppm = 'yellow';
        }

        natsum_output += '<tr class="highlight">';
        natsum_output += '<td>National</td>';
        natsum_output += '<td class="cell' + natcolorppm + '">' + NationalPPM + '</td>';
        natsum_output += '<td class="cell' + natcolorrppm + '">' + NationalRPPM + '</td>';
        natsum_output += '</tr>';
        natsum_output += '</tbody>';
        natsum_output += '</table>';

        natsumtrains_output += '<thead>';
        natsumtrains_output += '<tr>';
        natsumtrains_output += '<th>Total Trains</th>';
        natsumtrains_output += '<th>Trains on Time</th>';
        natsumtrains_output += '<th>Late</th>';
        natsumtrains_output += '<th>Cancelled</th>';
        natsumtrains_output += '</tr>';
        natsumtrains_output += '</thead>';
        natsumtrains_output += '<tbody>';
        natsumtrains_output += '<tr class="highlight">';
        natsumtrains_output += '<td>' + NationalPPMttl + '</td>';
        natsumtrains_output += '<td>' + NationalPPMont + '</td>';
        natsumtrains_output += '<td>' + NationalPPMlte + '</td>';
        natsumtrains_output += '<td>' + NationalPPMcnc + '</td>';
        natsumtrains_output += '</tr>';
        natsumtrains_output += '</tbody>';
        natsumtrains_output += '</table>';


        $("#natsum").html(natsum_output);
        $("#natsumtrains").html(natsumtrains_output);
        // End National Summary

        // National Detail
        var natdetail_output = '<table cellspacing="0" width="99%">';
        natdetail_output += '<thead>';
        natdetail_output += '<tr>';
        natdetail_output += '<th>Region</th>';
        natdetail_output += '<th width="20%">PPM</th>';
        natdetail_output += '<th width="20%">2hrs</th>';

        natdetail_output += '</tr>';
        natdetail_output += '</thead>';

        natdetail_output += '<tbody>';
        natdetail_output += '<tr class="highlight">';
        natdetail_output += '<td>National</td>';
        natdetail_output += '<td>' + data.RTPPMDataMsgV1.RTPPMData.NationalPage.NationalPPM.PPM.text + '</td>';
        natdetail_output += '<td>' + data.RTPPMDataMsgV1.RTPPMData.NationalPage.NationalPPM.RollingPPM.text + '</td>';
        natdetail_output += '<td class="landscapeonly">' + data.RTPPMDataMsgV1.RTPPMData.NationalPage.NationalPPM.Total + '</td>';
        natdetail_output += '<td class="landscapeonly">' + data.RTPPMDataMsgV1.RTPPMData.NationalPage.NationalPPM.OnTime + '</td>';
        natdetail_output += '<td class="landscapeonly">' + data.RTPPMDataMsgV1.RTPPMData.NationalPage.NationalPPM.Late + '</td>';
        natdetail_output += '<td class="landscapeonly">' + data.RTPPMDataMsgV1.RTPPMData.NationalPage.NationalPPM.CancelVeryLate + '</td>';
        natdetail_output += '</tr>';

        for (var i in data.RTPPMDataMsgV1.RTPPMData.NationalPage.Sector) {
            natdetail_output += '<tr>';
            natdetail_output += '<td>' + data.RTPPMDataMsgV1.RTPPMData.NationalPage.Sector[i].sectorDesc + '</td>';
            natdetail_output += '<td>' + data.RTPPMDataMsgV1.RTPPMData.NationalPage.Sector[i].SectorPPM.PPM.text + '</td>';
            natdetail_output += '<td>' + data.RTPPMDataMsgV1.RTPPMData.NationalPage.Sector[i].SectorPPM.RollingPPM.text + '</td>';
            natdetail_output += '<td class="landscapeonly">' + data.RTPPMDataMsgV1.RTPPMData.NationalPage.Sector[i].SectorPPM.Total + '</td>';
            natdetail_output += '<td class="landscapeonly">' + data.RTPPMDataMsgV1.RTPPMData.NationalPage.Sector[i].SectorPPM.OnTime + '</td>';
            natdetail_output += '<td class="landscapeonly">' + data.RTPPMDataMsgV1.RTPPMData.NationalPage.Sector[i].SectorPPM.Late + '</td>';
            natdetail_output += '<td class="landscapeonly">' + data.RTPPMDataMsgV1.RTPPMData.NationalPage.Sector[i].SectorPPM.CancelVeryLate + '</td>';


            natdetail_output += '</tr>';
        }
        natdetail_output += '</tbody>';
        natdetail_output += '</table>';
        $("#natdetail").html(natdetail_output);
        // End National Detail



        // Start FGW only display
        var fgwonlysmall_output = '<table cellspacing="0" width="99%">';
        fgwonlysmall_output += "<thead>";
        fgwonlysmall_output += "<tr>";
        fgwonlysmall_output += "<th></th>";
        fgwonlysmall_output += "<th width='20%'>PPM</th>";
        fgwonlysmall_output += "<th width='20%'>2hrs</th>";
        fgwonlysmall_output += "</tr>";
        fgwonlysmall_output += "</thead>";
        fgwonlysmall_output += "<tbody>";

        // Start loop of operators, loopcount is used to allocate 2 operators per line //
        fgwonlysmall_output += "<tr>";
        var loopcount = 0;

        for (var i in data.RTPPMDataMsgV1.RTPPMData.OperatorPage) {
            if (data.RTPPMDataMsgV1.RTPPMData.OperatorPage[i].Operator.code == '25') {
                var operatorcolorppm = 'red';
                var operatorcolorrppm = 'red';

                if (data.RTPPMDataMsgV1.RTPPMData.OperatorPage[i].Operator.PPM.rag == 'G') {
                    operatorcolorppm = 'green';
                }

                if (data.RTPPMDataMsgV1.RTPPMData.OperatorPage[i].Operator.PPM.rag == 'A') {
                    operatorcolorppm = 'yellow';
                }

                if (data.RTPPMDataMsgV1.RTPPMData.OperatorPage[i].Operator.RollingPPM.rag == 'G') {
                    operatorcolorrppm = 'green';
                }

                if (data.RTPPMDataMsgV1.RTPPMData.OperatorPage[i].Operator.RollingPPM.rag == 'A') {
                    operatorcolorrppm = 'yellow';
                }


                fgwonlysmall_output += '<td>' + data.RTPPMDataMsgV1.RTPPMData.OperatorPage[i].Operator.name + '</td>';
                fgwonlysmall_output += '<td class="cell' + operatorcolorppm + '">' + data.RTPPMDataMsgV1.RTPPMData.OperatorPage[i].Operator.PPM.text + '</td>';
                fgwonlysmall_output += '<td class="cell' + operatorcolorrppm + '">' + data.RTPPMDataMsgV1.RTPPMData.OperatorPage[i].Operator.RollingPPM.text + '</td>';
                fgwonlysmall_output += "</tr>";
            }
        }

        fgwonlysmall_output += '<tr>';
        fgwonlysmall_output += '<td>National</td>';

            var natcolorppm = 'red';
            var natcolorrppm = 'red';

            if (data.RTPPMDataMsgV1.RTPPMData.NationalPage.NationalPPM.PPM.rag == 'G') {
                natcolorppm = 'green';
            }

            if (data.RTPPMDataMsgV1.RTPPMData.NationalPage.NationalPPM.PPM.rag == 'A') {
                natcolorppm = 'yellow';
            }

            if (data.RTPPMDataMsgV1.RTPPMData.NationalPage.NationalPPM.RollingPPM.rag == 'G') {
                natcolorrppm = 'green';
            }

            if (data.RTPPMDataMsgV1.RTPPMData.NationalPage.NationalPPM.RollingPPM.rag == 'A') {
                natcolorrppm = 'yellow';
            }


        fgwonlysmall_output += '<td class="cell' + natcolorppm + '">' + data.RTPPMDataMsgV1.RTPPMData.NationalPage.NationalPPM.PPM.text + '</td>';
        fgwonlysmall_output += '<td class="cell' + natcolorppm + '">' + data.RTPPMDataMsgV1.RTPPMData.NationalPage.NationalPPM.RollingPPM.text + '</td>';

        fgwonlysmall_output += '</tr>';

        fgwonlysmall_output += "</tbody>";
        fgwonlysmall_output += "</table>";


        // load the content into placeholder2 div
        $("#fgwonlysmall").html(fgwonlysmall_output);
        // End FGW


        // Start FGW trains only display
        var fgwsumtrains_output = '<table cellspacing="0" width="99%">';
        fgwsumtrains_output += "<thead>";
        fgwsumtrains_output += "<tr>";
        fgwsumtrains_output += '<th>Total Trains</th>';
        fgwsumtrains_output += '<th>Trains on Time</th>';
        fgwsumtrains_output += '<th>Late</th>';
        fgwsumtrains_output += '<th>Cancelled</th>';
        fgwsumtrains_output += "</tr>";
        fgwsumtrains_output += "</thead>";
        fgwsumtrains_output += "<tbody>";

        // Start loop of operators, loopcount is used to allocate 2 operators per line //
        fgwsumtrains_output += "<tr>";
        var loopcount = 0;

        for (var i in data.RTPPMDataMsgV1.RTPPMData.OperatorPage) {
            if (data.RTPPMDataMsgV1.RTPPMData.OperatorPage[i].Operator.code == '25') {
                fgwsumtrains_output += '<td>' + data.RTPPMDataMsgV1.RTPPMData.OperatorPage[i].Operator.Total + '</td>';
                fgwsumtrains_output += '<td>' + data.RTPPMDataMsgV1.RTPPMData.OperatorPage[i].Operator.OnTime + '</td>';
                fgwsumtrains_output += '<td>' + data.RTPPMDataMsgV1.RTPPMData.OperatorPage[i].Operator.Late + '</td>';
                fgwsumtrains_output += '<td>' + data.RTPPMDataMsgV1.RTPPMData.OperatorPage[i].Operator.CancelVeryLate + '</td>';
                fgwsumtrains_output += "</tr>";
            }
        }

        fgwsumtrains_output += "</tbody>";
        fgwsumtrains_output += "</table>";

        $("#fgwsumtrains").html(fgwsumtrains_output);
        // End FGW trains only display

        // Start FGW only display
        var fgwdetail_output = '<table cellspacing="0" width="99%">';
        fgwdetail_output += "<thead>";
        fgwdetail_output += "<tr>";
        fgwdetail_output += "<th></th>";
        fgwdetail_output += "<th width='20%'>PPM</th>";
        fgwdetail_output += "<th width='20%'>2hrs</th>";
        fgwdetail_output += "</tr>";
        fgwdetail_output += "</thead>";
        fgwdetail_output += "<tbody>";

        // Start loop of operators, loopcount is used to allocate 2 operators per line //
        fgwdetail_output += "<tr>";
        var loopcount = 0;

        for (var i in data.RTPPMDataMsgV1.RTPPMData.OperatorPage) {
            if (data.RTPPMDataMsgV1.RTPPMData.OperatorPage[i].Operator.code == '25') {
                var operatorcolorppm = 'red';
                var operatorcolorrppm = 'red';

                if (data.RTPPMDataMsgV1.RTPPMData.OperatorPage[i].Operator.PPM.rag == 'G') {
                    operatorcolorppm = 'green';
                }

                if (data.RTPPMDataMsgV1.RTPPMData.OperatorPage[i].Operator.PPM.rag == 'A') {
                    operatorcolorppm = 'yellow';
                }

                if (data.RTPPMDataMsgV1.RTPPMData.OperatorPage[i].Operator.RollingPPM.rag == 'G') {
                    operatorcolorrppm = 'green';
                }

                if (data.RTPPMDataMsgV1.RTPPMData.OperatorPage[i].Operator.RollingPPM.rag == 'A') {
                    operatorcolorrppm = 'yellow';
                }


                fgwdetail_output += '<td>' + data.RTPPMDataMsgV1.RTPPMData.OperatorPage[i].Operator.name +'</td>';
                fgwdetail_output += '<td class="cell' + operatorcolorppm + '">' + data.RTPPMDataMsgV1.RTPPMData.OperatorPage[i].Operator.PPM.text + '</td>';
                fgwdetail_output += '<td class="cell' + operatorcolorrppm + '">' + data.RTPPMDataMsgV1.RTPPMData.OperatorPage[i].Operator.RollingPPM.text + '</td>';
                fgwdetail_output += "</tr>";
            }
        }
        fgwdetail_output += "</tbody>";
        fgwdetail_output += "</table>";


        // load the content into placeholder2 div
        $("#fgwdetail").html(fgwdetail_output);
        // End FGW



        // NR message

        var nrmessage_output = '<table cellspacing="0" width="99%">';
        nrmessage_output += "<tr>";
        nrmessage_output += "<td>" + data.RTPPMDataMsgV1.RTPPMData.NationalPage.WebMsgOfMoment + "</td>";
        nrmessage_output += "</tr>";

        nrmessage_output += "</tbody>";
        nrmessage_output += "</table>";
        $(".nrmessage").html(nrmessage_output);

        // End NR message

        var placeholder1_output = '<table cellspacing="0" width="99%">';
        placeholder1_output += "<thead>";
        placeholder1_output += "<tr>";
        placeholder1_output += "<th>Operator</th>";
        placeholder1_output += "<th width='20%'>PPM</th>";
        placeholder1_output += "<th width='20%'>PPM (2 hours)</th>";
        placeholder1_output += "</tr>";
        placeholder1_output += "</thead>";
        placeholder1_output += "<tbody>";

        // Start loop of operators, loopcount is used to allocate 2 operators per line //
        placeholder1_output += "<tr>";

        for (var i in data.RTPPMDataMsgV1.RTPPMData.NationalPage.Operator) {
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


            placeholder1_output += '<td>' + data.RTPPMDataMsgV1.RTPPMData.NationalPage.Operator[i].name + ' ' + data.RTPPMDataMsgV1.RTPPMData.NationalPage.Operator[i].keySymbol +'</td>';
            placeholder1_output += '<td class="cell' + operatorcolorppm + '">' + data.RTPPMDataMsgV1.RTPPMData.NationalPage.Operator[i].PPM.text + '</td>';
            placeholder1_output += '<td class="cell' + operatorcolorrppm + '">' + data.RTPPMDataMsgV1.RTPPMData.NationalPage.Operator[i].RollingPPM.text + '</td>';
            placeholder1_output += '</tr>';
        }
        placeholder1_output += "</tbody>";
        placeholder1_output += "</table>";

        // load the content into placeholder2 div
        $("#placeholder1").html(placeholder1_output);


        var opplaceholder2_output = '<table cellspacing="0" width="99%">';
        opplaceholder2_output += "<thead>";
        opplaceholder2_output += "<tr>";
        opplaceholder2_output += "<th>Operator</th>";
        opplaceholder2_output += "<th width='20%'>PPM</th>";
        opplaceholder2_output += "<th width='20%'>PPM (2 hours)</th>";
        opplaceholder2_output += "</tr>";
        opplaceholder2_output += "</thead>";
        opplaceholder2_output += "<tbody>";

        // Start loop of operators, loopcount is used to allocate 2 operators per line //
        opplaceholder2_output += "<tr>";
        var loopcount = 0;

        for (var i in data.RTPPMDataMsgV1.RTPPMData.OperatorPage) {
            if (data.RTPPMDataMsgV1.RTPPMData.OperatorPage[i].Operator.code == '25') {
                for (var j in data.RTPPMDataMsgV1.RTPPMData.OperatorPage[i].OprServiceGrp) {
                    var operatorcolorppm = 'red';
                    var operatorcolorrppm = 'red';

                    if (data.RTPPMDataMsgV1.RTPPMData.OperatorPage[i].OprServiceGrp[j].PPM.rag == 'G') {
                        operatorcolorppm = 'green';
                    }

                    if (data.RTPPMDataMsgV1.RTPPMData.OperatorPage[i].OprServiceGrp[j].PPM.rag == 'A') {
                        operatorcolorppm = 'yellow';
                    }

                    if (data.RTPPMDataMsgV1.RTPPMData.OperatorPage[i].OprServiceGrp[j].RollingPPM.rag == 'G') {
                        operatorcolorrppm = 'green';
                    }

                    if (data.RTPPMDataMsgV1.RTPPMData.OperatorPage[i].OprServiceGrp[j].RollingPPM.rag == 'A') {
                        operatorcolorrppm = 'yellow';
                    }


                    opplaceholder2_output += '<td>' + data.RTPPMDataMsgV1.RTPPMData.OperatorPage[i].OprServiceGrp[j].name +'</td>';
                    opplaceholder2_output += '<td class="cell' + operatorcolorppm + '">' + data.RTPPMDataMsgV1.RTPPMData.OperatorPage[i].OprServiceGrp[j].PPM.text + '</td>';
                    opplaceholder2_output += '<td class="cell' + operatorcolorrppm + '">' + data.RTPPMDataMsgV1.RTPPMData.OperatorPage[i].OprServiceGrp[j].RollingPPM.text + '</td>';
                    opplaceholder2_output += "</tr>";
                }
            }
        }
        opplaceholder2_output += "</tbody>";
        opplaceholder2_output += "</table>";


        // load the content into placeholder2 div
        $("#opplaceholder2").html(opplaceholder2_output);


    });

});