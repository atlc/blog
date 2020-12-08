import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './components/nav/Navbar';
import { Home } from './views/Home';
import AllBlogs from './views/blogs/AllBlogs';
import SingleBlog from './views/blogs/SingleBlog';
import EditableBlog from './views/blogs/EditableBlog';




const App = (props: AppProps) => {

	return (
		<BrowserRouter>
			<Navbar />
			<div className="container mt-5 pt-3">
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/blogs" component={AllBlogs} />
					<Route path="/blogs/:id/edit" component={EditableBlog} />
					<Route path="/blogs/:id" component={SingleBlog} />
					<Route path="*" />
				</Switch>
			</div>
		</BrowserRouter>
	);
};

interface AppProps { }

export default App;