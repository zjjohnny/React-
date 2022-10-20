import Header from "../../components/Header/Header";
import Naverbar from "./Naverbar/Naverbar";
import { Outlet } from "react-router-dom";
import "../../App.css";
// 获取当前运行的环境
const env = process.env.NODE_ENV;
// 线上环境禁用控制台
if (env === "production") {
  console.log = () => {};
}

function App() {
  return (
    <div className="content">
      <div>
        <Header />
      </div>
      <div className="box1">
        <Naverbar className="bar"></Naverbar>
        <div className="box2">
          <Outlet className="contentqq" />
        </div>
      </div>
    </div>
  );
}
export default App;
