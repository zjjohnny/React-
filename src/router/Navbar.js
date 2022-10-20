// 对象
import { BarChartOutlined, ContainerOutlined, ShoppingCartOutlined, SelectOutlined, UserOutlined, TeamOutlined, MoneyCollectOutlined, SettingOutlined,
  MessageOutlined } from '@ant-design/icons';

  // 
export default [
  // 这里布局和路由文件一样
  {
    path: '/main/*',
    name: '监控分析',
    icon: <BarChartOutlined />,
    children: [
      {
        path: 'operate',
        name: '运营监控',
        flag: '1'
      }, {
        path: 'userAnalysis',
        name: '用户分析',
        flag: '2'
      }, {
        path: 'tradeAnalysis',
        name: '交易分析',
        flag: '3'
      }, {
        path: 'headerAnalysis',
        name: '团长分析',
        flag: '4'
      }, {
        path: 'goodsAnalysis',
        name: '商品分析',
        flag: '5'
      }
    ]
  }, {
    path: 'about1',
    name: '订单',
    icon: <ContainerOutlined />,
    children: [
      {
        path: "Order",
        name: "订单管理",
        flag: '6'
      },
      {
        path: "Aftermarket",
        name: "售后管理",
        flag: '7'
      },
      {
        path: 'sendout',
        name: '发货管理',
        flag: '8'
      },
    ]
  },
  {
    path: 'about2',
    name: '商品',
    icon: <ShoppingCartOutlined />,
    children: [
      {
        path: "commoditymana",
        name: "商品管理",
        flag: '9'
      },
      {
        path: "stocklog",
        name: "库存记录",
        flag: '10'
      }, {
        path: 'sortmana',
        name: '分类管理',
        flag: '11'
      },
      {
        path: "grandmana",
        name: "品牌管理",
        flag: '12'
      }, {
        path: "tagmana",
        name: "标签管理",
        flag: '13'
      }
    ]
  },
  {
    path: 'about9',
    name: '内容',
    icon: <MessageOutlined />,
    children: [
      {
        path: "thematic",
        name: "专题管理",
        flag: '14'
      }, {
        path: 'adManage',
        name: '广告管理',
        flag: '15'
      },
      {
        path: "freestyle",
        name: "平台资料",
        flag: '16'
      }, {
        path: "hotWord",
        name: "搜索热词",
        flag: '17'
      }
    ]
  },
  {
    path: 'YunYin',
    name: '运营',
    icon: <SelectOutlined />,
    children: [
      {
        path: "Yyms",
        name: "秒杀",
        flag: ' 18'
      },
      {
        path: "Yypt",
        name: "拼团",
        flag: '19'
      }, {
        path: 'YyYouHuiQuan',
        name: '发货优惠券管理',
        flag: '20'
      },
      {
        path: "YyMj",
        name: "满减",
        flag: '21'
      },
    ]
  },
  {
    path: 'aboutaaaaa',
    name: '用户',
    icon: <UserOutlined />,
    children: [
      {
        path: "users",
        name: "用户管理",
        flag: '22'
      },
      {
        path: "userlabel",
        name: "用户标签",
        flag: '23'
      },
    ]
  },
  {
    path: 'aboutbb',
    name: '团长',
    icon: <TeamOutlined />,
    children: [
      {
        path: "examine",
        name: "团长审核",
        flag: '24'
      },
      {
        path: "Administration",
        name: "团长管理",
        flag: '25'
      }, {
        path: 'laabel',
        name: '团长标签',
        flag: '26'
      },
    ]
  },
  {
    path: 'aboutrr',
    name: '财务',
    icon: <MoneyCollectOutlined />,
    children: [
      {
        path: "CommissionMass",
        name: "对账管理",
        flag: '27'
      },
      {
        path: "CommissionMa",
        name: "佣金明细",
        flag: '28'
      }, {
        path: 'Commission',
        name: '提现明细',
        flag: '29'
      },
    ]
  },
  {
    path: 'aboutqq',
    name: '系统',
    icon: <SettingOutlined />,
    children: [
      {
        path: "acess",
        name: "账号管理",
        flag: '30'
      },
      {
        path: "roles",
        name: "角色管理",
        flag: '31'
      }, {
        path: 'Operation',
        name: '操作日志',
        flag: '32'
      },
    ]
  }
]