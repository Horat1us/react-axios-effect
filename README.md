# React Axios Effect
![GitHub](https://img.shields.io/github/license/Horat1us/react-axios-effect)
![GitHub tag (latest SemVer)](https://img.shields.io/github/tag/Horat1us/react-axios-effect)
![TypeScript Support](https://img.shields.io/badge/language-TypeScript-blue)

Simple React Effect Hook that executes callback with axios CancelToken as argument.
Request cancel will be performed as effect destruction.

## Installation
Using [npm](https://npmjs.com/package/react-axios-effect)
```bash
npm i react-axios-effect
```

## Example

### useAxiosEffect
[Source](./src/useAxiosEffect.ts)

Execute API effect with cancel token.
Request will be cancelen on component unmount.

```javascript
import * as React from "react"
import axios from "axios";
import { useAxiosEffect } from "react-axios-effect";

export const FunctionalComponent = () => {
    const [ data, setData ] = React.useState();

    useAxiosEffect(
        /* effect that returns AxiosPromise */
        (cancelToken) => axios
            .get("https://example.com/api/v1/", { cancelToken })
            .then((response) => setData(response.data))
        /* dependencies */
        [ setData ]
    );

    if (data === undefined) {
        /* render placeholder for loading state */
        return <span>Loading...</span>
    }

    /* render your component */
    return <pre>{JSON.strinfigy(data)}</pre>;
};
```

## Contributors
- [Alexander <horat1us> Letnikow](mailto:reclamme@gmail.com)

## License
[MIT](./LICENSE)
