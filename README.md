# open-data-taipei

### 公車
- [公車路線圖資訊](http://data.taipei/bus/ROUTE)

| 屬性 | 說明 |
|---|---|
| Id | 路線代碼 |
| providerId | 業者代碼 |
| providerName | 業者中文名稱 |
| nameZh | 中文名稱 |
| nameEn | 英文名稱 |
| pathAttributeId | 所屬附屬路線 ID |
| pathAttributeName | 所屬附屬路線中文名稱 |
| pathAttributeEname | 所屬附屬路線英文名稱
| buildPeriod | 建置時間，分為 1：1 期、2：2 期、3：3 期、9：非動態資料、10：北縣 |
| departureZh | 去程第 1 站; 起站中文名稱 |
| departureEn | 去程第 1 站; 起站英文名稱 |
| destinationZh | 回程第 1 站; 訖站中文名稱 |
| destinationEn | 回程第 1 站; 訖站英文名稱 |
| realSequence | 核定總班次 |
| distance | 總往返里程(公里/全程) |
| goFirstBusTime | 站牌顯示時使用，去程第一班發車時間(hhmm) |
| backFirstBusTime | 站牌顯示時使用，回程第一班發車時間(hhmm) |
| goLastBusTime | 站牌顯示時使用，去程最後一班發車時間(hhmm) |
| backLastBusTime | 站牌顯示時使用，回程最後一班發車時間(hhmm) |
| peakHeadway | 站牌顯示時使用，尖峰時段發車間隔(hhmm OR mm) |
| offPeakHeadway | 站牌顯示時使用，離峰時段發車間隔(hhmm OR mm) |
| busTimeDesc | 平日頭末班描述 |
| holidayGoFirstBusTime | 假日站牌顯示時使用，去程第一班發車時間(HHmm) |
| holidayBackFirstBusTime | 假日站牌顯示時使用，回程第一班發車時間(HHmm) |
| holidayGoLastBusTime | 假日站牌顯示時使用，去程最後一班發車時間(HHmm) |
| holidayBackLastBusTime | 假日站牌顯示時使用，回程最後一班發車時間(HHmm) |
| holidayBusTimeDesc | 假日頭末班描述 |
| headwayDesc | 平日發車間距描述 |
| holidayPeakHeadway | 假日站牌顯示時使用，尖峰時段發車間隔(mmmm OR mm) |
| holidayOffPeakHeadway | 假日站牌顯示時使用，離峰時段發車間隔(mmmm OR mm) |
| holidayHeadwayDesc | 假日發車間距描述 |
| segmentBufferZh | 分段緩衝區(中文) |
| segmentBufferEn 分段緩衝區(英文) |
| ticketPriceDescriptionZh | 票價描述(中文) |
| ticketPriceDescriptionEn | 票價描述(英文) |

- [公車站牌資訊](http://data.taipei/bus/Stop)
- [公車預估到站時間](http://data.taipei/bus/EstimateTime)
- [公車路線、營業站對應](http://data.taipei/bus/OrgPathAttribute)
- [公車車輛基本資訊](http://data.taipei/bus/CarInfo)
- [公車路線線型開放格式](http://data.taipei/bus/ROUTEGeom)
- [公車動態資訊(總索引)](http://data.taipei/opendata/datalist/datasetMeta?oid=d384ad18-1d77-4475-aa2a-34aa8fadafad)

### UBike

資料欄位說明
- sno：站點代號
- sna：場站名稱(中文)
- tot：場站總停車格
- sbi：場站目前車輛數量
- sarea：場站區域(中文)
- mday：資料更新時間
- lat：緯度
- lng：經度
- ar：地(中文)
- sareaen：場站區域(英文)
- snaen：場站名稱(英文)
- aren：地址(英文)
- bemp：空位數量
- act：全站禁用狀態
[臺北市公共自行車即時資訊](http://data.taipei/youbike)

### 停車場
[停車場資訊](http://data.taipei/tcmsv/alldesc)
[停車場剩餘停車位數](http://data.taipei/tcmsv/allavailable)

### All
[臺北市政府 交通即時資料 開放資料專區](https://taipeicity.github.io/traffic_realtime/)