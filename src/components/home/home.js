// Importando o React
import React from "react";
// Importando os components necessários da lib react-materialize
import { Row, Col, Card } from 'react-materialize';
import UserProfile from '../user_profile/user_profile'
import Experience from '../experience/experience'
// Importando o avatar da empresa 1
import company_avatar from '../../images/people.png';
// Importando o avatar da empresa 1
import company_avatar2 from '../../images/company2.png';


const Home = (props) => (
    <Row>
        <Col m={3} s={12}>
            <UserProfile name={props.user.name} job_role={props.user.job_role} />
        </Col>
        <Col m={8} s={12}>
            <h5 className="subtitle">About Me</h5>
            <Card>
                <div>
                    {props.user.about_me}
                </div>
            </Card>
            <h5 className="subtitle">Experiences</h5>
            <Experience title={props.user.job_role}
                company="Soundcloud"
                description={props.user.experience}
                avatar={company_avatar}
            />
        </Col>
    </Row>
);

export default Home;