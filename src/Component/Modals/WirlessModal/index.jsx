import React, { useState, useEffect } from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Form, Input, Button, Select, message } from "antd";
import axios from "axios";
import SubHeader from "../../Reusable/Header/subHeader";
import { WirlessSchema } from "../../Form/wirlessForm";
import PropTypes from "prop-types";
const { Option } = Select;

const WirlessModal = ({
  show,
  type,
  onHide,
  selectedRow,
  isEditMode,
  selectedSequence,
}) => {
  const [encryptionType, setEncryptionType] = useState("open");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [previousPassword, setPreviousPassword] = useState("");
  const [selectedSecurityType, setSelectedSecurityType] = useState("open");

  const [form] = Form.useForm();

  useEffect(() => {
    if (isEditMode && selectedRow) {
      form.setFieldsValue({
        ssid_name: selectedRow.ssid_name, // Changed "ssid" to "ssid_name"
        encryption_type: selectedRow.encryption_type,
        security: selectedRow.passwordvalue, // Changed "password" to "security"
      });

      if (selectedRow.encryption_type === "WPA2&3 PSK") {
        setPreviousPassword(selectedRow.passwordvalue);
        setSelectedSecurityType("WPA2&3PSK");
      }
    }
  }, [isEditMode, selectedRow, form]);

  const isButtonDisabled = false;

  const handleSubmit = async (values) => {
    console.log("Form Values:", values);
    try {
      const sequence = selectedSequence;

      if (sequence >= 1 && sequence <= 5) {
        const apiEndpoint = `http://myaasaan/cgi-bin/update_SSID${sequence}.sh`;

        const requestBody = {
          ssid_name: values.ssid_name, // Changed "ssid" to "ssid_name"
          encryption_type: selectedSecurityType === "WPA2&3PSK" ? "WPA2&3 PSK" : "Open",
          password: selectedSecurityType === "WPA2&3PSK" ? values.security : "",
        };

        const response = await axios.post(apiEndpoint, requestBody);
        console.log("API Response:", response.data);

        if (response.status === 200) {
          message.success(`Wireless device for sequence ${sequence} created/updated successfully`);
        } else {
          console.error(`Failed to create/update the wireless device for sequence ${sequence}`);
          message.error(`Failed to create/update the wireless device for sequence ${sequence}`);
        }
      } else {
        console.error("Invalid sequence data:", sequence);
        message.error("Invalid sequence. Please provide a sequence between 1 and 5.");
      }

      onHide();
    } catch (error) {
      console.error("API Error:", error);
      if (error.response) {
        console.error("Server Error Data:", error.response.data);
      }

      message.error("Failed to update the wireless device");
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleBackClick = () => {
    onHide();
  };

  const handleSecurityTypeChange = (type) => {
    setSelectedSecurityType(type);
    if (type !== "WPA2&3 PSK") {
      form.setFieldsValue({ encryption_type: type });
    } else if (type === "WPA2&3 PSK" && selectedRow) {
      form.setFieldsValue({ encryption_type: previousPassword });
    }
  };

  return (
    <>
      <div className="mt-4">
        <button className="btn btn-secondary" onClick={handleBackClick}>
          <ArrowLeftOutlined /> Back
        </button>

        <div className="pb-2">
          <SubHeader type={"WIRELESS"} />
        </div>
        <div className="card aasan-card">
          <div className="container">
            <div className="row">
              <div className="col-sm-12 pt-3">
                <Form
                  form={form}
                  onFinish={(values) => handleSubmit(values)}
                  validateSchema={WirlessSchema}
                >
                  <div className="row">
                    <div className="col-sm-12">
                      <h4 style={{ fontWeight: "bold" }}>SSID</h4>
                      <Form.Item name="ssid_name">
                        <Input
                          placeholder="SSID"
                          style={{ width: "200px" }}
                        />
                      </Form.Item>
                    </div>
                  </div>
                  <Form.Item
                    name="sequence"
                    initialValue={selectedSequence}
                    hidden
                  >
                    <Input type="hidden" />
                  </Form.Item>

                  <div className="row">
                    <div className="col-sm-12">
                      <h4 style={{ fontWeight: "bold" }}>Security</h4>
                      <Form.Item label="" style={{ width: "200px" }}>
                        <Select
                          value={selectedSecurityType}
                          onChange={(value) => {
                            setEncryptionType(value);
                            handleSecurityTypeChange(value);
                          }}
                        >
                          <Option value="open">Open</Option>
                          <Option value="WPA2&3PSK">WPA2&3PSK</Option>
                        </Select>
                      </Form.Item>
                    </div>
                  </div>

                  {selectedSecurityType === "WPA2&3PSK" ? (
                    <div className="row">
                      <div className="col-sm-12">
                        <h4 style={{ fontWeight: "bold" }}>Enter your password</h4>
                        <Form.Item
                          name="security"
                          rules={[
                            {
                              required: true,
                              message: "Please enter your password",
                            },
                          ]}
                        >
                          <Input.Password
                            style={{ width: "200px" }}
                            placeholder="Enter your password"
                            iconRender={(visible) => (
                              <span onClick={togglePasswordVisibility}>
                                {visible ? " Hide" : " Show"}
                              </span>
                            )}
                          />
                        </Form.Item>
                      </div>
                    </div>
                  ) : null}

                  <div className="row">
                    <div className="col-sm-12">
                      <Form.Item>
                        <Button
                          type="primary"
                          htmlType="submit"
                          style={{
                            backgroundColor: "#70a0c6",
                            color: "#FFFFFF",
                          }}
                          disabled={isButtonDisabled}
                        >
                          Submit
                        </Button>
                      </Form.Item>
                    </div>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WirlessModal;