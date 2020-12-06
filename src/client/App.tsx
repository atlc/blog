import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AllBlogs from './views/blogs/AllBlogs';
import Navbar from './components/nav/Navbar';
import { Home } from './views/Home';


const App = (props: AppProps) => {

	return (
		<BrowserRouter>
			<Navbar />
			<div className="container mt-5 pt-3">
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/blogs" component={AllBlogs} />
					<Route path="*" />
				</Switch>
			</div>
		</BrowserRouter>
	);
};

interface AppProps { }

export default App;