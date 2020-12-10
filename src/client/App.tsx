import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './components/nav/Navbar';
import { Home } from './views/Home';
import AllBlogs from './views/blogs/AllBlogs';
import SingleBlog from './views/blogs/SingleBlog';
import EditableBlog from './views/blogs/EditableBlog';
import CreateBlog from './views/blogs/CreateBlog';

const App = (props: AppProps) => {
	return (
		<BrowserRouter>
			<Navbar />
			<div className="container mt-5 pt-3">
				<Switch>
					<Route exact path="/">
					<Home />
					</Route>
					<Route exact path="/blogs/create">
						<CreateBlog />
					</Route>
					<Route exact path="/blogs">
						<AllBlogs />
					</Route>
					<Route path="/blogs/:id/edit">
						<EditableBlog />
					</Route>
					<Route path="/blogs/:id">
						<SingleBlog />
					</Route>
					<Route path="*">
						<Home />
					</Route>
				</Switch>
			</div>
		</BrowserRouter>
	);
};

interface AppProps { }

export default App;