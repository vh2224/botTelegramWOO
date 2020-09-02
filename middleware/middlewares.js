const exec = (ctx, ...middlewares) => {
    const run = current => {
        middlewares && current < middlewares.length &&
            middlewares[current](ctx, () => run(current + 1))
    }
    run(0)
}

const mid1 = (ctx, next) => {
    ctx.info1 = 'teste middleware 1'
    next()
}

const mid2 = (ctx, next) => {
    ctx.info2 = 'testando middleware 2'
    next()
}

const mid3 = ctx => ctx.info3 = 'parou por aqui'


const ctx = {}
exec(ctx, mid1, mid2, mid3)

console.log(ctx)