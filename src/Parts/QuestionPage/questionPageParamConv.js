import { useParams } from "react-router-dom";
import QuestionPage from "./questionPage";

export default (props) => (
    <QuestionPage
        {...props}
        params={useParams()}
    />
);