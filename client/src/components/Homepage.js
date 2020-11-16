import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import SignUpForm from './SignupForm';
import LoginForm from './LoginForm';
import { PageHeader } from 'antd';
import { Layout } from 'antd';
import Auth from '../utils/auth';
import SearchForm from './SearchForm'
import "antd/dist/antd.css";
import '../index.css';
import SavedJobs from './SavedJobs';
import { MY_JOBS } from '../utils/queries';
import { useQuery } from '@apollo/react-hooks';
import DonationForm from './DonationForm';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const { Footer, Sider, Content } = Layout;

const HomePage = (props) => {
    //use myJobs query to refresh saved jobs sider
    const { data: Jobs, refetch: refetchjobs } = useQuery(MY_JOBS);
    const savedJobs = Jobs?.myJobs || [];
    //calling refetch from above
    const handleJobAddition = () => {
        refetchjobs()
    }

    const stripePromise = loadStripe('pk_test_51HlLBgLzp2GzCQgyaJRYbpxGWjhr5MYLRw8IRrWhrb8nPZpU6HIy0RSig0uK9VNeLHC5T8sR6GpcKUdj6qBM591P00XA71VO5t');
    //setting state to call modals
    const [showModal, setShowModal] = useState(false);
    const [showDonateModal, setShowDonateModal] = useState(false);

    return (
        <Layout>
            <>
                <div className="site-page-header-ghost-wrapper">
                    <PageHeader
                        className="site-page-header"
                        onBack={() => null}
                        title="Uncode Your Career!"
                        extra={[
                            Auth.loggedIn() ? (
                                <>
                                    <Button type="primary" onClick={Auth.logout}>Logout</Button>
                                </>
                            ) : (
                                    <Button type="primary" onClick={() => setShowModal(true)}>Login/Signup</Button>
                                ),
                            <Button type="primary" onClick={() => setShowDonateModal(true)}>Donate</Button>
                        ]}
                    />
                </div>
            </>
            <Layout>
                <Sider id="sider" style={{
                    overflow: 'auto',
                    height: '700px',
                    left: '2px',
                    borderRadius: '5px'
                }} >
                    <div className="saved-title">
                        Saved Jobs
                    </div>
                    <SavedJobs
                        onJobRemoved={handleJobAddition}
                        jobs={savedJobs} />
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
                        </Modal>
                        <Modal
                            footer={[
                                <Button key="back" onClick={() => setShowDonateModal(false)}>
                                    Cancel
                                    </Button>
                            ]}
                            title=""
                            onCancel={() => setShowDonateModal(false)}
                            visible={showDonateModal}
                        >
                            <Elements stripe={stripePromise}>
                                <DonationForm />
                            </Elements>
                        </Modal>
                        <div id="searchContainer">
                            <SearchForm
                                onJobChange={handleJobAddition}
                                {...props} />
                        </div>
                    </Content>
                    <div className="mobile-view">
                        Saved Jobs
                                <SavedJobs jobs={savedJobs} />
                    </div>
                    <Footer style={{ textAlign: 'center', fontSize: '24px' }}> <h6>&copy; 2020</h6> </Footer>
                </Layout>
            </Layout>
        </Layout>
    );
}

export default HomePage;