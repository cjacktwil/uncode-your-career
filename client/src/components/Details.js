import React, { useState } from "react"
import Auth from '../utils/auth'
import { Layout, Image, Button, Modal, PageHeader, Typography } from 'antd'
// import { PageHeader } from 'antd'
import ReactHtmlParser from 'react-html-parser';
import SignUpForm from './SignupForm';
import LoginForm from './LoginForm';
import SavedJobs from './SavedJobs';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { SAVE_JOB } from '../utils/mutations';

const { Content, Footer, Sider } = Layout
const { Link } = Typography;


const Details = (props) => {
    const job = props.location.state.job;

    const [showModal, setShowModal] = useState(false);
    const [saveJob, { error }] = useMutation(SAVE_JOB);

    const handleSaveJob = async () => {

        // get token
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }

        console.log(token);

        try {
            const { data } = await saveJob({
                variables: { input: job }
            });

            if (error) {
                throw new Error('something went wrong!');
            }
            //add jobToSave id to saved jobs array
            // setSavedJobIds([...savedJobIds, jobToSave.id]);
            // console.log(savedJobIds);

        } catch (error) {
            console.error(error);
        }
    };




    return (
        <Layout>
            <PageHeader

                className="site-page-header"
                onBack={() => props.history.push('/', {})}
                title="Uncode Your Career!"
                extra={
                    Auth.loggedIn() ? (
                        <>
                            <Button type="primary" onClick={Auth.logout}>Logout</Button>
                            {/* <Button type="primary" onClick={() => setShowSavedJobs(true)}>Saved Jobs</Button> */}
                        </>
                    ) : (
                            <Button type="primary" onClick={() => setShowModal(true)}>Login/Signup</Button>
                        )}

            />

            <Layout>

                <Sider id="sider" style={{ overflow: 'auto', height: '700px', left: '2px', borderRadius: '5px' }} >
                    <div className="saved-title">
                        Saved Jobs
                        </div>
                    <SavedJobs />
                </Sider>
                <Content style={{ margin: '24px 16px 0' }}>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                        <>
                            
                            <Image width={50} src={job.company_logo}
                            ></Image>
                            <Button className="savejob-button" onClick={() => handleSaveJob()}>Save Job</Button><br />
                            <Link href={job.url} target="_blank">{job.title}</Link><br />
                            <Link href={job.company_url} target="_blank">{job.company}</Link><br />
                            {job.location}<br />

                            {ReactHtmlParser(job.description)}
                        </>
                    </div>
                    <Modal
                        footer={[
                            <Button key="back" onClick={() => setShowModal(false)}>
                                Cancel
                    </Button>
                        ]}
                        title=""
                        onCancel={() => setShowModal(false)}
                        visible={showModal}
                    >
                        <LoginForm />
                        <SignUpForm />
                        {/* <Userpage /> */}
                    </Modal>
                </Content>
            </Layout>
            <Footer style={{ textAlign: 'center', fontSize: '24px' }}> <h6>&copy; 2020</h6> </Footer>
        </Layout>

    )

}
export default Details