import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import SignUpForm from './SignupForm';
import LoginForm from './LoginForm';
// import SearchedJobs from './SearchedJobs';
import { PageHeader } from 'antd';
import Auth from '../utils/auth';
import SearchForm from './SearchForm'
import "antd/dist/antd.css";
import '../index.css';
import SavedJobs from './SavedJobs';



const HomePage = () => {

    const [showModal, setShowModal] = useState(false);
    // const [showSavedJobs, setShowSavedJobs] = useState(false);

    return (
        <>
        <div className="site-page-header-ghost-wrapper">
            <PageHeader

                className="site-page-header"
                onBack={() => null}
                title="Project3"
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
            </Modal>
            </div>
            <SearchForm />
            <SavedJobs />
            
        </>
    );

}

export default HomePage;