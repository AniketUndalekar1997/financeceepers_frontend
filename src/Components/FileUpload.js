import React, { useState } from 'react';
import './fileUpload.css'
import { useNavigate } from 'react-router-dom';

import {
    Button,
    Segment,
    Divider,
    Tab,
    Message,
    Form,
    Icon,
    Progress
} from "semantic-ui-react";

function FileUpload() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [isApiLoading, setApiLoading] = useState(false);
    const [buttonText, setButtonText] = useState("Upload");
    const [statusCode, setStatusCode] = useState(0);
    const [successMesssage, setSuccessMessage] = useState("");
    const [percent, setPercent] = useState(0);
    const navigate = useNavigate();

    const changeHandler = (event) => {
        setSelectedFile();

        if (event.target.files[0].type !== "application/json") {
            window.alert("Invalid File");
            return;
        }
        setButtonText("Upload");
        setStatusCode(0);
        setSuccessMessage();

        setSelectedFile(event.target.files[0]);
    };

    const disableUploadBtn = selectedFile && (selectedFile.type === "application/json") ? false : true;

    const handleSubmission = () => {
        setApiLoading(true);
        setPercent(40)
        const formData = new FormData();
        if (selectedFile) {
            formData.append('file', selectedFile);
        }

        fetch('http://localhost:8000/api/upload', {
            method: 'POST',
            body: formData,
        }).then((res) => {
            setStatusCode(res.status)
            return res.json();
        }).then((data) => {
            setPercent(70);
            setTimeout((() => {
                setPercent(100);
                setSuccessMessage(data.message);
                setApiLoading(false);
                setButtonText("Uploaded");
            }), 2000)

            console.log(data);


        }).catch((err) => {
            window.alert(err);
        })
    };

    // const buttonClass = isApiLoading ? 'loading ui primary button' : 'ui primary button';
    const isButtonDisabled = buttonText === 'Uploaded';

    const viewDataBtnhandle = () => {
        navigate('/posts');
    }

    const renderSuccessMessage = () => {
        return <Message>{successMesssage}</Message>;
    }

    const getUploadUI = () => {
        const panes = [
            {
                render: () => (
                    <Tab.Pane attached={false}>
                        {successMesssage && statusCode ? renderSuccessMessage() : null}
                        {/* <Message>Some random message idk.</Message> */}
                        <Form onSubmit={handleSubmission}>
                            <Form.Field>
                                <label>File input & upload </label>
                                <Button as="label" htmlFor="file" type="button" animated={'vertical'}>
                                    <Button.Content visible>
                                        <Icon name="file" />
                                    </Button.Content>
                                    <Button.Content hidden>Choose a File</Button.Content>
                                </Button>
                                <input
                                    type="file"
                                    id="file"
                                    hidden
                                    onChange={changeHandler}
                                />
                                <Form.Input
                                    fluid
                                    label="File Chosen: "
                                    placeholder="Use the above bar to browse your file system"
                                    readOnly
                                    value={selectedFile?.name}
                                />
                                <Button primary disabled={disableUploadBtn | isButtonDisabled} style={{ marginTop: "20px" }} type="submit" loading={isApiLoading}>
                                    {buttonText}
                                </Button>
                                {percent === 100 && !isApiLoading ? <Button onClick={viewDataBtnhandle} className='positive ui button' style={{ marginTop: "20px" }} type="submit">
                                    View Posts
                                </Button> : null}

                                {statusCode && statusCode === 200 ? (
                                    <Progress
                                        style={{ marginTop: "20px", height: "25px" }}
                                        percent={percent}
                                        success
                                        progress
                                    >
                                        File Upload Success
                                    </Progress>
                                ) : statusCode && statusCode === 500 ? (
                                    <Progress
                                        style={{ marginTop: "20px", height: "25px" }}
                                        percent={100}
                                        error
                                        active
                                        progress
                                    >
                                        File Upload Failed
                                    </Progress>
                                ) : null}
                            </Form.Field>
                        </Form>
                    </Tab.Pane >
                )
            }
        ];

        return (
            <Segment style={{ padding: "5em 1em" }} vertical>
                <Divider horizontal>UPLOAD FILE HERE</Divider>
                <Tab menu={{ pointing: true }} panes={panes} />
            </Segment>
        );
    }

    return (
        <div>
            {getUploadUI()}
        </div>
    );
}

export default FileUpload;
