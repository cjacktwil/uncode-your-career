import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import SignUpForm from './SignupForm';
import LoginForm from './LoginForm';
import SearchedJobs from './SearchedJobs';
import { PageHeader } from 'antd';
import Auth from '../utils/auth';


const HomePage = () => {

    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <PageHeader

                className="site-page-header"
                onBack={() => null}
                title="Project3"
                extra={
                    Auth.loggedIn() ? (

                        <Button type="primary" onClick={Auth.logout}>Logout</Button>
                    ) : (
                            <Button type="primary" onClick={() => setShowModal(true)}>Login/Signup</Button>
                        )}

            />
            <SearchedJobs />
            <Modal
                footer={[
                    <Button key="back" onClick={() => setShowModal(false)}>
                        Cancel
    </Button>
                ]}
                title="Basic Modal"
                visible={showModal}
            >
                <LoginForm />
                <SignUpForm />
            </Modal>
        </>
    );

}

export default HomePage;