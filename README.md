
<p align="center">
<img src="https://raw.githubusercontent.com/AnemonOFF/reactiumui/main/logo.png" alt="reactiumui">
<h1 align="center">Reactium UI</h1>
</p>
<p align="center">
<a href="https://www.npmjs.com/package/reactiumui"><img alt="npm" src="https://img.shields.io/npm/v/reactiumui"></a>
<a href="https://github.com/AnemonOFF/reactiumui/blob/main/LICENSE"><img alt="GitHub" src="https://img.shields.io/github/license/AnemonOFF/reactiumui"></a>
</p>
</br>

⚡Fast and customizable React UI library, compatible with SSR

> NOTE: This project is still in development and might have unexpectable bugs. If you encounter a bug please report

## Documentation
You can get docs on our site: https://rectiumui.org/docs

## Fast start

 1. Install inside your React project directory with command:
	 ```
	npm i reactiumui
	#or
	yarn add reactiumui
	```
 2. To customize them, add following lines in your root component:
	 ```jsx
	  import {ReactiumThemeProvider} from  'reactiumui';
	  
	  const App = () => {
		  return (
			  <ReactiumThemeProvider>
				  <AppComponent />
			  </ReactiumThemeProvider>
		  )
	  }
	 ```
3. Import any components you want:
	 ```jsx
	 import {Button} from 'reactiumui';
	 // or import manually
	 // import Button from 'reactiumui/button';
	 const MyComponent = () => <Button>Press Me</Button>
	 export default MyComponent;
	```
## License
[License](https://github.com/AnemonOFF/BMLogger/blob/main/LICENSE)
