'use client';
import React from 'react';

import { gql, useQuery } from '@apollo/client';

const query = gql`
	query GetTodosWithUser {
		getTodos {
			id
			title
			completed
		}
	}
`;

const Home = () => {
	const { data, error, loading } = useQuery(query);

	if (loading) return <div>Loading...</div>;
	if (error) return <p>Error :(</p>;

	return (
		<div>
			<table>
				<thead>
					<tr>
						<th>id</th>
						<th>title</th>
						<th>completed</th>
					</tr>
				</thead>

				<tbody>
					{data.getTodos.map((todo: any) => (
						<tr key={todo.id}>
							<td>{todo.id}</td>
							<td>{todo.title}</td>
							<td>
								{todo.completed ? 'true' : 'false'}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Home;
