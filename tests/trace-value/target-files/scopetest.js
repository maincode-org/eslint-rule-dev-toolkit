let a = 'safe';

const outer = () => {
    a = 'outer';
    let c = 'hej';

    const inner = () => {
        a = 'inner';
        const b = a;
    }
}