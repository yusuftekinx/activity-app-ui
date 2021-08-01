import React from "react";
import { useState } from "react";
import { Button, Header, Icon, Input } from "semantic-ui-react";
import firebase from "firebase";
import "firebase/auth";
import "../../Stylesheet/Entry/Entry.css";
import {toast} from 'react-toastify'
import { useHistory } from "react-router-dom";

export default function PhoneNumber(props) {
  const [loading, setLoading] = useState(false);
  const [number, setNumber] = useState("");
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
        size:'normal',
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
      .then(async(confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;

        let getCode = prompt("Kodu Girin");
        confirmationResult
          .confirm(getCode)
          .then((result) => {
            // User signed in successfully.
            const user = result.user;
            setLoading(false)
            history.push('/home')
            // ...
          })
          .catch((error) => {
            // User couldn't sign in (bad verification code?)
            // ...
            toast.error('Onay Kodu Hatalı')
            setLoading(false)
            props.goStart();

          });
      })
      .catch((error) => {
        // Error; SMS not sent
        // ...

        console.log(error)
        setLoading(false)
        props.goStart();
        toast.error('Onay Kodu Gönderilemedi.')
      });
  };

  let ShowCodeInput = async () => {
    setLoading(true);
    SendCode();
  };

  let setPhoneNumber = (e) => {
    setNumber(e.target.value);
  };

  return (
    <div>
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
      <div style={{marginTop:"20px"}} id="recaptcha-container"></div>

    </div>
  );
}
