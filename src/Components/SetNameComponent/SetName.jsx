import React,{useState} from "react";
import { Button, Form, Header, Icon, Input } from "semantic-ui-react";

export default function SetName(props) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const changeName = (e) => {
    setName(e.target.value);
  };

  const NextLevel = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      props.valueAction();
      setName("");
    }, 3000);
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
