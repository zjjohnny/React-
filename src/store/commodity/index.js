export default {
    /* 商品列表 */
    commodityList: [
        {
            key: 1,
            id: 1,
            goodsID: 1,
            goodsName: '商品1',
            originalPrice: 32,
            salePrice: 40,
            stockCount: 23,
            goodsTag: '标签1',
            goodsSort: '分类1',
            state: true,
        },
        {
            key: 2,
            id: 2,
            goodsID: 2,
            goodsName: '商品2',
            originalPrice: 20,
            salePrice: 25,
            stockCount: 20,
            goodsTag: '标签2',
            goodsSort: '分类2',
            state: false,
        },
        {
            key: 3,
            id: 3,
            goodsID: 3,
            goodsName: '商品3',
            originalPrice: 15,
            salePrice: 25,
            stockCount: 102,
            goodsTag: '标签3',
            goodsSort: '分类3',
            state: true,
        },
        {
            key: 4,
            id: 4,
            goodsID: 4,
            goodsName: '商品4',
            originalPrice: 26,
            salePrice: 35,
            stockCount: 20,
            goodsTag: '标签4',
            goodsSort: '分类4',
            state: true,
        },
        {
            key: 5,
            id: 5,
            goodsID: 5,
            goodsName: '商品5',
            originalPrice: 50,
            salePrice: 80,
            stockCount: 210,
            goodsTag: '标签5',
            goodsSort: '分类5',
            state: false,
        },
    ],
    /* 标签列表 */
    tagList: [
        {
            key:1,
            id: 1,
            tagName: '好货上新',
            tagSort: 1,
            tagState:'正常'
        },
        {
            key:2,
            id: 2,
            tagName: '品牌好货',
            tagSort: 1,
            tagState:'正常'
        },
        {
            key:3,
            id: 3,
            tagName: '百亿补贴',
            tagSort: 2,
            tagState:'正常'
        },
        {
            key:4,
            id: 4,
            tagName: '爆款低价',
            tagSort: 4,
            tagState:'正常'
        },
    ],
    /* 品牌列表 */
    grandList: [
        {
            key:1,
            id: 1,
            grandName: '农夫山泉',
            grandSort: 1,
            grandState: '正常',
            goods: [
                {
                    key: 1,
                    id: 1,
                    goodsID: 1,
                    goodsName: '商品1',
                    originalPrice: 32,
                    salePrice: 40,
                    stockCount: 23,
                    goodsTag: '标签1',
                    goodsSort: '分类1',
                    state: true,
                }
            ]
        },
        {
            key:2,
            id: 2,
            grandName: '可口可乐',
            grandSort: 1,
            grandState: '正常',
            goods:[]
        },
        {
            key:3,
            id: 3,
            grandName: '娃哈哈',
            grandSort: 2,
            grandState: '正常',
            goods:[]
        },
        {
            key:4,
            id: 4,
            grandName: '重庆啤酒',
            grandSort: 4,
            grandState: '正常',
            goods: [
                {
                    key: 1,
                    id: 1,
                    goodsID: 1,
                    goodsName: '商品1',
                    originalPrice: 32,
                    salePrice: 40,
                    stockCount: 23,
                    goodsTag: '标签1',
                    goodsSort: '分类1',
                    state: true,
                }
            ]
        },
    ],
    /* 库存列表 */
    stockList: [
        {
            goodsID: 1,
            deliveryTime: '2020-02-14 14:30:30',//出库时间
            goodsName: '电动牙刷',//商品名
            deliveryType: '生成订单',//出库类型
            orderType: '1200010010',
            deliveryCount: 100,//出库是数量
            surplusStock: 100,//剩余库存
            operator: 'admin',//操作人
            type:'delivery'//出库
        },{
            goodsID: 2,
            deliveryTime: '2020-02-14 14:30:30',//出库时间
            goodsName: '电动牙刷',//商品名
            deliveryType: '取消订单',//出库类型
            orderType: '1200010010',
            deliveryCount: 100,//出库是数量
            surplusStock: 100,//剩余库存
            operator: 'admin',//操作人
            type:'putIn'//入库
        },
    ],
    /* 禁用的商品 */
    get forbiddenList() {
        const result=[]
        for (let i = 0; i < this.commodityList.length; i++) {
            if (!this.commodityList[i].state) {
                console.log(this.commodityList[i]);
                result.push(this.commodityList[i]);
            }
        }
        return result;
    },
    /* 删除商品标签 */
    deleteGoodsTag(id) { 
        this.tagList = this.tagList.filter(item => item.id !== id);
    }
}