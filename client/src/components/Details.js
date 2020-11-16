import React, { useState } from "react"
import Auth from '../utils/auth'
import { Layout, Image, Button, Modal, PageHeader, Typography } from 'antd'
import ReactHtmlParser from 'react-html-parser';
import SignUpForm from './SignupForm';
import LoginForm from './LoginForm';
import SavedJobs from './SavedJobs';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { MY_JOBS } from '../utils/queries';
import { SAVE_JOB } from '../utils/mutations';
import DonationForm from './DonationForm';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const { Content, Footer, Sider } = Layout
const { Link } = Typography;

const Details = (props) => {
    const job = props.location.state.job;
    const [showModal, setShowModal] = useState(false);
    const [showDonateModal, setShowDonateModal] = useState(false);
    const [saveJob, { error }] = useMutation(SAVE_JOB);
    const stripePromise = loadStripe('pk_test_51HlLBgLzp2GzCQgyaJRYbpxGWjhr5MYLRw8IRrWhrb8nPZpU6HIy0RSig0uK9VNeLHC5T8sR6GpcKUdj6qBM591P00XA71VO5t');
    const {data: Jobs, refetch: refetchjobs } = useQuery(MY_JOBS);
    const savedJobs = Jobs?.myJobs || [];
    const handleJobAddition = () => {
        refetchjobs()
    }

    const handleSaveJob = async () => {
        const jobToSave = job;
        console.log(jobToSave);
        
        // get token
        const token = Auth.loggedIn() ? Auth.getToken() : null;
        if (!token) {
            return false;
        }
        //call saveJob mutation
        try {
            const { data } = await saveJob({
                variables: { input: jobToSave }
            });

            if (error) {
                throw new Error('something went wrong!');
            }

        } catch (error) {
            console.error(error);
        }
    };
    return (
        <Layout>
            <PageHeader className="site-page-header"
                onBack={() => props.history.push('/', {})}
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
            <Layout>

                <Sider id="sider" style={{ overflow: 'auto', height: '700px', left: '2px', borderRadius: '5px' }} >
                    <div className="saved-title">
                        Saved Jobs
                        </div>
                    <SavedJobs 
                                                onJobRemoved={handleJobAddition}
                                                jobs={savedJobs}/>
                </Sider>
                <Content style={{ margin: '24px 16px 0' }}  
                onClick={handleJobAddition}
                            {...props}>
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
                </Content>
            </Layout>
            <Footer style={{ textAlign: 'center', fontSize: '24px' }}> <h6>&copy; 2020</h6> </Footer>
        </Layout>
    )
};

export default Details