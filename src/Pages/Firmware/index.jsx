import React, { useState ,useEffect} from "react";
import Header from "../../Component/Reusable/Header";
import Button from "../../Component/Reusable/Form/Button";
import { message, Modal } from "antd";
import { contentConstant } from "../../Component/Constant/content";

function Firmware() {
  const [rebootResponse, setRebootResponse] = useState(null);
  const [resetResponse, setResetResponse] = useState(null);
  const [pingResponse, setPingResponse] = useState(null);

  const [rebootVisible, setRebootVisible] = useState(false);
  const [resetVisible, setResetVisible] = useState(false);
  const [pingVisible, setPingVisible] = useState(false);
  const [encryptionType, setEncryptionType] = useState("open");
  const[firmwareVersion,setFirmwareVersion]=useState("");
  const [upTime, setUpTime] = useState("");
  const showRebootModal = () => {
    setRebootVisible(true);
  };

  const hideRebootModal = () => {
    setRebootVisible(false);
  };

  const showResetModal = () => {
    setResetVisible(true);
  };

  const hideResetModal = () => {
    setResetVisible(false);
  };

  const showPingModal = () => {
    setPingVisible(true);
    
  };

  const hidePingModal = () => {
    setPingVisible(false);
  };
   
  useEffect(() => {
    fetchSystemInfo();
  }, []);

  const fetchSystemInfo = async () => {
    try {
      const response = await fetch("http://myaasaan/cgi-bin/get_uptime_api.sh");
      const data = await response.json();

      setUpTime(data.uptime);
      setFirmwareVersion(data.version);
    } catch (error) {
      console.error("Error fetching system info:", error);
    }
  };
  // const rebootDevice = async () => {
  //   try {
  //     const response = await fetch("http://myaasaan/cgi-bin/reboot.sh", {
  //       method: "POST",
  //     });
  
  //     if (response.ok) {
  //       const data = await response.json();
  //       setRebootResponse(data);
  //       message.success("Reboot successful!"); // Display success message
  //     } else {
  //       message.error("Reboot failed!"); // Display error message
  //     }
  //   } catch (error) {
  //     console.error("Error while rebooting:", error);
  //     message.error("Error while rebooting: " + error.message); // Display error message
  //   }
  // };

  const rebootDevice = async () => {
    try {
      const response = await fetch("http://myaasaan/cgi-bin/reboot.sh", {
        method: "POST",
      });
  
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          message.success("Reboot successful!");
        } else {
          message.error("Reboot failed!");
        }
      } else {
        message.error("Reboot failed!");
      }
    } catch (error) {
      console.error("Error while rebooting:", error);
      message.error("Error while rebooting: " + error.message);
    }
  };
  
  
  
  const resetDevice = async () => {
    // try {
    //   const messageText = "Resetting device...";
    //   message.loading({ content: messageText, key: "resetting" });

    //   const response = await fetch("http://myaasaan/cgi-bin/reset.sh", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ message: messageText }),
    //   });
    //   const data = await response.json();
    //   message.success({ content: "Device reset successfully", key: "resetting" });
    //   setResetResponse(data);
    // } catch (error) {
    //   message.error({ content: "Error while resetting", key: "resetting" });
    //   console.error("Error while resetting:", error);
    // }
    try {
      const response = await fetch("/cgi-bin/reset.sh", {
        method: "POST",
      });
  
      if (response.ok) {
        const data = await response.json(); // Parse the JSON response
        if (data.success) {
          message.success("Reset successful!");
        } else {
          message.error("Reset failed!");
        }
      } else {
        message.error("Reset failed!");
      }
    } catch (error) {
      console.error("Error while Reseting:", error);
      message.error("Error while Reseting: " + error.message);
    }
  };

  const pingDevice = async () => {
    try {
      const messageText = "Pinging device...";
      message.loading({ content: messageText, key: "pinging" });

      const response = await fetch("http://myaasaan/cgi-bin/ping_8.8.8.8.sh", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: messageText }),
      });
      const data = await response.json();
      message.success({ content: "Ping Success Rate 100%", key: "pinging" });
      setPingResponse(data);
    } catch (error) {
      message.error({ content: "Failed to ping Internet from this Device", key: "pinging" });
      console.error("Error while pinging:", error);
    }
  };

  return (
    <div className={"privateBody"}>
      <div className="row">
        <div className="col-sm-10">
          <Header type={"FIRMWARE"} />
        </div>
      </div>

      <div className="mt-5">
        <div className="card">
          <div className="card-body">
            <table className="table">
              <tbody>
                <tr>
                  <th>Firmware Version</th>
                  <th>Up Time</th>
                </tr>

                <tr>
                  <td>{firmwareVersion}dfvrf</td>
                  <td>{upTime}verv</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <div className="card">
          <div className="card-body">
            <h1 style={{ fontWeight: "bold", fontSize: "25px" }}>Tools</h1>
            <div className="button-group" >
            <button className="btn btn-primary"
             onClick={showRebootModal} 
             style={{ backgroundColor: "#70a0c6", color: "#FFFFFF" ,border: "1px solid #70a0c6"}}>
                  Reboot
                </button>
                &nbsp;
                <button className="btn btn-primary" 
                onClick={showResetModal} 
                style={{ backgroundColor: "#70a0c6", color: "#FFFFFF",border: "1px solid #70a0c6" }}>
                  Reset
                </button>
                &nbsp;
                <button className="btn btn-primary" 
                onClick={pingDevice} 
                style={{ backgroundColor: "#70a0c6", color: "#FFFFFF",border: "1px solid #70a0c6" }}>
                  Ping
                </button>

            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <Modal
        title="Confirm Reboot"
        visible={rebootVisible}
        onOk={() => {
          hideRebootModal();
          rebootDevice();
        }}
        onCancel={hideRebootModal}
        maskClosable={false}
        centered
        okButtonProps={{ style: { backgroundColor: "#70a0c6", color: "#FFFFFF" } }}
      >
        <p>Are you sure you want to reboot the device?</p>
      </Modal>

      <Modal
        title="Confirm Reset"
        visible={resetVisible}
        onOk={() => {
          hideResetModal();
          resetDevice();
        }}
        maskClosable={false}
        onCancel={hideResetModal}
        centered
        okButtonProps={{ style: { backgroundColor: "#70a0c6", color: "#FFFFFF" } }}
      >
        <p>Are you sure you want to reset this device to its factory settings?</p>
      </Modal>
    </div>
  );
}
export default Firmware;