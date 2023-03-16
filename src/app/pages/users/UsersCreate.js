import React, { useState, useEffect } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import {
  Card,
  CardBody,
  CardHeader,
} from "../../../_metronic/_partials/controls";
import { useDispatch, useSelector } from "react-redux";
import { addItem, selectLoading } from "./usersSlice";
import { useHistory } from "react-router";
import { showSuccessDialog, showErrorDialog } from "../../../utility";
import Select from "react-select";
import { LayoutSplashScreen } from "../../../_metronic/layout";
import { fetchAll, selectData } from "../merchants/merchantsSlice";

export const UsersCreate = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const loading = useSelector(selectLoading);
  const merchantsData = useSelector(selectData);
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [type, setType] = useState("");
  const [address, setAddress] = useState("");
  const [merchants, setMerchants] = useState("");

  useEffect(() => {
    // Fetch data on first load
    dispatch(fetchAll());
  }, [dispatch]);

  const merchantsOptions = merchantsData.map((e) => {
    return {
      value: e.id,
      label: e.name,
    };
  });

  const getValueMerchants = (value, options) => {
    const return_value = options.filter((val) => value === val.value);
    return return_value;
  };

  const handleMerchantsChange = (e, value) => {
    if (e === null) {
      value.merchants = "";
    } else {
      value.merchants = e.value;
    }
    setMerchants(value.merchants);
  };

  const handleSave = async () => {
    const params = {
      full_name: fullname,
      email: email,
      password: password,
      phone: phone,
      image_url: "",
      address: address,
      user_type: "Merchant",
      merchant_id: merchants.toString(),
    };

    console.log(params, "params");
    try {
      const response = await dispatch(addItem(params));
      console.log(response, "response");
      if (response.payload.status === 200) {
        const action = await showSuccessDialog(response.payload.message);
        if (action.isConfirmed) history.goBack();
      } else {
        showErrorDialog(response.payload.error);
      }
    } catch (error) {
      showErrorDialog(error.message);
      console.log(error.message);
    }
  };

  return loading ? (
    <LayoutSplashScreen />
  ) : (
    <Card>
      <CardHeader title="Create User Merchant"></CardHeader>
      <CardBody>
        <Form>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
              <b>
                Fullname <b className="color-red">*</b>
              </b>
            </Form.Label>
            <Col sm={3}>
              <Form.Control
                type="text"
                onChange={(e) => {
                  setFullname(e.target.value);
                }}
                value={fullname}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
              <b>
                Password <b className="color-red">*</b>
              </b>
            </Form.Label>
            <Col sm={3}>
              <Form.Control
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                value={password}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
              <b>
                email <b className="color-red">*</b>
              </b>
            </Form.Label>
            <Col sm={3}>
              <Form.Control
                type="text"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
              <b>
                Phone <b className="color-red">*</b>
              </b>
            </Form.Label>
            <Col sm={3}>
              <Form.Control
                type="text"
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                value={phone}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
              <b>
                Address <b className="color-red">*</b>
              </b>
            </Form.Label>
            <Col sm={3}>
              <Form.Control
                type="text"
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
                value={address}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
              <b>
                Merchant <b className="color-red">*</b>
              </b>
            </Form.Label>
            <Col sm={3}>
              <Select
                isClearable={true}
                options={merchantsOptions}
                value={getValueMerchants(merchants, merchantsOptions)}
                onChange={handleMerchantsChange}
              />
            </Col>
          </Form.Group>

          <Row className="mt-6">
            <Button
              variant="light"
              className="mr-3"
              onClick={() => history.goBack()}
            >
              <i className="fa fa-arrow-left"></i>Back
            </Button>

            <Button variant="danger" onClick={handleSave}>
              Save
            </Button>
          </Row>
        </Form>
      </CardBody>
    </Card>
  );
};
