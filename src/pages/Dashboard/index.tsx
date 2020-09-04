import React from 'react';
import { FiChevronRight } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';

import { Title, Form, Repositories } from './styles';

const Dashboard: React.FC = () => {
    return (
        <>
            <img src={logoImg} alt="Github Explorer" />
            <Title>Explore repositories on Github</Title>

            <Form>
                <input placeholder="Type the repository name" />
                <button type="submit">Search</button>
            </Form>

            <Repositories>
                <a href="test">
                    <img src="https://github.com/samuel27m.png" alt="Samuel" />
                    <div>
                        <strong>facebook/react</strong>
                        <p>
                            A declarative, efficient, and flexible JavaScript
                            library for building user interfaces.
                        </p>
                    </div>
                    <FiChevronRight size={20} />
                </a>

                <a href="test">
                    <img src="https://github.com/samuel27m.png" alt="Samuel" />
                    <div>
                        <strong>facebook/react</strong>
                        <p>
                            A declarative, efficient, and flexible JavaScript
                            library for building user interfaces.
                        </p>
                    </div>
                    <FiChevronRight size={20} />
                </a>

                <a href="test">
                    <img src="https://github.com/samuel27m.png" alt="Samuel" />
                    <div>
                        <strong>facebook/react</strong>
                        <p>
                            A declarative, efficient, and flexible JavaScript
                            library for building user interfaces.
                        </p>
                    </div>
                    <FiChevronRight size={20} />
                </a>
            </Repositories>
        </>
    );
};

export default Dashboard;
