import * as React from 'react'
import { FaComment } from 'react-icons/fa';
import styled from 'styled-components';
import CreationLabel from '../ui-components/CreationLabel';

const DiscussionCard = styled.div`
    padding: 2rem 3rem 1.5rem 3rem;
    background-color: #FFF;
    border: 1px solid #EEE;
    h4 {
        color: #282828;
        font-weight: 500;
        font-size: 1.6rem;
        margin-bottom: 0.3rem; 
    }
    ul {
        color: #B5AEAE;
        font-size: 1rem;
        font-family: 'Roboto Mono';
        font-weight: 500;
        li {
            display: inline;
            margin-right: 1.5rem;
        }
    }

    @media only screen and (max-width: 576px) {
        & {
            padding: 1.2rem 1.5rem;       
        }
    }
`;

export interface DiscussionProps {
  authorUsername: string
  created_at: Date
  comments?: string
  title: string
}

export default function Discussion ({
	authorUsername,
	created_at,
	comments,
	title
}:DiscussionProps) {

	return (
		<DiscussionCard>
			<h4>{title}</h4>
			<CreationLabel
				created_at={created_at}
				username={authorUsername}
			/>
			<ul>
				<li><FaComment/> {comments} comments</li>
			</ul>
		</DiscussionCard>
	)
}