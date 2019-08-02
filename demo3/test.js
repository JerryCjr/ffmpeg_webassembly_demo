async function test () {
    setTimeout(() => {
        console.log(1);
    }, 2000);
}

await test();
console.log(12312);