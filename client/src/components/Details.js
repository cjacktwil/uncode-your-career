import React, {useState} from "react"
import Auth from '../utils/auth'
import {Layout, Image, Button, Modal} from 'antd'
import {PageHeader} from 'antd'
import ReactHtmlParser from 'react-html-parser';
import SignUpForm from './SignupForm';
import LoginForm from './LoginForm';
import SavedJobs from './SavedJobs';

const { Content, Footer, Sider } = Layout


const Details = (props) => {
const job = props.location.state.job;

const [showModal, setShowModal] = useState(false);
return (
    <Layout>
    <PageHeader

className="site-page-header"
onBack={() => props.history.push('/', {})}
title="Job Search"
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
            <Sider >
                <div className="saved-title">
                    Saved Jobs
                    </div>
                <SavedJobs />
            </Sider>
    <Content style={{ margin: '24px 16px 0' }}>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
        <>
        <Image width={50} src={job.company_logo}
                                ></Image> <br />
    {job.title}<br/>
    {job.company}<br/>
    {job.location}<br/>

    { ReactHtmlParser(job.description)}
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
      </Layout>
      
)

}
export default Details