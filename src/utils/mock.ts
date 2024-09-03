// 测试数据
export const getTestData = (type: string) => {
	switch (type) {
		case "pw":
			return `{
    "PowerTable": [
        {
            "Device": "设备A",
            "DateTime": "2023-08-14 08:00:00",
            "DayValue": 50.2,
            "StartValue": 100.5,
            "StopValue": 150.7,
            "TopValue": 10.3,
            "HighValue": 20.1,
            "NormalValue": 15.6,
            "LowValue": 4.2
        },
        {
            "Device": "设备B",
            "DateTime": "2023-08-14 09:00:00",
            "DayValue": 48.7,
            "StartValue": 75.2,
            "StopValue": 124.0,
            "TopValue": 9.8,
            "HighValue": 18.5,
            "NormalValue": 14.2,
            "LowValue": 6.2
        },
        {
            "Device": "设备C",
            "DateTime": "2023-08-14 10:00:00",
            "DayValue": 55.3,
            "StartValue": 50.1,
            "StopValue": 105.4,
            "TopValue": 11.5,
            "HighValue": 22.3,
            "NormalValue": 17.9,
            "LowValue": 3.6
        },
        {
            "Device": "设备X",
            "DateTime": "2023-08-14 11:00:00",
            "DayValue": 62.8,
            "StartValue": 112.3,
            "StopValue": 175.1,
            "TopValue": 12.9,
            "HighValue": 24.7,
            "NormalValue": 19.3,
            "LowValue": 5.9
        },
        {
            "Device": "设备Y",
            "DateTime": "2023-08-14 12:00:00",
            "DayValue": 51.5,
            "StartValue": 88.7,
            "StopValue": 140.2,
            "TopValue": 10.7,
            "HighValue": 21.4,
            "NormalValue": 16.8,
            "LowValue": 2.6
        },
        {
            "Device": "设备Z",
            "DateTime": "2023-08-14 13:00:00",
            "DayValue": 58.2,
            "StartValue": 42.0,
            "StopValue": 100.9,
            "TopValue": 11.2,
            "HighValue": 20.9,
            "NormalValue": 18.5,
            "LowValue": 7.6
        }
    ]
}`;
		case "de":
			return `{
    "Receipe": "配方名称1",
    "DateTime": "2023-08-14 10:00:00",
    "Order": "生产订单001",
    "RawTable": [
        {
            "RawName": "原料1",
            "BatchWeight": "100 kg",
            "Batches": 5,
            "Target": "500 kg",
            "AccTarget": "490 kg",
            "Error": "10 kg"
        },
        {
            "RawName": "原料2",
            "BatchWeight": "50 kg",
            "Batches": 3,
            "Target": "150 kg",
            "AccTarget": "145 kg",
            "Error": "5 kg"
        },
        {
            "RawName": "原料3",
            "BatchWeight": "30 kg",
            "Batches": 2,
            "Target": "60 kg",
            "AccTarget": "58 kg",
            "Error": "2 kg"
        },
        {
            "RawName": "原料4",
            "BatchWeight": "75 kg",
            "Batches": 2,
            "Target": "150 kg",
            "AccTarget": "148 kg",
            "Error": "2 kg"
        },
        {
            "RawName": "原料5",
            "BatchWeight": "45 kg",
            "Batches": 3,
            "Target": "135 kg",
            "AccTarget": "132 kg",
            "Error": "3 kg"
        },
        {
            "RawName": "原料6",
            "BatchWeight": "60 kg",
            "Batches": 5,
            "Target": "300 kg",
            "AccTarget": "305 kg",
            "Error": "-5 kg"
        }
    ]
}`;
		default:
			return "";
	}
};