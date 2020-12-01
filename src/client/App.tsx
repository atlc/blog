import * as React from 'react';

const App = (props: AppProps) => {
	const [greeting, setGreeting] = React.useState<string>('');

	React.useEffect(() => {
		(async () => {
			try {
				const res = await fetch('/api/hello');
				let greeting = await res.json();
				setGreeting("Uh oh, we made a fucky wucky :(");
			} catch (error) {
				console.log(error);
			}
		})();
	}, []);

	return (
		<div className="min-vh-100 d-flex justify-content-center align-items-center bg-primary">
			<h1 className="display-1">{greeting}</h1>
		</div>
	);
};

interface AppProps {}

export default App;