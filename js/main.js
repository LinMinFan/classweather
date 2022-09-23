
let dataurl = "https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-7CA9B5E5-395F-42CC-92A8-197AA3780FD7";

const hourAyyay=new Array;
hourAyyay[0]="凌晨";
hourAyyay[6]="白天";
hourAyyay[12]="下午";
hourAyyay[18]="晚上";
//console.log(hourAyyay);




function getweather(id) {
    $.get(dataurl, function (res) {
        let weather_title=res.records.datasetDescription;
        let data = res.records.location; //各縣市完整資料
        //console.log(res.records.location);
        //-----------------//
    
        //縣市
        let counts = data.length //資料筆數
        //console.log(counts);
        let area = data[id].locationName; //選取地區
        //console.log(area);
        let areaname = data[id].locationName //地區名1
        //console.log(areaname);
        let weatheerdata = data[id].weatherElement //天氣資訊
        //console.log(weatheerdata);
        //---------天氣現象 / weatheerdata[0]------------
        //開始時間
        let wxstart0 = weatheerdata[0].time[0].startTime; //2
        let wxstart1 = weatheerdata[0].time[1].startTime;
        let wxstart2 = weatheerdata[0].time[2].startTime;
        //轉換時間
        const time0 =new Date(wxstart0)
        const time1 =new Date(wxstart1)
        const time2 =new Date(wxstart2)
        
        let timetext0=`
        ${time0.getFullYear()} / ${time0.getMonth()} / ${time0.getDate()} / ${time0.getHours()}
        `;
        let timetext1=`
        ${time1.getFullYear()} / ${time1.getMonth()} / ${time1.getDate()} / ${time1.getHours()}
        `;
        let timetext2=`
        ${time2.getFullYear()} / ${time2.getMonth()} / ${time2.getDate()} / ${time2.getHours()}
        `;

        const icontext0 = (time0.getHours() == 6 || time0.getHours() == 12)?"day":"night";
        const icontext1 = (time1.getHours() == 6 || time1.getHours() == 12)?"day":"night";
        const icontext2 = (time2.getHours() == 6 || time2.getHours() == 12)?"day":"night";


        //結束時間
        let wxend0 = weatheerdata[0].time[0].endTime; //3
        let wxend1 = weatheerdata[0].time[1].endTime;
        let wxend2 = weatheerdata[0].time[2].endTime;
        //天氣狀態
        let parameterName0 = weatheerdata[0].time[0].parameter.parameterName; //4
        let parameterName1 = weatheerdata[0].time[1].parameter.parameterName;
        let parameterName2 = weatheerdata[0].time[2].parameter.parameterName;
        let parameterValue0 = weatheerdata[0].time[0].parameter.parameterValue; //參照代碼表 5
        let parameterValue1 = weatheerdata[0].time[1].parameter.parameterValue;
        let parameterValue2 = weatheerdata[0].time[2].parameter.parameterValue;
        //---------降雨率 / weatheerdata[1]------------
        let pop0 = weatheerdata[1].time[0].parameter.parameterName; // 百分比 6
        let pop1 = weatheerdata[1].time[1].parameter.parameterName;
        let pop2 = weatheerdata[1].time[2].parameter.parameterName;
        //---------最低溫度 / weatheerdata[2]------------
        let MinT0 = weatheerdata[2].time[0].parameter.parameterName; //7
        let MinT1 = weatheerdata[2].time[1].parameter.parameterName;
        let MinT2 = weatheerdata[2].time[2].parameter.parameterName;
        //---------最高溫度 / weatheerdata[4]------------
        let MaxT0 = weatheerdata[4].time[0].parameter.parameterName; //8
        let MaxT1 = weatheerdata[4].time[1].parameter.parameterName;
        let MaxT2 = weatheerdata[4].time[2].parameter.parameterName;

        $('#weather_title').text(weather_title);
        $('tr>th').eq(2).text("0~12小時");
        $('tr>th').eq(3).text("12~24小時");
        $('tr>th').eq(4).text("24~36小時");
        $('tbody').append(`
        <tr>
        <td>${id}</td>
        <td>${area}</td>
        <td>
        <p>${wxstart0}</p>
        <p>${parameterName0}</p>
        <img src="./img/${icontext0}/${parameterValue0}.svg" style='width:50px;'>
        <span>降雨率：${pop0}%</span>
        <p>
        <span style='color:#00f;margin:0 10px;'><i class="fa-solid fa-temperature-arrow-down"></i>${MinT0}</span>
        <span style='color:#f00;margin:0 10px;'><i class="fa-solid fa-temperature-arrow-up"></i>${MaxT0}</span>
        </p>
        </td>
        <td>
        <p>${wxstart1}</p>
        <p>${parameterName1}</p>
        <img src="./img/${icontext1}/${parameterValue1}.svg" style='width:50px;'>
        <span>降雨率：${pop1}%</span>
        <p>
        <span style='color:#00f;margin:0 10px;'><i class="fa-solid fa-temperature-arrow-down"></i>${MinT1}</span>
        <span style='color:#f00;margin:0 10px;'><i class="fa-solid fa-temperature-arrow-up"></i>${MaxT1}</span>
        </p>
        </td>
        <td>
        <p>${wxstart2}</p>
        <p>${parameterName2}</p>
        <img src="./img/${icontext2}/${parameterValue2}.svg" style='width:50px;'>
        <span>降雨率：${pop2}%</span>
        <p>
        <span style='color:#00f;margin:0 10px;'><i class="fa-solid fa-temperature-arrow-down"></i>${MinT2}</span>
        <span style='color:#f00;margin:0 10px;'><i class="fa-solid fa-temperature-arrow-up"></i>${MaxT2}</span>
        </p>
        </td>
        </tr>`)
    
    })
}

for (let i = 0; i < 22; i++) {
    getweather(i)
}