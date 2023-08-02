# Adding GraphQL to Next.js 13.4.12 Project

This document provides a step-by-step guide to add GraphQL to your [Next.js](https://nextjs.org/) version 13.4.12 project. [GraphQL](https://graphql.org/) is a powerful query language that allows you to fetch data efficiently from your server, and integrating it with Next.js can enhance your application's data-fetching capabilities.

## Prerequisites

Before proceeding with the GraphQL integration, ensure that you have the following installed:

1. Next.js 13.4.12 project: You should have a Next.js project set up and ready to add GraphQL functionality. If you don't have a project yet, create one using the Next.js template.

2. GraphQL Server: You should have a GraphQL server set up and running. If you don't have a GraphQL server yet, you can use the [Apollo Server](https://www.apollographql.com/docs/apollo-server/) to create one.

## Steps

1.  Install required packages:

    ```bash
    yarn add graphql @apollo/client
    ```

    The above command will install the graphql package, which is the core GraphQL library, and the @apollo/client package, which helps you create a GraphQL server ideal for Next.js projects.

2.  Create a new file `lib/provider.tsx`

    ```tsx
    'use client';

    import {
    	ApolloClient,
    	ApolloProvider,
    	InMemoryCache,
    } from '@apollo/client';

    const client = new ApolloClient({
    	uri: 'http://localhost:8000/graphql',
    	cache: new InMemoryCache(),
    });

    interface IGraphQlProviderProps {
    	children: React.ReactNode;
    }

    const GraphQlProvider: React.FC<IGraphQlProviderProps> = ({
    	children,
    }) => {
    	return (
    		<ApolloProvider client={client}>
    			{children}
    		</ApolloProvider>
    	);
    };

    export default GraphQlProvider;
    ```

    The above code creates a new ApolloClient instance and exports it as a Provider component. The ApolloClient instance is configured with the GraphQL server's URL and an InMemoryCache instance.

3.  In your `layout.tsx` file, wrap the `Component` prop with the `GraphQlProvider` component:

    ```tsx
    import GraphQLProvider from '../lib/provider';

    export default function RootLayout({
    	children,
    }: {
    	children: React.ReactNode;
    }) {
    	return (
    		<html lang="en">
    			<body className={inter.className}>
    				<GraphQLProvider>{children}</GraphQLProvider>
    			</body>
    		</html>
    	);
    }
    ```

    The above code wraps the `Component` prop with the `GraphQlProvider` component, which provides the ApolloClient instance to the entire application.

4.  In your client components use the `gql` from `@apollo/client` to create a GraphQL query:

    ```tsx
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
    ```

5.  In the same component, use the `useQuery` hook to fetch data from the GraphQL server:

    ```tsx
    const { loading, error, data } = useQuery(query);
    ```

    The above code uses the `useQuery` hook to fetch data from the GraphQL server. The `useQuery` hook accepts a GraphQL query and returns the loading state, error, and data.

6.  In the same component, render the data returned from the GraphQL server:

    ```tsx
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
    	<ul>
    		{data.getTodos.map((todo: any) => (
    			<li key={todo.id}>{todo.title}</li>
    		))}
    	</ul>
    );

    // This will render a list of todos depending on the data returned from the GraphQL server.
    ```

## Conclusion

In this guide, you learned how to add GraphQL to your Next.js project. You also learned how to use the `useQuery` hook to fetch data from the GraphQL server and render it in your application.
