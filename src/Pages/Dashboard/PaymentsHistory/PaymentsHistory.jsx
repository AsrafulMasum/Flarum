import useAuth from "../../../Hooks/useAuth";
import useLoadSecureData from "../../../Hooks/useLoadSecureData";

const PaymentsHistory = () => {
  const { user } = useAuth();
  const url = `/payments/history/${user?.email}`;
  const { data:paymentsHistory } = useLoadSecureData(url);


  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Transaction Id</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {
              paymentsHistory?.map((history, idx) =>  <tr key={idx}>
              <th>{idx + 1}</th>
              <td>{history?.transactionId}</td>
              <td>$ {history?.price}</td>
              <td>{history?.status}</td>
            </tr>)
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentsHistory;
