function Fnpromise(fn) {
    const _that = this
    this.status = 'PENDING'
    this.syncResolveCallBacks = []
    this.syncRejectCallBacks = []
    this.nextThenResolve = []
    this.nextThenReject = []
    // 改变状态
    const changeStatus = status => this.status = status

    const resolve = data => {
        if (_that.status === 'PENDING') {
            changeStatus.call(_that, 'RESOLVE')
            const resolveValue = _that.syncResolveCallBacks.pop().call(_that, data)
            _that.nextThenResolve.pop().call(_that, resolveValue)
        }
    }

    const reject = data => {
        if (_that.status === 'PENDING') {
            changeStatus.call(_that, 'REJECT')
            const rejectValue = this.syncRejectCallBacks.pop().call(_that, data)
            _that.nextThenReject.pop().call(_that, rejectValue)
        }
    }
    fn.apply(null, [resolve, reject])
}

Fnpromise.prototype.then = function(resolves, rejects) {
    const _that = this
    return new Fnpromise((resolve, reject) => {
        if(_that.status === 'RESOLVE') {
            _that.syncResolveCallBacks.push(resolves)
            _that.nextThenResolve.push(resolve)
        }
        if(_that.status === 'REJECT') {
            _that.syncRejectCallBacks.push(rejects)
            _that.nextThenReject.push(reject)
        }
        if(_that.status === 'PENDING') {
            _that.syncResolveCallBacks.push(resolves)
            _that.syncRejectCallBacks.push(rejects)
            _that.nextThenResolve.push(resolve)
            _that.nextThenReject.push(reject)
        }
    })
}

Fnpromise.prototype.catch = function(fn) {
    this.then(null, fn)
}