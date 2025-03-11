import { Container, InputLabel } from "../components";
import Cont1 from "./ContentNS.css";

const ContentN = () => {
  return (
    <Container.Row className={Cont1.ce3}>
      <div className="flex flex-col max-w-100">
        <InputLabel.Label htmlFor="">이름</InputLabel.Label>
        <InputLabel.Input type="text" />
      </div>
      <div>
        <InputLabel.Label htmlFor="">이름</InputLabel.Label>
        <input type="text" />
      </div>
      <div>
        <InputLabel.Label htmlFor="">이름</InputLabel.Label>
        <input type="text" />
      </div>
    </Container.Row>
  );
};

export default ContentN;
