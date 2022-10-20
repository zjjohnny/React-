import OderForm from "../../../components/OderForm"
import OderTable from "../../../components/OderTable";
import "./index.scss";

const Order = () => {
    return (
      <div className="container-order">

      <OderForm />
      <OderTable/>
      
    </div>
      );
};

export default Order;