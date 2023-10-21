// import React, { useState, useEffect } from "react";
// import { contentConstant } from "../../Constant/content";
// import WirlessModal from "../../Modals/WirlessModal";
// import Switch from "react-switch";
// import axios from "axios";
// import { message } from 'antd';

// function TableRow(props) {
//   const { row, apiEndpoint } = props;
  
//   const [showModal, setShowModal] = useState(false);
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [ssid, setSSID] = useState("");
//   const [security, setSecurity] = useState("");
//   const [rowStatus, setRowStatus] = useState(false);
//   const [selectedApiEndpoint, setSelectedApiEndpoint] = useState(null);
//   useEffect(() => {
//     setRowStatus(row.active);
//   }, [row]);

//   const handleUpdateClick = () => {
//     setShowModal(true);
//     setIsEditMode(true);
//     setSSID(row.SSID);
//     setSecurity(row.Security);
//     // props.setSelectedApiEndpoint(apiEndpoint); // Set the selected API endpoint
//     setSelectedApiEndpoint(row.apiEndpoint);
//   };
  
  
//   const handleDisableEnable = async () => {
//     try {
//       // Construct the API endpoint
//       const apiEndpoint = `http://myaasaan/cgi-bin/SSID${row.sequence}En-disable.sh`; // Update with the correct endpoint
  
//       // Define your request headers, including Content-Type and Origin
//       const headers = {
//         'Content-Type': 'application/json', // Adjust content type as needed
//       };
  
//       // Define the request data (if needed)
//       const requestData = {
//         // Your request data here
//       };
  
//       // Make the POST request with the specified method and headers
//       const response = await axios.post(apiEndpoint, requestData, {
//         headers: headers,
//         method: 'POST', // Set the HTTP method to POST
//       });
  
//       // Check the response status (e.g., 200 for success)
//       if (response.status === 200) {
//         // Handle a successful response here
  
//         // Toggle the status for the current row
//         setRowStatus(!rowStatus);
  
//         // Display a success message
//         message.success(`Successfully ${rowStatus ? 'enabled' : 'disabled'} the row.`);
//       } else {
//         // Handle any unexpected response status here
//         console.error('Unexpected response status:', response.status);
  
//         // Display an error message
//         message.error('Request failed. Please try again.');
//       }
//     } catch (error) {
//       console.error('API Error:', error);
//       if (error.response) {
//         console.error('Server Error Data:', error.response.data);
//       }
//       // Handle the error as needed
  
//       // Display an error message
//       message.error(`Failed to ${rowStatus ? 'enable' : 'disable'} the row. Please try again.`);
//     }
//   };

//   return (
//     <tr
//       style={{
//         backgroundColor: rowStatus ? "#000" : "#ccc",
//         color: rowStatus ? "#fff" : "inherit",
//       }}
//     ><td style={{ backgroundColor: rowStatus ? "#ccc" : "inherit", color: rowStatus ? "#808080" : "inherit" }}>{row.sequence}</td>
//       <td style={{ backgroundColor: rowStatus ? "#ccc" : "inherit", color: rowStatus ? "#808080" : "inherit" }}>{row.SSID}</td>
//       <td style={{ backgroundColor: rowStatus ? "#ccc" : "inherit", color: rowStatus ? "#808080" : "inherit" }}>{row.Active_Clients}</td>
//       <td style={{ backgroundColor: rowStatus ? "#ccc" : "inherit", color: rowStatus ? "#808080" : "inherit" }}>{row.Experience_dBm}</td>
//       <td style={{ backgroundColor: rowStatus ? "#ccc" : "inherit", color: rowStatus ? "#808080" : "inherit" }}>{row.Security}</td>
//       <td style={{ backgroundColor: rowStatus ? "#ccc" : "inherit", color: rowStatus ? "#808080" : "inherit" }}>{row.Channel}</td>
//       <td>
//         <button
//           className="btn btn-primary"
//           onClick={handleUpdateClick}
//           style={{ backgroundColor: rowStatus ? "#ccc" : "#70a0c6", color: rowStatus ? "#000" : "#FFFFFF", border: "1px solid #70a0c6" }}
//           disabled={rowStatus}
//         >
//           Update
//         </button>
//       </td>
//       <td>
//         <Switch
//          onChange={handleDisableEnable}
//           checked={!rowStatus}
//           onColor="#70a0c6"
//         />
//       </td>
//       {showModal && (
//         <WirlessModal
//           show={showModal}
//           onHide={() => setShowModal(false)}
//           selectedRow={row}
//           isEditMode={isEditMode}
//           onConfirm={() => {
//             handleDisableEnable();
//             setShowModal(false);
//           }}
//           onCancel={() => setShowModal(false)}
//           actionName={rowStatus ? "Enable" : "Disable"}
//           ssid={ssid}
//           security={security}
//           selectedSequence={row.sequence}
//           //onSubmitButtonClick={(values) => handleSubmit(values, row)}
//         />
//       )}
//     </tr>
//   );
// }

// export default function Table(props) {
//   const { dataList, type, apiEndpoints } = props;
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     setTimeout(() => {
//       setIsLoading(false);
//     }, 2000);
//   }, []);

//   return (
//     <div className="card mt-5 aasan-card">
//       <div className="container">
//         <div className="row">
//           <div className="col-sm-12">
//             {isLoading ? (
//               <div className="table-responsive aasan-table">
//                 <table className="table">
//                   {/* Render loading content */}
//                 </table>
//               </div>
//             ) : dataList && dataList.length > 0 ? (
//               <div className="table-responsive aasan-table">
//                 <table className="table">
//                   <thead>
//                     <tr>
//                       {contentConstant[type].TABLE.map((item) => (
//                         <th key={item} scope="col">{item}</th>
//                       ))}
//                       <th>WiFi Status</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {dataList.map((row, index) => (
//                       <TableRow
//                         key={index}
//                         row={row}
//                         apiEndpoint={apiEndpoints[index]}
//                         setSelectedApiEndpoint={props.setSelectedApiEndpoint}
//                       />
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             ) : (
//               <div>No data available.</div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import { contentConstant } from "../../Constant/content";
import WirlessModal from "../../Modals/WirlessModal";
import Switch from "react-switch";
import axios from "axios";
import { message } from 'antd';

function TableRow(props) {
  const { row, apiEndpoint, index } = props; // Include 'index' as a prop

  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [ssid, setSSID] = useState("");
  const [security, setSecurity] = useState("");
  const [rowStatus, setRowStatus] = useState(false);
  const [selectedApiEndpoint, setSelectedApiEndpoint] = useState(null);
  useEffect(() => {
    setRowStatus(row.active);
  }, [row]);

  const handleUpdateClick = () => {
    setShowModal(true);
    setIsEditMode(true);
    setSSID(row.SSID);
    setSecurity(row.Security);
    setSelectedApiEndpoint(row.apiEndpoint);
  };

  const handleDisableEnable = async () => {
    try {
      // Construct the API endpoint based on the row's index
      const apiEndpoint = `http://myaasaan/cgi-bin/SSID${index + 1}En-disable.sh`;
  
      // Define your request headers, including Content-Type and Origin
      const headers = {
        'Content-Type': 'application/json',
      };
  
      // Define the request data (if needed)
      const requestData = {
        // Your request data here
      };
  
      // Make the POST request with the specified method and headers
      const response = await axios.post(apiEndpoint, requestData, {
        headers: headers,
        method: 'POST',
      });
  
      if (response.status === 200) {
        setRowStatus(!rowStatus);
        message.success(`Successfully ${rowStatus ? 'enabled' : 'disabled'} the row.`);
      } else {
        console.error('Unexpected response status:', response.status);
        message.error('Request failed. Please try again.');
      }
    } catch (error) {
      console.error('API Error:', error);
      if (error.response) {
        console.error('Server Error Data:', error.response.data);
      }
      message.error(`Failed to ${rowStatus ? 'enable' : 'disable'} the row. Please try again.`);
    }
  };
  

  return (
    <tr
      style={{
        backgroundColor: rowStatus ? "#000" : "#ccc",
        color: rowStatus ? "#fff" : "inherit",
      }}
    >
      <td style={{ backgroundColor: rowStatus ? "#ccc" : "inherit", color: rowStatus ? "#808080" : "inherit" }}>{index}</td>
      <td style={{ backgroundColor: rowStatus ? "#ccc" : "inherit", color: rowStatus ? "#808080" : "inherit" }}>{row.SSID}</td>
      <td style={{ backgroundColor: rowStatus ? "#ccc" : "inherit", color: rowStatus ? "#808080" : "inherit" }}>{row.Active_Clients}</td>
      <td style={{ backgroundColor: rowStatus ? "#ccc" : "inherit", color: rowStatus ? "#808080" : "inherit" }}>{row.Experience_dBm}</td>
      <td style={{ backgroundColor: rowStatus ? "#ccc" : "inherit", color: rowStatus ? "#808080" : "inherit" }}>{row.Security}</td>
      <td style={{ backgroundColor: rowStatus ? "#ccc" : "inherit", color: rowStatus ? "#808080" : "inherit" }}>{row.Channel}</td>
      <td>
        <button
          className="btn btn-primary"
          onClick={handleUpdateClick}
          style={{ backgroundColor: rowStatus ? "#ccc" : "#70a0c6", color: rowStatus ? "#000" : "#FFFFFF", border: "1px solid #70a0c6" }}
          disabled={rowStatus}
        >
          Update
        </button>
      </td>
      <td>
        <Switch
         onChange={handleDisableEnable}
          checked={!rowStatus}
          onColor="#70a0c6"
        />
      </td>
      {showModal && (
        <WirlessModal
          show={showModal}
          onHide={() => setShowModal(false)}
          selectedRow={row}
          isEditMode={isEditMode}
          onConfirm={() => {
            handleDisableEnable();
            setShowModal(false);
          }}
          onCancel={() => setShowModal(false)}
          actionName={rowStatus ? "Enable" : "Disable"}
          ssid={ssid}
          security={security}
          selectedSequence={row.sequence}
        />
      )}
    </tr>
  );
}

export default function Table(props) {
  const { dataList, type, apiEndpoints } = props;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="card mt-5 aasan-card">
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            {isLoading ? (
              <div className="table-responsive aasan-table">
                <table className="table">
                  {/* Render loading content */}
                </table>
              </div>
            ) : dataList && dataList.length > 0 ? (
              <div className="table-responsive aasan-table">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Index</th>
                      {contentConstant[type].TABLE.map((item) => (
                        <th key={item} scope="col">{item}</th>
                      ))}
                      <th>WiFi Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataList.map((row, index) => (
                      <TableRow
                        key={index}
                        row={row}
                        apiEndpoint={apiEndpoints[index]}
                        setSelectedApiEndpoint={props.setSelectedApiEndpoint}
                        index={index}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div>No data available.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
// import React, { useState, useEffect } from "react";
// import { contentConstant } from "../../Constant/content";
// import WirlessModal from "../../Modals/WirlessModal";
// import Switch from "react-switch";
// import axios from "axios";
// import { message } from 'antd';

// function TableRow(props) {
//   const { row, rowStatus, handleToggleStatus, apiEndpoint } = props;

//   const [showModal, setShowModal] = useState(false);
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [ssid, setSSID] = useState(row.SSID);
//   const [security, setSecurity] = useState(row.Security);

//   const handleUpdateClick = () => {
//     setShowModal(true);
//     setIsEditMode(true);
//   };

//   const handleDisableEnable = async (index) => {
//     const apiEndpoint = `http://myaasaan/cgi-bin/SSID${index + 1}En-disable.sh`;
  
//     try {
//       const response = await axios.post(apiEndpoint, null, {
//         headers: { 'Content-Type': 'application/json' },
//       });
  
//       if (response.status === 200) {
//         handleToggleStatus(index);
//         message.success(`Successfully ${rowStatus[index] ? 'enabled' : 'disabled'} the row.`);
//       } else {
//         console.error('Unexpected response status:', response.status);
//         message.error('Request failed. Please try again.');
//       }
//     } catch (error) {
//       console.error('API Error:', error);
//       if (error.response) {
//         console.error('Server Error Data:', error.response.data);
//       }
//       message.error(`Failed to ${rowStatus[index] ? 'enable' : 'disable'} the row. Please try again.`);
//     }
//   };

//   return (
//     <tr
//       style={{
//         backgroundColor: rowStatus ? "#000" : "#ccc",
//         color: rowStatus ? "#fff" : "inherit",
//       }}
//     >
//       <td>{row.SSID}</td>
//       <td>{row.Active_Clients}</td>
//       <td>{row.Experience_dBm}</td>
//       <td>{row.Security}</td>
//       <td>{row.Channel}</td>
//       <td>
//         <button
//           className="btn btn-primary"
//           onClick={handleUpdateClick}
//           style={{ backgroundColor: rowStatus ? "#ccc" : "#70a0c6", color: rowStatus ? "#000" : "#FFFFFF", border: "1px solid #70a0c6" }}
//           disabled={rowStatus}
//         >
//           Update
//         </button>
//       </td>
//       <td>
//         <Switch
//           onChange={handleDisableEnable}
//           checked={!rowStatus}
//           onColor="#70a0c6"
//         />
//       </td>
//       {showModal && (
//         <WirlessModal
//           show={showModal}
//           onHide={() => setShowModal(false)}
//           selectedRow={row}
//           isEditMode={isEditMode}
//           onConfirm={() => {
//             handleDisableEnable();
//             setShowModal(false);
//           }}
//           onCancel={() => setShowModal(false)}
//           actionName={rowStatus ? "Enable" : "Disable"}
//           ssid={ssid}
//           security={security}
//           selectedSequence={row.sequence}
//         />
//       )}
//     </tr>
//   );
// }

// export default function Table(props) {
//   const { dataList, type } = props;

//   const [rowStatuses, setRowStatuses] = useState(dataList.map(() => false));
//   const apiEndpoints = dataList.map((row, index) => `http://myaasaan/cgi-bin/SSID${index + 1}En-disable.sh`);

//   const handleToggleStatus = (index) => {
//     const newStatuses = [...rowStatuses+1];
//     newStatuses[index] = !newStatuses[index];
//     setRowStatuses(newStatuses);
//   };

//   return (
//     <div className="card mt-5 aasan-card">
//       <div className="container">
//         <div className="row">
//           <div className="col-sm-12">
//             {dataList && dataList.length > 0 ? (
//               <div className="table-responsive aasan-table">
//                 <table className="table">
//                   <thead>
//                     <tr>
//                       <th>SSID</th>
//                       <th>Active Clients</th>
//                       <th>Experience dBm</th>
//                       <th>Security</th>
//                       <th>Channel</th>
//                       <th>Update</th>
//                       <th>WiFi Status</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {dataList.map((row, index) => (
//                       <TableRow
//                         key={index}
//                         row={row}
//                         rowStatus={rowStatuses[index]}
//                         handleToggleStatus={() => handleToggleStatus(index)}
//                         apiEndpoint={apiEndpoints[index]}
//                       />
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             ) : (
//               <div>No data available.</div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

