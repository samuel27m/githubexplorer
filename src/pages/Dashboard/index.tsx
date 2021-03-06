import React, { useState, useEffect, useRef, FormEvent } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import api from '../../services/api';
import logoImg from '../../assets/logo.svg';
import { Title, Form, Repositories, Error } from './styles';

interface Repository {
    full_name: string;
    description: string;
    owner: {
        login: string;
        avatar_url: string;
    };
}

const Dashboard: React.FC = () => {
    const localStorageKey = '@GithubExplorer:repositories';

    const [newRepo, setNewRepo] = useState('');
    const [inputError, setInputError] = useState('');
    const [repositories, setRepositories] = useState<Repository[]>(() => {
        const storedRepositories = localStorage.getItem(localStorageKey);

        if (storedRepositories) {
            return JSON.parse(storedRepositories);
        }

        return [];
    });

    useEffect(() => {
        localStorage.setItem(localStorageKey, JSON.stringify(repositories));
    }, [repositories]);

    const isFirstRun = useRef(true);
    useEffect(() => {
        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }

        if (!inputError) {
            return;
        }

        document.getElementById('form')?.classList.add('shake');
        setTimeout(() => {
            document.getElementById('form')?.classList.remove('shake');
        }, 500);
    }, [inputError]);

    async function handleAddRepository(event: FormEvent): Promise<void> {
        event.preventDefault();

        if (!newRepo) {
            setInputError('Input the author/name of the repository');
            return;
        }

        try {
            const response = await api.get<Repository>(`repos/${newRepo}`);

            const repository = response.data;

            setRepositories([...repositories, repository]);
            setNewRepo('');
            setInputError('');
        } catch (err) {
            setInputError(`Error while searching "${newRepo}"`);
        }
    }

    return (
        <>
            <img src={logoImg} alt="Github Explorer" />
            <Title>Explore repositories on Github</Title>

            <Form id='form' hasError={!!inputError} onSubmit={handleAddRepository}>
                <input
                    placeholder="Type the repository name"
                    value={newRepo}
                    onChange={e => setNewRepo(e.target.value)}
                />
                <button type="submit">Search</button>
            </Form>

            {inputError && <Error>{inputError}</Error>}

            <Repositories>
                {repositories.map(repository => (
                    <Link
                        key={repository.full_name}
                        to={`/repositories/${repository.full_name}`}
                    >
                        <img
                            src={repository.owner.avatar_url}
                            alt={repository.owner.login}
                        />
                        <div>
                            <strong>{repository.full_name}</strong>
                            <p>{repository.description}</p>
                        </div>
                        <FiChevronRight size={20} />
                    </Link>
                ))}
            </Repositories>
        </>
    );
};

export default Dashboard;
