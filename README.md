<p>how to create saza app :</p>

## Quick Start
```sh

npm i -g saza
saza my-app-name

```

for start typescript app:

```sh

npm i -g saza
saza my-app-name --typescript 

```

or <code>npx</code>

```sh

npx my-app-name --typescript 

```


for start live server for developing app :
```sh

npm run start

```

build production from saza app :
```sh

npm run build

```

## work with SVG files

1. import source of ```svg``` file and use ```<img src={svgSource}```  like below :

```javascript

import svgSource from "./icon.svg";

function App() {
  return (<>
    <img src={svgSource} />
  </>);
}

export default App;
```

2. import ```svg``` as a ```ReactComponent``` :

```javascript
import {ReactComponent as Icon} from "./icon.svg";

function App() {
  return (<>
    <Icon />
  </>);
}

export default App;
```



## Helpful Links


<b>react not found problem : </b>
<p><a href="https://stackoverflow.com/a/64994595/10835176">https://stackoverflow.com/a/64994595/10835176</a></p>

<b>jsx loader for webpack :<b>
<p><a href="https://stackoverflow.com/questions/68422492/how-to-use-js-jsx-files-in-a-typescriptwebpack-project">https://stackoverflow.com/questions/68422492/how-to-use-js-jsx-files-in-a-typescriptwebpack-project</a></p>


<b>open browser automaticly by serve :<b>
<p><a href="https://stackoverflow.com/a/39753225/10835176">https://stackoverflow.com/a/39753225/10835176</a></p>

<b>auto React import in typescript :</b>
<p><a href="https://dev.to/brandonwie/the-complete-guide-for-setting-up-react-app-from-scratch-feat-typescript-385b">https://dev.to/brandonwie/the-complete-guide-for-setting-up-react-app-from-scratch-feat-typescript-385b</a></p>


<b>GET / : * problem :</b>
<p><a href="https://stackoverflow.com/questions/71602863/webpack-dev-server-cannot-get">https://stackoverflow.com/questions/71602863/webpack-dev-server-cannot-get</a></p>
