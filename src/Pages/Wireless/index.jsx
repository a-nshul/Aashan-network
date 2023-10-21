import Header from "../../Component/Reusable/Header";
import Button from "../../Component/Reusable/Form/Button";
import Table2 from "../../Component/Reusable/Table2";
import WirlessModal from "../../Component/Modals/WirlessModal";
import { useState, useEffect } from "react";
import BackButton from "../../Component/Reusable/BackButton";
import axios from "axios";
import { apiEndpoints } from "../../Pages/Wireless/apiEndpoints"; 
function Wireless() {
  const [show, setShow] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const urls = [
          "http://localhost:3000/wifi-info",
          "http://localhost:3000/wifi-info",
          "http://localhost:3000/wifi-info",
          "http://localhost:3000/wifi-info",
          "http://localhost:3000/wifi-info",
        ];

        const requests = urls.map((url) => axios.get(url));

        const responses = await Promise.all(requests);

        // Extract and combine data from all responses into a single array
        const combinedData = responses.flatMap((response) => response.data);

        // Set fetched data to the state
        setTableData(combinedData);
      } catch (error) {
        console.error("API Error:", error);
      }
    };

    fetchAllData();
  }, []);
  
  
  
  const showWirlessContent = () => {
    if (show) {
      return (
        <>
          <BackButton setShow={setShow} />
          <WirlessModal
            show={show}
            type={"WIRELESS"}
            onHide={() => setShow(false)}
            //onSubmitButtonClick={handleRowSubmit}// Pass the submit function
            selectedRow={selectedRow} // Pass the selected row
            apiEndpoint={apiEndpoints[selectedRow.index]}
          />
        </>
      );
    } else {
      return (
        <Table2
          type={"WIRELESS"}
          dataList={tableData}
          isCheckbox={false}
          apiEndpoints={apiEndpoints} 
        />
      );
    }
  };
  return (
    <div className={"privateBody"}>
      <div className="row">
        <div className="col-sm-10">
          <Header type={"WIRELESS"} />
        </div>
      </div>
      {showWirlessContent()}
    </div>
  );
}

export default Wireless;
