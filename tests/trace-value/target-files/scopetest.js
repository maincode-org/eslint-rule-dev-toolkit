let a = 'safe';

const outer = () => {
    a = 'outer';

    const inner = () => {
        a = 'inner';
        const b = a;
    }
}