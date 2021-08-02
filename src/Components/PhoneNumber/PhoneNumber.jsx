import React from "react";
import { useState } from "react";
import { Button, Header, Icon, Input } from "semantic-ui-react";
import firebase from "firebase";
import "firebase/auth";
import "../../Stylesheet/Entry/Entry.css";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import createService from "../../Service/Token/CreateTokenService";
import { connect } from "react-redux";
import { bindActionCreators} from "redux";
import {setPhone, setUser} from '../../Redux/actions/action'
import { useEffect } from "react";
function PhoneNumber(props) {
  const [loading, setLoading] = useState(false);
  const [number, setNumber] = useState("");
  const [hide, setHide] = useState(true);
  const [codeButtonLoading, setCodeButtonLoading] = useState(false);
  let history = useHistory();
  const firebaseConfig = {
    apiKey: "AIzaSyAsl9AAV7zJbkzfnjMjkXwKpmGPK6yYDHs",
    authDomain: "mysite-ab3fe.firebaseapp.com",
    databaseURL: "https://mysite-ab3fe.firebaseio.com",
    projectId: "mysite-ab3fe",
    storageBucket: "mysite-ab3fe.appspot.com",
    messagingSenderId: "241186690221",
    appId: "1:241186690221:web:ad684b612b12b16beaa224",
    measurementId: "G-K4QJ2GF1L8",
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app(); // if already initialized, use that one
  }

  let createRecaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "normal",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          SendCode();
        },
      }
    );
  };

  let SendCode = () => {
    createRecaptcha();
    const phoneNumber = number;
    const appVerifier = window.recaptchaVerifier;
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then(async (confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        setHide(false);
        setCodeButtonLoading(false);
      })
      .catch((error) => {
        // Error; SMS not sent
        // ...
        setLoading(false);
        props.goStart();
        toast.error("Onay Kodu Gönderilemedi.");
        setCodeButtonLoading(false);
      });
  };

  function CodeModal() {


    const [code,setCode] = useState("");

    let handleChangeCode = (e) => {
      setCode(e.target.value);
    };
    let CodeControl = () => {
      window.confirmationResult
        .confirm(code)
        .then((result) => {
          
          setLoading(false);
          setCodeButtonLoading(false);
          setHide(true);

          setTimeout(() => {
            props.changePBValue();
            props.changeLabel("Onaylandı")
            props.actions(setPhone(number))
            createService().then(response => {
              console.log(response)
              localStorage.setItem('token',response.data.token)
              localStorage.setItem('user',JSON.stringify({
                name:props.User.name,
                phone:props.User.phone
              }))
          })
          },1500)
          setTimeout(() => {
            window.location.href = "/home"
          }, 4000);

          // ...
        })
        .catch((error) => {
          // User couldn't sign in (bad verification code?)
          // ...
          toast.error("Onay Kodu Hatalı");
          setLoading(false);
          props.goStart();
          setCodeButtonLoading(false);
        });
    };

    return (
      <div id="myModal" class="modal" hidden={hide}>
        <div class="modal-content">
          <span
            class="close"
            onClick={() => {
              setHide(true);
              props.goStart();
            }}
          >
            &times;
          </span>
          <Header as="h3" id="header">
            Doğrulama Kodu
          </Header>
          <div className="confirmarea">
            <Input
              placeholder="Doğrulama Kodu"
              value={code}
              onChange={handleChangeCode}
              className="inputcode"
              focus
            />
            <Button
              icon
              id="next-button"
              onClick={() => {
                CodeControl();
                setCodeButtonLoading(true);
              }}
              loading={codeButtonLoading ? true : false}
            >
              <Icon name="arrow right"></Icon>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  let ShowCodeInput = async () => {
    setLoading(true);
    SendCode();
  };

  let setPhoneNumber = (e) => {
    setNumber(e.target.value);
  };

  return (
    <div>
      <CodeModal />
      <div id="header">
        <Header id="head">{props.title}</Header>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Input
          disabled={loading === true ? true : false}
          icon="phone"
          id="number-input"
          iconPosition="left"
          placeholder="Telefon Numarası"
          onChange={setPhoneNumber}
        />
        <Button
          loading={loading}
          icon
          id="next-button"
          title="İlerle"
          onClick={ShowCodeInput}
        >
          <Icon name="arrow right"></Icon>
        </Button>
      </div>
      <div style={{ marginTop: "20px" }} id="recaptcha-container"></div>
    </div>
  );
}
const mapStateToProps = (state) => {
    return state;
}
const mapDispatchToProps = (dispatch) => {
    return {
        actions:bindActionCreators(setPhone,dispatch)
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(PhoneNumber);