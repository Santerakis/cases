export function createOptions(array1: string[], array2: Array<{value:string, title: string}>) {
    const optionsFromArray2 = array2.map(item => (
        <option key={item.value} value={item.value}>
        {item.title}
        </option>
));

    const optionsFromArray1 = array1.map(item => (
        <option key={item} value={item}>
        {item}
        </option>
));

    return [...optionsFromArray2, ...optionsFromArray1];
}