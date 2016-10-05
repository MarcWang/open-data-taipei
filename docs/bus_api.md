# Bus API

### API 狀態碼

`0` - `SUCCESS` 執行成功
`-1` - `ERROR` 執行失敗

### `GET /api/taipei/bus/route/query`

**參數**

**回傳**

```json
{
    "code": 0,
    "result": {
        "routes": [
            { "name": "63", "id": 10847, "path": "起點-終點" },
            { "name": "小26", "id": 11143, "path": "起點-終點" }
        ]
    }
}
```

### `GET /api/taipei/bus/route/estimate`

**參數**

`name` - 公車路線中文名稱 (與 `id` 擇一，同時輸入以 `id` 為主要查詢)

`id` - 公車路線代碼 (與 `name` 擇一，同時輸入以 `id` 為主要查詢)

`goBack` - 1 = 回程; 0 = 去程

**回傳**

```json
{
    "code": 0,
    "result": {
        "path": "起點-終點",
        "goBack": 1,
        "updateTime": "",
        "stops": [{
            "name": "中山老人住宅",
            "id": "",
            "estimate": {
                "state": 0,
                "time": {
                    "minute": 3,
                    "second": 23
                }
            }
        }]
    }
}
```

### `GET /api/taipei/bus/stop/estimate`

**參數**

`name` - 公車站牌中文名稱 (與 `id` 擇一，同時輸入以 `id` 為主要查詢)

`id` - 公車站牌代碼 (與 `name` 擇一，同時輸入以 `id` 為主要查詢)

**回傳**