import React, { useState, useContext } from 'react';
import { Button, Container, Grid } from 'semantic-ui-react';
import styled from 'styled-components';

import PostForm from '../../components/PostForm';
import { UserDetailsContext } from '../../context/UserDetailsContext'
import { useCreatePostMutation, usePost_TopicsQuery } from '../../generated/graphql';
import { useRouter } from '../../hooks';

interface Props {
	className?: string
}

const CreatePost = ({ className }:Props): JSX.Element => {
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [selectedTopic, setSetlectedTopic] = useState<number | null>(null);
	const currentUser = useContext(UserDetailsContext);
	const { data: topicData, error: topicError } = usePost_TopicsQuery()
	const [createPostMutation, { loading, error }] = useCreatePostMutation();
	const [isSending, setIsSending] = useState(false)
	const { history } = useRouter();

	const handleSend = () => {
		if (currentUser.id && title && content && selectedTopic){
			setIsSending(true);
			createPostMutation({ variables: {
				content,
				title,
				topicId: selectedTopic,
				userId: currentUser.id
			} }).then(({ data }) => {
				if (data && data.insert_posts &&  data.insert_posts.affected_rows > 0) {
					history.push('/')
				} else {
					throw Error('Error in post creation')
				}
			}).catch( e => console.error(e))
		}
	}

	const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => setTitle(event.currentTarget.value);
	const onContentChange = (content: string) => setContent(content);
	const onTopicSelection = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => setSetlectedTopic(Number(event.currentTarget.value))
	const renderTopics = () => {
		if (!topicData || !topicData.post_topics) return null

		return (
			<Button.Group size="small">
				{ topicData.post_topics.map(({ id, name } : {name: string, id:number}) => {
					return <Button key={id} onClick={onTopicSelection} value={id}>{name}</Button>
				})}
			</Button.Group>
		);
	}

	if (error || topicError) {
		error && console.error('Post creation error',error)
		topicError && console.error('Topic loading error',error)
	}

	return (
		<Container className={className}>
			<Grid>
				<Grid.Column mobile={16} tablet={16} computer={12} largeScreen={10} widescreen={10}>
					<h3>New Post</h3>
					<PostForm
						content={content}
						onContentChange={onContentChange}
						onTitleChange={onTitleChange}
						title={title}
					/>
					{renderTopics()}
					<div className={'mainButtonContainer'}>
						<Button
							onClick={handleSend}
							disabled={isSending || loading}
							type='submit'
							variant='primary'
						>
							{isSending || loading ? 'Creating...' : 'Create'}
						</Button>
					</div>
				</Grid.Column>
				<Grid.Column only='computer' computer={4} largeScreen={6} widescreen={8}/>
			</Grid>
		</Container>
	);
};

export default styled(CreatePost)`

	.mainButtonContainer{
		align-items: center;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.ui.button {
		font-family: 'Roboto Mono';
		font-size: 1.6rem;
		font-weight: 500;
		text-transform: uppercase;
		border-radius: 0.3rem;
		border: none;
		padding: 0.5rem 1rem;
		color: #fff;
		background-color: #EB5757;
		&:focus, &:hover {
			background-color: #CC3D3D;
        	outline: none;
		}
	}

	.ui.small.buttons {
		margin: 0 0 1.875rem 0;

		.ui.button {
			font-size: 1rem;
			background-color: #B5AEAE;
			padding: 0.5rem 0.8rem;
			border-radius: 0.2rem;
			letter-spacing: 0.05rem;
			line-height: 100%;
			text-transform: none;
			&:focus, &:hover {
				background-color: #282828;
				outline: none;
			}
		}
	}

	.fields {
		.container {
			padding-right: 5px;
			padding-left: 5px;
		}
	}

	textarea {
		font-size: 1.4rem;
	}
`