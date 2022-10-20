import {
  useRoutes
} from 'react-router-dom'

import Users from '../pages/yonghuguanli/users';
import Userlabel from '../pages/yonghuguanli/userlabel';


import Aftermarkent from '../pages/order/Aftermarkent/index'
import CommodityMana from '../pages/commodity/CommodityMana'
import StockLog from '../pages/commodity/StockLog'
import GrandMana from '../pages/commodity/GrandMana'
import TagMana from '../pages/commodity/TagMana'
import SortMana from '../pages/commodity/SortMana'
import CreateGoods from '../pages/commodity/CreateGoods';
import CheckGoods from '../pages/commodity/CheckGoods';

import Yyms from '../pages/YunYin/Yyms';
import Yypt from '../pages/YunYin/Yypt';
import YyYouHuiQuan from '../pages/YunYin/YyYouHuiQuan';
import YyMj from '../pages/YunYin/YyMj';
import Addms from '../pages/YunYin/Yyadd/Msadd';
import Addpt from '../pages/YunYin/Yyadd/Ptadd';
import Addquan from '../pages/YunYin/Yyadd/Addquan';
import Addmj from '../pages/YunYin/Yyadd/AddMj';

import Login from '../pages/page/Login/Login';
import Error from '../pages/page/Error/err';
import Operate from '../pages/monitorPll/operate/index';
import UserAnalysis from '../pages/monitorPll/userAnalysis/index';
import TradeAnalysis from '../pages/monitorPll/tradeAnalysis/index';
import HeaderAnalysis from '../pages/monitorPll/headerAnalysis/index';
import GoodsAnalysis from '../pages/monitorPll/goodsAnalysis/index';
import Queryuser from '../pages/yonghuguanli/users/queryuser';

import Main from '../pages/page/main';
import Access from '../pages/page/system/access';
import Roles from '../pages/page/system/roles'
import Operation from '../pages/page/system/Operation';
import Order from '../pages/order/Order/index';
import Addroles from '../pages/page/system/addroles';
import SendOut from '../pages/order/SendOut';
import OrderDetails from '../pages/order/OrderDetails/index';
import SendDetails from '../pages/order/SendDetails/index';
import Print from '../pages/order/Print/index';
// import Aftermarket from '../pages/order/Aftermarket/index';



import Freestyle from '../pages/page/Freestyle/Freestyle';
import EditFreestyle from '../pages/page/Freestyle/EditFreestyle';
import Thematic from '../pages/content/Thematic management/thematic';
import Ad from '../pages/content/Ad management/adManage';
import HotWord from '../pages/content/sreachWord/hotWord';
import Addth from '../pages/content/Thematic management/create/create'
import Examine from '../pages/regiment/Examine/examine';
import ChangePwd from '../pages/page/system/ChangePwd/ChangePwd';
import Administration from '../pages/regiment/Administration/Administration';
import Laabel from '../pages/regiment/Laable/laabel';
import Infromation from '../pages/regiment/Infromation/infromation';

import CommissionMa from '../pages/zzh/withdrawal/withdrawal'
import Commission from '../pages/zzh/commissionMa'
import CommissionMass from '../pages/zzh/commission/commissionMass'
const Routers = () => {
  return useRoutes([
    // 所有路由
    { path: '/', element: <Login />, name: '登录', auth: true }, //将 auth 设置为 true，表示该路由需要权限校验
    {
      path: '/error',
      element: <Error />
    },

    {
      // 重定向

      path: '/main/*', element: <Main />,
      children: [
        {
          path: 'acess',
          // 写权限的方法2，使用高阶函数返回组件
          element: <Access />
        },
        {
          path: 'roles',
          element: <Roles />
        }, {
          path: "Operation",
          element: <Operation />
        }, {
          path: 'Aftermarkent',
          element: <Aftermarkent />
        },{
          path:'Users',
          element:<Users/>
        },{
          path:'Userlabel',
          element:<Userlabel/>
        },
        {
          path: 'queryuser',
          element: <Queryuser />
        },
        {
          path: 'commoditymana',
          element: <CommodityMana />
        }, {
          path: 'stocklog',
          element: <StockLog />
        }, {
          path: 'grandmana',
          element: <GrandMana />
        }, {
          path: 'tagmana',
          element: <TagMana />
        }, {
          path: 'sortmana',
          element: <SortMana />
        }, {
          path: 'commoditymana/creategoods',
          element: <CreateGoods />
        }, {
          path: 'commoditymana/checkgoods',
          element: <CheckGoods />
        },
        {
          path: 'operate',
          element: <Operate />
        }, {
          path: 'userAnalysis',
          element: <UserAnalysis />
        }, {
          path: 'tradeAnalysis',
          element: <TradeAnalysis />
        }, {
          path: 'headerAnalysis',
          element: <HeaderAnalysis />
        }, {
          path: 'goodsAnalysis',
          element: <GoodsAnalysis />
        }, {
          path: 'Yyms',
          element: <Yyms />
        }, {
          path: 'Yypt',
          element: <Yypt />
        }, {
          path: 'YyYouHuiQuan',
          element: <YyYouHuiQuan />
        }, {
          path: 'YyMj',
          element: <YyMj />
        }, {
          path: 'Addms',
          element: <Addms />
        }, {
          path: 'Addpt',
          element: <Addpt />
        }, {
          path: 'Addquan',
          element: <Addquan />
        }, {
          path: 'Addmj',
          element: <Addmj />
        },
        {
          path: 'roles/addroles',
          element: <Addroles />
        }, {
          path: 'order',
          element: <Order />
        }, {
          path: 'sendout',
          element: <SendOut />
        }, {
          path: 'freestyle',
          element: <Freestyle />
        },
        {
          path: 'freestyleedit',
          element: <EditFreestyle />

        },
        {
          path: 'examine',
          element: <Examine />
        },
        {
          path: 'Administration',
          element: <Administration />
        },
        {
          path: 'laabel',
          element: <Laabel />
        },
        {
          path: 'Infromation',
          element: <Infromation />
        }, {
          path: 'thematic',
          element: <Thematic />
        }, {
          path: 'adManage',
          element: <Ad />
        }, {
          path: 'hotWord',
           element:<HotWord/>
          },{
            path: 'addTh',
            element: <Addth/>
          },
          {
            path: 'changePwd',
            element: <ChangePwd/>
          },
          {
            path: 'OrderDetails',
            element: <OrderDetails/>
          },
          {
            path: 'SendDetails',
            element: <SendDetails/>
          },
          {
            path: 'Print',
            element: <Print/>
          },
          {
            path: 'CommissionMa',
            element: <CommissionMa/>
          },
          {
            path: 'Commission',
            element: <Commission/>
          },
          {
            path: 'CommissionMass',
            element: <CommissionMass/>
          },
         
      ]
    },
    // 套写在父组件里面

    // 404
    // { path: '*', element: <Notfind /> }
  ])
}

export default Routers