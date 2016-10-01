# 台北市開放資料 (OpenData)

### 公車
- 公車路線圖資訊[`http://data.taipei/bus/ROUTE`](http://data.taipei/bus/ROUTE)

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
| segmentBufferEn | 分段緩衝區(英文) |
| ticketPriceDescriptionZh | 票價描述(中文) |
| ticketPriceDescriptionEn | 票價描述(英文) |

- 公車站牌資訊[`http://data.taipei/bus/Stop`](http://data.taipei/bus/Stop)

| 屬性 | 說明 |
|---|---|
| Id | 站牌代碼 |
| routeId | 所屬路線代碼 (主路線 ID) |
| nameZh | 中文名稱 |
| nameEn | 英文名稱 |
| seqNo | 於路線上的順序 |
| pgp | | 上下車站別 （-1：可下車、0：可上下車、1：可上車） |
| goBack | 去返程 （0：去程 / 1：返程 / 2：未知） |
| longitude | 經度 |
| latitude | 緯度 |
| address | 地址 |
| stopLocationId | 站位 ID |
| showLon | 顯示用經度 |
| showLat | 顯示用緯度 |
| vector | 向量角：0~359，預設為空白 |

- [公車預估到站時間](http://data.taipei/bus/EstimateTime)

| 屬性 | 說明 |
|---|---|
| RouteID | 路線代碼 (主路線ID) |
| StopID | 站牌代碼 |
| EstimateTime | 預估到站剩餘時間（單位：秒）-1：尚未發車 -2：交管不停靠 -3：末班車已過 -4：今日未營運  |
| GoBack | 去返程 （0：去程 1：返程 2：尚未發車 3：末班已駛離） |

- [公車路線、營業站對應](http://data.taipei/bus/OrgPathAttribute)
- [公車車輛基本資訊](http://data.taipei/bus/CarInfo)
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