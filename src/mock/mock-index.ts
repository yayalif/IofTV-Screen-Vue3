import Mock from "mockjs";
//处理路径传参
import { parameteUrl } from "@/utils/query-param"

function ArrSet(Arr: any[], id: string): any[] {
    let obj: any = {}
    const arrays = Arr.reduce((setArr, item) => {
        obj[item[id]] ? '' : (obj[item[id]] = true && setArr.push(item))
        return setArr
    }, [])
    return arrays
}
/**
* @description: min ≤ r ≤ max  随机数
* @param {*} Min
* @param {*} Max
* @return {*}
*/
function RandomNumBoth(Min: any, Max: any) {
    var Range = Max - Min;
    var Rand = Math.random();
    var num = Min + Math.round(Rand * Range); //四舍五入
    return num;
}
const names = ['兴平收费站', '咸阳南收费站', '宝鸡西收费站', '南寨收费站', '陇县收费站', '凤县服务区北区',
    '凤县服务区南区', '朱雀停车区', '朱雀收费站', '皇冠收费站', '上元观收费站',
    '洋县收费站', '汉中北收费站', '汉滨南服务区东区', '安康收费站15T',
    '安康收费站20T', '恒口收费站', '蒲溪收费站', '池河收费站', '富平收费站',
    '孙镇收费站', '澄城收费站', '龙门收费站', '禹门口收费站', '南沙停车区',
    '蔺店收费站', '卤阳湖收费站', '太乙宫安检站', '汉滨南服务区西区'];
//左中
export default [
    {
        url: "/bigscreen/countUserNum",
        type: "get",
        response: () => {
            const a = Mock.mock({
                success: true,
                data: {
                    offlineNum: '@integer(50, 100)',
                    alarmNum: '@integer(20, 100)',
                    lockNum: '@integer(10, 50)',
                    totalNum: 368
                }
            })
            a.data.onlineNum = a.data.totalNum - a.data.offlineNum - a.data.lockNum - a.data.alarmNum
            return a
        },
    },
    {
        url: "/bigscreen/countDeviceNum",
        type: "get",
        response: () => {
            const a = Mock.mock({
                success: true,
                data: {
                    alarmNum: '@integer(100, 1000)',
                    offlineNum: '@integer(0, 50)',
                    totalNum: 698
                }
            })
            a.data.onlineNum = a.data.totalNum - a.data.offlineNum
            return a
        }
    },
    //左下
    {
        url: "/bigscreen/leftBottom",
        type: "get",
        response: () => {
            const currentDate = new Date().toISOString().split('T')[0];  // Get the current date in YYYY-MM-DD format

            const a = Mock.mock({
                success: true,
                data: {
                    "list|20": [
                        {
                            "provinceName|1": names,
                            cityName: '',
                            countyName: "",
                            createTime: currentDate,
                            deviceId: "6c512d754bbcd6d7cd86abce0e0cac58",
                            "gatewayno|+1": 10000,
                            "onlineState|1": [0, 1],

                        }
                    ]
                }
            })
            return a
        }
    },
    //用电量
    {
        url: "/bigscreen/energyConsum",
        type: "get",
        response: () => {
            const a = Mock.mock({
                success: true,
                data: {
                    dateList: ['2023-01', '2023-02', '2023-03', '2023-04', '2023-05', '2023-06', "2023-07"],
                    "numList|7": [
                        '@integer(400, 600)'
                    ],
                    "numList2|7": [
                        '@integer(400, 600)'
                    ]
                }
            })
            return a
        }
    },
    //用水量
    {
        url: "/bigscreen/waterConsum",
        type: "get",
        response: () => {
            const a = Mock.mock({
                success: true,
                data: {
                    dateList: ['2023-01', '2023-02', '2023-03', '2023-04', '2023-05', '2023-06', "2023-07"],
                    "numList|7": [
                        '@integer(300, 400)'
                    ],
                    "numList2|7": [
                        '@integer(300, 400)'
                    ]
                }
            })
            return a
        }
    },
    //右上
    {
        url: "/bigscreen/alarmNum",
        type: "get",
        response: () => {
            const a = Mock.mock({
                success: true,
                data: {
                    dateList: ['2023-01', '2023-02', '2023-03', '2023-04', '2023-05', '2023-06', "2023-07"],
                    "numList|7": [
                        '@integer(300, 400)'
                    ],
                    "numList2|7": [
                        '@integer(300, 400)'
                    ]
                }
            })
            return a
        }
    },
    //右中
    {
        url: "/bigscreen/ranking",
        type: "get",
        response: () => {
            const names = ['兴平收费站', '咸阳南收费站', '宝鸡西收费站', '南寨收费站', '陇县收费站', '凤县服务区北区',
                '凤县服务区南区', '朱雀停车区', '朱雀收费站', '皇冠收费站', '上元观收费站',
                '洋县收费站', '汉中北收费站', '汉滨南服务区东区', '安康收费站15T',
                '安康收费站20T', '恒口收费站', '蒲溪收费站', '池河收费站', '富平收费站',
                '孙镇收费站', '澄城收费站', '龙门收费站', '禹门口收费站', '南沙停车区',
                '蔺店收费站', '卤阳湖收费站', '太乙宫安检站', '汉滨南服务区西区'];
            // let num = Mock.mock({ "list|80": [{ value: "@integer(50,1000)", name: "@city()" }] }).list
            let num = Mock.mock({ "list|80": [{ value: "@integer(10,100)", "name|1": names }] }).list
            //   console.log("ranking",num);
            let newNum: any = [], numObj: any = {}
            num.map((item: any) => {
                if (!numObj[item.name] && newNum.length < 8) {
                    numObj[item.name] = true
                    newNum.push(item)
                }
            })
            let arr = newNum.sort((a: any, b: any) => {
                return b.value - a.value
            })
            let a = {
                success: true,
                data: arr
            }
            return a
        }
    },
    //右下
    {
        url: "/bigscreen/rightBottom",
        type: "get",
        response: () => {
            const a = Mock.mock({
                success: true,
                data: {
                    "list|40": [{
                        alertdetail: "@csentence(5,10)",
                        "alertname|1": ["水浸告警", "各种报警"],
                        alertvalue: "@float(60, 200)",
                        createtime: "2022-04-19 08:38:33",
                        deviceid: null,
                        "gatewayno|+1": 10000,
                        phase: "A1",
                        sbInfo: "@csentence(10,18)",
                        "terminalno|+1": 100,
                        provinceName: "@province()",
                        cityName: '@city()',
                        countyName: "@county()",
                    }],

                }
            })
            return a
        }
    },
    //设备概况
    {
        url: "/bigscreen/installationPlan",
        type: "get",
        response: () => {
            const category = ['西禹分公司', '西富分公司', '延定分公司', '白泉分公司', '西安外环分公司', '西渭分公司',
            '宜富分公司', '西宝分公司', '安平分公司', '西安绕城分公司', '宝天分公司', '神府分公司', '榆靖分公司', '商漫分公司'
            , '咸铜分公司', '延延分公司', '蓝商分公司', '西延分公司', '宝川分公司', '西商分公司', '榆吴分公司', '西长分公司',
            '宝鸡分公司', '西镇分公司', '汉宁分公司', '子定分公司', '商界分公司', '西汉分公司', '西略分公司', '安川分公司'];
            // let num = RandomNumBoth(26, 32);
            let num = 30;
            const a = Mock.mock({
                // ["category|" + num]: ["@city()"],    
                category: category,
                ["barData|" + num]: ["@integer(10, 100)"],//正常
                ["lineData|" + num]: ["@integer(10, 20)"],//正常
                ["rateData|" + num]: ["@integer(0, 10)"],//正常

            })
            // let lineData = [], rateData = [];
            // for (let index = 0; index < num; index++) {
            //     let lineNum = Mock.mock('@integer(0, 100)') + a.barData[index]
            //     lineData.push(lineNum)
            //     let rate = a.barData[index] / lineNum;
            //     rateData.push((rate * 100).toFixed(0))
            // }
            // a.lineData = lineData//报警
            // a.rateData = rateData//离线
            return {
                success: true,
                data: a
            }
        }
    },
    {
        url: "/bigscreen/centerMap",
        type: "get",
        response: (options: any) => {
            let params = parameteUrl(options.url)
            //不是中国的时候
            if (params.regionCode && !["china"].includes(params.regionCode)) {
                const a = Mock.mock({
                    success: true,
                    data: {
                        "dataList|100": [
                            {
                                name: "@city()",
                                value: '@integer(1, 1000)'
                            }
                        ],
                        regionCode: params.regionCode,//-代表中国
                    }
                })
                return a
            } else {
                const a = Mock.mock({
                    success: true,
                    data: {
                        "dataList|12": [
                            {
                                name: "@province()",
                                value: '@integer(1, 1100)'
                            }
                        ],
                        regionCode: 'china',
                    }
                })
                // 去重
                a.data.dataList = ArrSet(a.data.dataList, "name")
                return a
            }
        }
    }
];

