import CreateQuestionPage from "./createQuestionPage";
import { useNavigate } from 'react-router-dom';

// Wrap and export
export default function (props) {
    const navigation = useNavigate();
    return <CreateQuestionPage {...props} navigation={navigation} />;
    // return <CreateQuestionPage {...props} navigation={navigation} />;
}
