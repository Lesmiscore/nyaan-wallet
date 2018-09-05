function firstResolve(promises) {
    return new Promise((resolve, reject) => {
        let finished = false;
        let errors = [];
        let used = 0;
        for (let item of promises) {
            if (item instanceof Promise) {
                item.then(r => {
                    if (finished) return
                    finished = true;
                    resolve(r);
                }).catch(e => {
                    errors.push(e);
                    if (errors.length >= promises.length) {
                        reject(errors);
                    }
                });
                used++;
            }
        }
        if (used === 0) {
            reject();
        }
    });
}

module.exports = {
    firstResolve
};