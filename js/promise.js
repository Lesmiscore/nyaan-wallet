function firstResolve(promises) {
    return new Promise((resolve, reject) => {
        let finished = false;
        let errors = [];
        for (let key in promises) {
            const item = promises[key];
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
        }
    });
}

module.exports = { firstResolve };
