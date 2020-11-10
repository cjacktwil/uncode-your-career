import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import SignUpForm from './SignupForm';
import LoginForm from './LoginForm';
// import Userpage from './Userpage';
import { PageHeader } from 'antd';
import { Layout } from 'antd';
import Auth from '../utils/auth';
import SearchForm from './SearchForm'
import "antd/dist/antd.css";
import '../index.css';
import SavedJobs from './SavedJobs';


const { Footer, Sider, Content } = Layout;
// const { Title } = Typography;

const HomePage = (props) => {

    const [showModal, setShowModal] = useState(false);
    // const [showSavedJobs, setShowSavedJobs] = useState(false);

    return (
        <Layout>
            {/* <Title level={2} style={{ textAlign: 'left'}}> Job Search </Title> */}
        <>
                        <div className="site-page-header-ghost-wrapper">
                            <PageHeader
                                
                                className="site-page-header"
                                onBack={() => null}
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
                            {/* <SearchedJobs /> */}
                        </div>
                    </>
                    
        <Layout>
            <Sider >
                <div className="saved-title">
                    Saved Jobs
                    </div>
                <SavedJobs />
            </Sider>
            <Layout>
                
                    
                
                <Content>
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

<div id="searchContainer">
                    <SearchForm {...props} />
                    </div>


                </Content>
                <Footer style={{ textAlign: 'center', fontSize: '24px' }}> <h6>&copy; 2020</h6> </Footer>
            </Layout>
        </Layout>
        </Layout>
    );

}

export default HomePage;