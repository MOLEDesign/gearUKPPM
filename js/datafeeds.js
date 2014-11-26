function getPPM () {
    $.ajaxSetup({ cache: false });
    $.getJSON(db_server.server + 'output.json', function (data) {


        //Gather reusable values
        db_ppm.setItem('NationalPPM', data.RTPPMDataMsgV1.RTPPMData.NationalPage.NationalPPM.PPM.text);
        db_ppm.setItem('NationalRPPM', data.RTPPMDataMsgV1.RTPPMData.NationalPage.NationalPPM.RollingPPM.text);

        db_ppm.setItem('NationalPPMttl', data.RTPPMDataMsgV1.RTPPMData.NationalPage.NationalPPM.Total);
        db_ppm.setItem('NationalPPMontime', (data.RTPPMDataMsgV1.RTPPMData.NationalPage.NationalPPM.OnTime / data.RTPPMDataMsgV1.RTPPMData.NationalPage.NationalPPM.Total) * 100 |0);
        db_ppm.setItem('NationalPPMlate', (data.RTPPMDataMsgV1.RTPPMData.NationalPage.NationalPPM.Late / data.RTPPMDataMsgV1.RTPPMData.NationalPage.NationalPPM.Total) * 100 |0);
        db_ppm.setItem('NationalPPMvlate', (data.RTPPMDataMsgV1.RTPPMData.NationalPage.NationalPPM.CancelVeryLate / data.RTPPMDataMsgV1.RTPPMData.NationalPage.NationalPPM.Total) * 100 |0);




        // Get timestamp
        var epoch = parseInt(data.RTPPMDataMsgV1.timestamp)
        var myDate = new Date(epoch);
        db_ppm.setItem('PPMUpdated', myDate.toGMTString());

    });
};