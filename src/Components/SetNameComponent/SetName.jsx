import React,{useState} from "react";
import { Button, Form, Header, Icon, Input } from "semantic-ui-react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setName } from "../../Redux/actions/action";

function SetName(props) {
  const [name, setUserName] = useState("");
  const [loading, setLoading] = useState(false);

  const changeName = (e) => {
    setUserName(e.target.value);
  };

  const NextLevel = () => {
    setLoading(true);
    props.actions(setName(name))
    setTimeout(() => {
      setLoading(false);
      props.valueAction()
      setUserName("");
    }, 1500);
  };
  return (
    <div>
      <div id="header">
        <Header id="head">{props.title}</Header>
      </div>
      <Form id="app" onSubmit={NextLevel}>
          <Input
            icon="user"
            id="input"
            iconPosition="left"
            placeholder="Geçici isim belirle"
            onChange={changeName}
            value={name}
            required
            autocomplete="off"
            maxlength="10"
            disabled={loading === true ? true : false}
          />
        <Form.Field type="submit">
          <Button loading={loading} icon id="next-button" title="İlerle">
            <Icon name="arrow right"></Icon>
          </Button>
        </Form.Field>
      </Form>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions:bindActionCreators(setName,dispatch)
  }
}

const mapStateToProps = (state) => {
  return state;
}

export default connect(mapStateToProps,mapDispatchToProps)(SetName);
