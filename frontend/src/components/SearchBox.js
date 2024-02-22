import React , {useState} from "react";
import { Form , Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


const SearchBox = ({ history }) => {
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();

    const submitHanler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            navigate(`/search/${keyword}`)
            //history.push(`/search/${keyword}`);
            //window.location = `/search/${keyword}`
        } else {
            navigate('/')
            //history.push("/");
            //window.location = '/'
        }
    };

    return (
        <Form onSubmit={submitHanler} className="d-flex">
            <Form.Control
                type="text"
                name="q"
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Search Course..."
                className="mr-sm-2 me-2 search-input" // Add the custom class here"
            ></Form.Control>
            <Button type="submit" variant="outline-success" className="p-2">
                Search
            </Button>
        </Form>
    );
};

export default SearchBox;